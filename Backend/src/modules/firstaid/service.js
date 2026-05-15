const { FirstAid } = require('./model');
const { callAi } = require('../../services/ai.service');
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

module.exports = { startSession, followup };

