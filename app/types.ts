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

// シート構造（比較用）
export type SheetStructure = {
  sheetName: string;
  columnHeaders: (string | number | null)[];
  columnCount: number;
};

// ワークブック構造（比較用）
export type WorkbookStructure = {
  fileName: string;
  sheets: SheetStructure[];
};

// 差分タイプ
export type DifferenceType =
  | 'missing_sheet' // テンプレートにあるシートがない
  | 'extra_sheet' // テンプレートにないシートがある
  | 'column_mismatch' // 列ヘッダーが異なる
  | 'column_count_diff'; // 列数が異なる

// 差分情報
export type StructureDifference = {
  type: DifferenceType;
  sheetName: string;
  details: string;
  expected?: string | number | null;
  actual?: string | number | null;
};

// 比較結果
export type ComparisonResult = {
  fileName: string;
  isMatch: boolean;
  differences: StructureDifference[];
};
