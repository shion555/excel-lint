'use client';

import { useCallback } from 'react';
import type {
  ParsedWorkbook,
  WorkbookStructure,
  SheetStructure,
  ComparisonResult,
  StructureDifference,
} from '@/app/types';
import { extractStructure } from '@/lib/workbook';

export function useStructureComparison() {
  // 2つのシート構造を比較
  const compareSheets = useCallback(
    (
      template: SheetStructure,
      target: SheetStructure
    ): StructureDifference[] => {
      const differences: StructureDifference[] = [];

      // 列数の比較
      if (template.columnCount !== target.columnCount) {
        differences.push({
          type: 'column_count_diff',
          sheetName: template.sheetName,
          details: `列数が異なります`,
          expected: template.columnCount,
          actual: target.columnCount,
        });
      }

      // 各列ヘッダーの比較
      const maxCols = Math.max(
        template.columnHeaders.length,
        target.columnHeaders.length
      );
      for (let i = 0; i < maxCols; i++) {
        const expectedHeader = template.columnHeaders[i];
        const actualHeader = target.columnHeaders[i];

        if (expectedHeader !== actualHeader) {
          differences.push({
            type: 'column_mismatch',
            sheetName: template.sheetName,
            details: `列${i + 1}のヘッダーが異なります`,
            expected: expectedHeader ?? '(なし)',
            actual: actualHeader ?? '(なし)',
          });
        }
      }

      return differences;
    },
    []
  );

  // ワークブック全体を比較
  const compareWorkbook = useCallback(
    (
      templateStructure: WorkbookStructure,
      target: ParsedWorkbook
    ): ComparisonResult => {
      const targetStructure = extractStructure(target);
      const differences: StructureDifference[] = [];

      // テンプレートのシートがターゲットに存在するかチェック
      for (const templateSheet of templateStructure.sheets) {
        const targetSheet = targetStructure.sheets.find(
          (s) => s.sheetName === templateSheet.sheetName
        );

        if (!targetSheet) {
          differences.push({
            type: 'missing_sheet',
            sheetName: templateSheet.sheetName,
            details: `シート「${templateSheet.sheetName}」が見つかりません`,
          });
        } else {
          // シート構造を比較
          differences.push(...compareSheets(templateSheet, targetSheet));
        }
      }

      // ターゲットにのみ存在するシートをチェック
      for (const targetSheet of targetStructure.sheets) {
        const exists = templateStructure.sheets.some(
          (s) => s.sheetName === targetSheet.sheetName
        );
        if (!exists) {
          differences.push({
            type: 'extra_sheet',
            sheetName: targetSheet.sheetName,
            details: `テンプレートにないシート「${targetSheet.sheetName}」が存在します`,
          });
        }
      }

      return {
        fileName: target.fileName,
        isMatch: differences.length === 0,
        differences,
      };
    },
    [compareSheets]
  );

  // 複数ワークブックを一括比較
  const compareAll = useCallback(
    (
      templateStructure: WorkbookStructure,
      targets: ParsedWorkbook[]
    ): ComparisonResult[] => {
      return targets.map((target) =>
        compareWorkbook(templateStructure, target)
      );
    },
    [compareWorkbook]
  );

  return {
    compareWorkbook,
    compareAll,
  };
}
