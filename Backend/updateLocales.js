const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'src', 'modules', 'language', 'locales');
const files = fs.readdirSync(localesDir).filter(f => f.endsWith('.json'));

for (const file of files) {
  const filePath = path.join(localesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(content);
  
  if (data['sms.SOS']) {
    // Add ambulance after police
    data['sms.SOS'] = data['sms.SOS'].replace('🚓 Police: {police}\\n', '🚓 Police: {police}\\n🚑 Ambulance: {ambulance}\\n');
    // Also support fallback replacement if they used actual newlines in JSON
    data['sms.SOS'] = data['sms.SOS'].replace('🚓 Police: {police}\n', '🚓 Police: {police}\n🚑 Ambulance: {ambulance}\n');
  }
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Updated ${file}`);
}
