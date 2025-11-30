import { FileCheck, Upload, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { WorkbookStructure } from '@/app/types';

type Props = {
  onFileSelected: (files: FileList) => void;
  structure: WorkbookStructure | null;
  onClear: () => void;
  isLoading?: boolean;
  error?: string | null;
};

export function TemplateUploader({
  onFileSelected,
  structure,
  onClear,
  isLoading,
  error,
}: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileSelected(files);
    }
  };

  // テンプレート設定済み
  if (structure) {
    return (
      <Card className="mb-6 border-green-500/50 bg-green-50 dark:bg-green-950/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileCheck className="size-5 text-green-600 dark:text-green-400" />
              <div>
                <p className="font-medium text-foreground">
                  {structure.fileName}
                </p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {structure.sheets.map((sheet) => (
                    <Badge
                      key={sheet.sheetName}
                      variant="outline"
                      className="text-xs"
                    >
                      {sheet.sheetName} ({sheet.columnCount}列)
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClear}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // テンプレート未設定
  return (
    <Card className="mb-6 border-dashed border-border hover:border-green-500/50 transition-colors">
      <CardContent className="p-6 text-center">
        <label htmlFor="template-file-upload" className="cursor-pointer block">
          <div className="flex flex-col items-center gap-3">
            <Upload className="size-8 text-muted-foreground" />
            <div className="space-y-1">
              <span className="text-base font-medium text-foreground block">
                テンプレートファイルを選択
              </span>
              <span className="text-sm text-muted-foreground block">
                構造比較の基準となるExcelファイル
              </span>
            </div>
            <input
              id="template-file-upload"
              type="file"
              accept=".xlsx, .xls"
              onChange={handleChange}
              disabled={isLoading}
              className="hidden"
              aria-label="テンプレートファイルを選択"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isLoading}
              asChild
            >
              <span>
                <Upload className="size-4" />
                {isLoading ? '読み込み中...' : 'ファイルを選択'}
              </span>
            </Button>
          </div>
        </label>
        {error && (
          <p className="mt-3 text-sm text-destructive">{error}</p>
        )}
      </CardContent>
    </Card>
  );
}
