const fs = require("fs");
const path = require("path");

const [,, game, hoursStr, completionStr, actor] = process.argv;

const hours = parseFloat(hoursStr);
const completion = parseFloat(completionStr);
const date = new Date().toLocaleDateString("en-GB");

const filePath = path.join(__dirname, "../_data/progress.json");
const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

if (!data[game]) {
  data[game] = {
    startDate: date,
    lastUpdated: date,
    lastUpdatedBy: actor,
    logs: []
  };
}

const logs = data[game].logs;
const last = logs[logs.length - 1] || { hours: 0, completion: 0 };

logs.push({
  date,
  hours,
  completion,
  deltaHours: hours - last.hours,
  deltaCompletion: completion - last.completion
});

data[game].lastUpdated = date;
data[game].lastUpdatedBy = actor;

fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
console.log(`✅ ${game} updated by ${actor}`);
