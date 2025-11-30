// 1行分のデータ
export type ParsedRow = {
  rowNumber: number;
  cells: (string | number | null)[];
};

// 1シート分のデータ
export type ParsedSheet = {
  sheetName: string;
  rows: ParsedRow[];
};

// 1ブック分のデータ
export type ParsedWorkbook = {
  fileName: string;
  sheets: ParsedSheet[];
};
