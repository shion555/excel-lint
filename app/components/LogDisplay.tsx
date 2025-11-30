type Props = {
  logs: string[];
};

export function LogDisplay({ logs }: Props) {
  if (logs.length === 0) return null;

  return (
    <div className="mb-6 p-4 bg-slate-800 text-green-400 font-mono text-sm rounded-lg shadow-inner">
      {logs.map((log, i) => (
        <div key={i}>{log}</div>
      ))}
    </div>
  );
}
