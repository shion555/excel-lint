import type { ParsedWorkbook, WorkbookStructure } from '@/app/types';

/**
 * ParsedWorkbookから構造情報を抽出する
 */
export function extractStructure(workbook: ParsedWorkbook): WorkbookStructure {
  return {
    fileName: workbook.fileName,
    sheets: workbook.sheets.map((sheet) => ({
      sheetName: sheet.sheetName,
      columnHeaders: sheet.rows[0]?.cells ?? [],
      columnCount: sheet.rows[0]?.cells.length ?? 0,
    })),
  };
}
