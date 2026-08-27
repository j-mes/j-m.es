import progress from "./progress.json";

type LogEntry = {
  date: string;
  hours: number;
  completion: number;
  deltaHours?: number;
  deltaCompletion?: number;
  trackables?: Record<string, number>;
  deltaTrackables?: Record<string, number>;
};

type GameProgress = {
  startDate: string;
  lastUpdated: string;
  lastUpdatedBy: string;
  trackables?: string[];
  cupTotal?: number;
  logs: LogEntry[];
};

function parseDate(dateString: string): Date {
  const [day, month, year] = dateString.split("/");
  return new Date(`${year}-${month}-${day}`);
}

export default function GameProgressPage() {
  const games = Object.entries(progress as Record<string, GameProgress>);
  const sortedGames = games.sort(([, a], [, b]) => parseDate(b.lastUpdated).getTime() - parseDate(a.lastUpdated).getTime());

  return (
    <main>
      <h1>🎮 Game Progress Tracker</h1>

      {sortedGames.map(([title, info]) => (
        <section key={title}>
          <h2>{title}</h2>
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
                {entry.trackables && (
                  <ul style={{ marginLeft: "1rem" }}>
                    {Object.entries(entry.trackables).map(([item, value]) => {
                      const showTotal = item === "3-Star GP" && info.cupTotal;
                      return (
                        <li key={item}>
                          {item}: {value}{showTotal ? `/${info.cupTotal}` : ""}
                          {entry.deltaTrackables?.[item] !== undefined && (
                            <> (<em>+{entry.deltaTrackables[item]}</em>)</>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
