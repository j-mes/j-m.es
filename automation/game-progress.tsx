import progress from "./progress.json";

type LogEntry = {
  date: string;
  hours: number;
  completion: number;
  deltaHours?: number;
  deltaCompletion?: number;
};

type GameProgress = {
  startDate: string;
  lastUpdated: string;
  lastUpdatedBy: string;
  logs: LogEntry[];
};

function parseDate(dateString: string): Date {
  const [day, month, year] = dateString.split("/");
  return new Date(`${year}-${month}-${day}`);
}

export default function GameProgressPage() {
  const games = Object.entries(progress as Record<string, GameProgress>);
  const sorted = games.sort(([, a], [, b]) => parseDate(b.lastUpdated).getTime() - parseDate(a.lastUpdated).getTime());

  return (
    <main>
      <h1>🎮 Game Progress Tracker</h1>

      {sorted.map(([game, info]) => (
        <section key={game}>
          <h2>{game}</h2>
          <p>
            <strong>Started:</strong> {info.startDate}<br />
            <strong>Last Updated:</strong> {info.lastUpdated} by {info.lastUpdatedBy}
          </p>
          <ul>
            {info.logs.map((entry, i) => (
              <li key={i}>
                {entry.hours}h, {entry.completion}%
                {(entry.deltaHours || entry.deltaCompletion) && (
                  <> (<em>+{entry.deltaHours ?? 0}h, +{entry.deltaCompletion ?? 0}%</em>)</>
                )}
                {" — "}
                <small>{entry.date}</small>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
