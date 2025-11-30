'use client';

import { useState, useCallback } from 'react';
import ExcelJS from 'exceljs';
import type {
  ParsedSheet,
  ParsedWorkbook,
  WorkbookStructure,
} from '@/app/types';
import { extractStructure } from '@/lib/workbook';

export function useTemplate() {
  const [template, setTemplate] = useState<ParsedWorkbook | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTemplate = useCallback(async (files: FileList) => {
    if (files.length === 0) return;

    setIsLoading(true);
    setError(null);

    try {
      const file = files[0];
      const buffer = await file.arrayBuffer();
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(buffer);

      const parsedSheets: ParsedSheet[] = [];

      workbook.eachSheet((worksheet) => {
        const rows: ParsedSheet['rows'] = [];

        worksheet.eachRow((row, rowNumber) => {
          const cells = Array.isArray(row.values)
            ? row.values.slice(1).map((val) => val?.toString() ?? null)
            : [];
          rows.push({ rowNumber, cells });
        });

        if (rows.length > 0) {
          parsedSheets.push({
            sheetName: worksheet.name,
            rows,
          });
        }
      });

      setTemplate({
        fileName: file.name,
        sheets: parsedSheets,
      });
    } catch (e) {
      setError(`テンプレートの読み込みに失敗しました: ${e}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearTemplate = useCallback(() => {
    setTemplate(null);
    setError(null);
  }, []);

  const getStructure = useCallback((): WorkbookStructure | null => {
    if (!template) return null;
    return extractStructure(template);
  }, [template]);

  return {
    template,
    isLoading,
    error,
    loadTemplate,
    clearTemplate,
    getStructure,
    hasTemplate: template !== null,
  };
}
