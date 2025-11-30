'use client';

import { useExcelParser } from '@/app/hooks/useExcelParser';
import { FileUploader } from '@/app/components/FileUploader';
import { LogDisplay } from '@/app/components/LogDisplay';
import { WorkbookPreview } from '@/app/components/WorkbookPreview';
import { ThemeToggle } from '@/app/components/ThemeToggle';

export default function Home() {
  const { workbooks, logs, isProcessing, parseFiles } = useExcelParser();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="p-8 max-w-6xl mx-auto font-sans">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">ExcelLint</h1>
            <p className="text-muted-foreground">
              複数ファイルの設計書を一括チェック
            </p>
          </div>
          <ThemeToggle />
        </header>

        <FileUploader onFilesSelected={parseFiles} disabled={isProcessing} />

        <LogDisplay logs={logs} />

        {isProcessing && (
          <div className="text-center py-10 text-muted-foreground animate-pulse">
            読み込み中...
          </div>
        )}

        <WorkbookPreview workbooks={workbooks} />
      </div>
    </div>
  );
}
