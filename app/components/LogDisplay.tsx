import { Terminal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

type Props = {
  logs: string[];
};

export function LogDisplay({ logs }: Props) {
  if (logs.length === 0) return null;

  return (
    <Card className="mb-6 bg-slate-100 dark:bg-slate-900 border-slate-300 dark:border-slate-700">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium flex items-center gap-2 text-slate-800 dark:text-slate-100">
            <Terminal className="h-4 w-4 text-slate-600 dark:text-green-400" />
            処理ログ
          </CardTitle>
          <Badge
            variant="secondary"
            className="bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
          >
            {logs.length}件
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-32 w-full rounded-md">
          <div className="p-4 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-green-400 font-mono text-sm rounded-lg shadow-inner">
            {logs.map((log, i) => (
              <div key={`log-${i}-${log.slice(0, 20)}`}>{log}</div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
