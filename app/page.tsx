'use client';

import { useExcelParser } from '@/app/hooks/useExcelParser';
import { FileUploader } from '@/app/components/FileUploader';
import { LogDisplay } from '@/app/components/LogDisplay';
import { WorkbookPreview } from '@/app/components/WorkbookPreview';

export default function Home() {
  const { workbooks, logs, isProcessing, parseFiles } = useExcelParser();

  return (
    <div className="p-8 max-w-6xl mx-auto font-sans text-slate-800">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">ExcelLint</h1>
        <p className="text-slate-500">複数ファイルの設計書を一括チェック</p>
      </header>

      <FileUploader onFilesSelected={parseFiles} disabled={isProcessing} />

      <LogDisplay logs={logs} />

      {isProcessing && (
        <div className="text-center py-10 text-slate-500 animate-pulse">
          読み込み中...
        </div>
      )}

      <WorkbookPreview workbooks={workbooks} />
    </div>
  );
}
