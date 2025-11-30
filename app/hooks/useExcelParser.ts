'use client';

import { useState } from 'react';
import ExcelJS from 'exceljs';
import type { ParsedSheet, ParsedWorkbook } from '@/app/types';

export function useExcelParser() {
  const [workbooks, setWorkbooks] = useState<ParsedWorkbook[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const parseFiles = async (files: FileList) => {
    if (files.length === 0) return;

    setIsProcessing(true);
    setLogs([]);
    setWorkbooks([]);

    const newLogs: string[] = [];

    try {
      const fileArray = Array.from(files);
      newLogs.push(`${fileArray.length}個のファイルを検出しました`);

      const results = await Promise.all(
        fileArray.map(async (file) => {
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

          return {
            fileName: file.name,
            sheets: parsedSheets,
          };
        })
      );

      setWorkbooks(results);
      newLogs.push(`全ファイルの読み込み完了`);
    } catch (error) {
      console.error(error);
      newLogs.push(`エラーが発生しました: ${error}`);
    } finally {
      setLogs(newLogs);
      setIsProcessing(false);
    }
  };

  return {
    workbooks,
    logs,
    isProcessing,
    parseFiles,
  };
}
