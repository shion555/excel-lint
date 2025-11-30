'use client';

import { use, useState } from 'react';
import ExcelJS from 'exceljs';

// 読み込んだデータの型定義
type SheetData = {
  rowNumber: number;
  cells: (string | number | null)[];
};

export default function Home() {
  const [sheetData, setSheetData] = useState<SheetData[]>([]);
  const [logs, setLogs] = useState<string[]>([]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLogs((prev) => [...prev, `ファイル読み込み開始: ${file.name}`]);

    try {
      // ファイルをArrayBufferとして読み込む
      const arrayBuffer = await file.arrayBuffer();

      // ExcelJSのworkbookを作成し、バッファをロード
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(arrayBuffer);

      // 最初のシートを取得
      const worksheet = workbook.worksheets[0];
      if (!worksheet) {
        throw new Error(`シートが見つかりません`);
      }
      setLogs((prev) => [...prev, `シート検出: ${worksheet.name}`]);

      // データ抽出
      const data: SheetData[] = [];

      worksheet.eachRow((row, rowNumber) => {
        const cells = Array.isArray(row.values)
          ? row.values.slice(1).map((val) => val?.toString() ?? null)
          : [];
        data.push({ rowNumber, cells });
      });

      setSheetData(data);
      setLogs((prev) => [
        ...prev,
        `読み込み完了: ${data.length}行のデータを取得しました`,
      ]);
    } catch (error) {
      console.error(error);
      setLogs((prev) => [...prev, `エラーが発生しました: ${error}`]);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-6">ExcelList</h1>

      {/* ファイルアップロード */}
      <div className="mb-8 p-6 border-2 border-dashed border-gray-300 rounded-lg text-center bg-gray-50">
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file: bg-green-50 file:text-green-700 hover:file:bg-green-100 cursor-pointer"
        />
      </div>

      {/* ログ表示エリア */}
      <div className="mb-6 p-4 bg-gray-800 text-green-400 font-mono text-sm rounded shadow-inner">
        {logs.length === 0
          ? `待機中...`
          : logs.map((log, i) => <div key={i}>{log}</div>)}
      </div>

      {/*簡易プレビュー（テーブル表示） */}
      {sheetData.length > 0 && (
        <div className="overflow-x-auto border border-gray-200 rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Line
                </th>
                {/* 便宜上、最大列数分ヘッダーを作る代わりにデータをそのまま表示 */}
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data Preview
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sheetData.map((row) => (
                <tr key={row.rowNumber} className="hover:bg-gray-50">
                  <td className="px-4 py-2 whitespace-nowrap text-gray-400 font-mono">
                    {row.rowNumber}
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex gap-2">
                      {row.cells.map((cell, idx) => (
                        <span
                          key={idx}
                          className="inline-block px-2 py-1 bg-gray-100 rounded text-gray-700 border border-gray-200"
                        >
                          {cell === null ? '(空)' : cell}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
