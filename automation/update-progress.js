const fs = require("fs");
const path = require("path");

const [,, game, hoursStr, completionStr, actor, trackablesRaw] = process.argv;

const hours = parseFloat(hoursStr);
const completion = parseFloat(completionStr);
const date = new Date().toLocaleDateString("en-GB");
const trackablesInput = trackablesRaw ? JSON.parse(trackablesRaw) : {};

const filePath = path.join(__dirname, "../_data/progress.json");
const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

if (!data[game]) {
  data[game] = {
    startDate: date,
    lastUpdated: date,
    lastUpdatedBy: actor,
    trackables: Object.keys(trackablesInput),
    logs: []
  };
}

const logs = data[game].logs;
const last = logs[logs.length - 1] || { hours: 0, completion: 0, trackables: {} };

const deltaTrackables = {};
for (const key in trackablesInput) {
  const prev = last.trackables?.[key] ?? 0;
  deltaTrackables[key] = trackablesInput[key] - prev;
}

logs.push({
  date,
  hours,
  completion,
  deltaHours: hours - last.hours,
  deltaCompletion: completion - last.completion,
  trackables: trackablesInput,
  deltaTrackables
});

data[game].lastUpdated = date;
data[game].lastUpdatedBy = actor;

fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
console.log(`✅ ${game} updated by ${actor}`);
