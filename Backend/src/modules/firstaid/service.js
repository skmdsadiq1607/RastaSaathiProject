const { FirstAid } = require('./model');
const { callAi, callAiVision } = require('../../services/ai.service');
const { firstAidPrompt } = require('../../utils/aiPrompts');
const { logDecision } = require('../transparency/service');

async function startSession({ incidentId, userId, injuryType, severityLevel, resourcesAvailable, language }) {
  const prompt = firstAidPrompt({ injuryType, severityLevel, resourcesAvailable, language });
  const { text } = await callAi({
    system: 'You produce strictly-valid JSON only.',
    user: prompt,
    maxTokens: 900
  });

  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    parsed = { steps: [text], warnings: [], whenToEscalate: [] };
  }

  const assistantMsg = JSON.stringify(parsed);
  const session = await FirstAid.create({
    incidentId: incidentId || undefined,
    userId: userId || undefined,
    language,
    injuryType,
    severityLevel,
    messages: [{ role: 'assistant', content: assistantMsg }]
  });

  if (incidentId) {
    await logDecision({
      incidentId,
      decisionType: 'FIRST_AID',
      inputPayload: { injuryType, severityLevel, resourcesAvailable, language },
      outputPayload: parsed,
      confidenceScore: 0.7,
      modelUsed: 'claude-sonnet-4-20250514',
      reasoning: 'AI-guided first aid session started'
    });
  }

  return { session, guidance: parsed };
}

async function followup({ sessionId, question }) {
  const session = await FirstAid.findById(sessionId);
  if (!session) throw new Error('Session not found');

  session.messages.push({ role: 'user', content: question });

  const history = session.messages
    .slice(-12)
    .map((m) => `${m.role.toUpperCase()}: ${m.content}`)
    .join('\n');

  const { text } = await callAi({
    system: 'You are continuing a first-aid session. Be concise and safe.',
    user: `Continue this first-aid session in language=${session.language}.\n\nHistory:\n${history}\n\nUser question: ${question}`,
    maxTokens: 400
  });

  session.messages.push({ role: 'assistant', content: text });
  await session.save();
  return { session, answer: text };
}

async function detectInjury({ image }) {
  if (!image) throw new Error('Image data is required');

  const matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  if (!matches || matches.length < 3) {
    throw new Error('Invalid base64 image data URL format');
  }

  const mimeType = matches[1];
  const base64Data = matches[2];

  const prompt = `You are a professional emergency medical first-responder. Analyze the attached photo of a road accident injury.
Identify the type of injury (e.g., deep laceration, minor abrasion, 2nd-degree burn, puncture wound, bone fracture, etc.) and calculate a confidence score (between 0.0 and 1.0).
Provide clean, practical step-by-step first aid guidance, critical warnings, and conditions for when to escalate to calling emergency services.
Your response MUST be strictly in JSON format. Do not wrap the JSON in Markdown or any other tags. Use exactly this schema:
{
  "injuryType": "Laceration",
  "confidence": 0.95,
  "firstAidSteps": [
    "Clean the wound with clean water.",
    "Apply firm pressure with a clean cloth to stop bleeding."
  ],
  "warnings": [
    "Do not apply tourniquets unless bleeding is life-threatening.",
    "Do not apply butter or oil to burns."
  ],
  "whenToEscalate": [
    "If bleeding does not stop after 10 minutes of direct pressure.",
    "If the victim feels dizzy or shows signs of shock."
  ]
}`;

  const { text } = await callAiVision({ base64Data, mimeType, prompt });

  let parsed;
  try {
    // Clean up code block wrappers if any
    let cleaned = text.trim();
    if (cleaned.startsWith('```json')) cleaned = cleaned.substring(7);
    if (cleaned.startsWith('```')) cleaned = cleaned.substring(3);
    if (cleaned.endsWith('```')) cleaned = cleaned.substring(0, cleaned.length - 3);
    cleaned = cleaned.trim();
    
    parsed = JSON.parse(cleaned);
  } catch (err) {
    console.error('[Vision Parse Error] Could not parse AI response as JSON:', text);
    parsed = {
      injuryType: 'Unknown Injury',
      confidence: 0.5,
      firstAidSteps: [text],
      warnings: ['Could not parse AI response. Following default trauma care.'],
      whenToEscalate: ['If condition deteriorates.']
    };
  }

  return parsed;
}

module.exports = { startSession, followup, detectInjury };

