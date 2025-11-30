'use client';

import { useMemo } from 'react';
import { useExcelParser } from '@/app/hooks/useExcelParser';
import { useTemplate } from '@/app/hooks/useTemplate';
import { useStructureComparison } from '@/app/hooks/useStructureComparison';
import { FileUploader } from '@/app/components/FileUploader';
import { TemplateUploader } from '@/app/components/TemplateUploader';
import { ComparisonResults } from '@/app/components/ComparisonResults';
import { LogDisplay } from '@/app/components/LogDisplay';
import { WorkbookPreview } from '@/app/components/WorkbookPreview';
import { ThemeToggle } from '@/app/components/ThemeToggle';

export default function Home() {
  const { workbooks, logs, isProcessing, parseFiles } = useExcelParser();
  const {
    isLoading: isTemplateLoading,
    error: templateError,
    loadTemplate,
    clearTemplate,
    getStructure,
  } = useTemplate();
  const { compareAll } = useStructureComparison();

  const templateStructure = getStructure();

  // テンプレートとワークブックがあれば比較結果を算出
  const comparisonResults = useMemo(() => {
    if (!templateStructure || workbooks.length === 0) {
      return [];
    }
    return compareAll(templateStructure, workbooks);
  }, [templateStructure, workbooks, compareAll]);

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

        {/* 1. テンプレート設定 */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-3 text-foreground">
            1. テンプレート設定（任意）
          </h2>
          <TemplateUploader
            onFileSelected={loadTemplate}
            structure={templateStructure}
            onClear={clearTemplate}
            isLoading={isTemplateLoading}
            error={templateError}
          />
        </section>

        {/* 2. チェック対象ファイル */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-3 text-foreground">
            2. チェック対象ファイル
          </h2>
          <FileUploader onFilesSelected={parseFiles} disabled={isProcessing} />
        </section>

        {/* 3. 比較結果 */}
        {templateStructure && workbooks.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-3 text-foreground">
              3. 比較結果
            </h2>
            <ComparisonResults results={comparisonResults} />
          </section>
        )}

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
