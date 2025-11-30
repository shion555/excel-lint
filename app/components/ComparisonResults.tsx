import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { ComparisonResult, DifferenceType } from '@/app/types';

type Props = {
  results: ComparisonResult[];
};

function getDifferenceTypeLabel(type: DifferenceType): string {
  switch (type) {
    case 'missing_sheet':
      return 'シート不足';
    case 'extra_sheet':
      return '余分なシート';
    case 'column_mismatch':
      return '列名不一致';
    case 'column_count_diff':
      return '列数不一致';
    default:
      return '不明';
  }
}

function getDifferenceTypeColor(type: DifferenceType): string {
  switch (type) {
    case 'missing_sheet':
      return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
    case 'extra_sheet':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
    case 'column_mismatch':
    case 'column_count_diff':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
    default:
      return '';
  }
}

export function ComparisonResults({ results }: Props) {
  if (results.length === 0) {
    return null;
  }

  const matchedCount = results.filter((r) => r.isMatch).length;
  const unmatchedCount = results.length - matchedCount;

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <AlertTriangle className="size-5" />
          比較結果
        </CardTitle>
        <div className="flex gap-4 text-sm">
          <span className="text-muted-foreground">
            全 {results.length} ファイル:
          </span>
          <span className="text-green-600 dark:text-green-400 font-medium">
            一致 {matchedCount}
          </span>
          <span className="text-red-600 dark:text-red-400 font-medium">
            不一致 {unmatchedCount}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {results.map((result) => (
          <div
            key={result.fileName}
            className={`p-3 rounded-lg border ${
              result.isMatch
                ? 'bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-900'
                : 'bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-900'
            }`}
          >
            <div className="flex items-center gap-2">
              {result.isMatch ? (
                <CheckCircle className="size-4 text-green-600 dark:text-green-400" />
              ) : (
                <XCircle className="size-4 text-red-600 dark:text-red-400" />
              )}
              <span className="font-medium text-foreground">
                {result.fileName}
              </span>
              <span
                className={`text-sm ${
                  result.isMatch
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                {result.isMatch ? '一致' : '不一致'}
              </span>
            </div>

            {!result.isMatch && result.differences.length > 0 && (
              <div className="mt-2 ml-6 space-y-1">
                {result.differences.map((diff, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm">
                    <Badge
                      variant="secondary"
                      className={`text-xs shrink-0 ${getDifferenceTypeColor(diff.type)}`}
                    >
                      {getDifferenceTypeLabel(diff.type)}
                    </Badge>
                    <span className="text-muted-foreground">
                      {diff.details}
                      {diff.expected !== undefined &&
                        diff.actual !== undefined && (
                          <span className="ml-1">
                            (期待: {String(diff.expected)}, 実際:{' '}
                            {String(diff.actual)})
                          </span>
                        )}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
