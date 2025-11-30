import type { ParsedWorkbook } from '@/app/types';

type Props = {
  workbooks: ParsedWorkbook[];
};

export function WorkbookPreview({ workbooks }: Props) {
  if (workbooks.length === 0) return null;

  return (
    <div className="space-y-12">
      {workbooks.map((book, bookIdx) => (
        <div
          key={bookIdx}
          className="border border-slate-200 rounded-xl shadow-sm overflow-hidden"
        >
          {/* ファイル名ヘッダー */}
          <div className="bg-slate-100 px-6 py-4 border-b border-slate-200">
            <h2 className="text-xl font-bold flex items-center gap-2">
              📄 {book.fileName}
            </h2>
          </div>

          <div className="p-6 space-y-8 bg-white">
            {book.sheets.map((sheet, sheetIdx) => (
              <div key={sheetIdx}>
                {/* シート名ヘッダー */}
                <h3 className="text-lg font-semibold text-blue-600 mb-3 flex items-center gap-2">
                  📑 {sheet.sheetName}
                </h3>

                {/* データテーブル */}
                <div className="overflow-x-auto border border-slate-100 rounded-lg">
                  <table className="min-w-full divide-y divide-slate-200 text-sm">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-3 py-2 text-left w-12 text-xs font-medium text-slate-500 uppercase">
                          No.
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-slate-500 uppercase">
                          Content Preview
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {sheet.rows.slice(0, 5).map((row) => (
                        <tr key={row.rowNumber} className="hover:bg-slate-50">
                          <td className="px-3 py-2 text-slate-400 font-mono text-xs">
                            {row.rowNumber}
                          </td>
                          <td className="px-3 py-2">
                            <div className="flex gap-1 flex-wrap">
                              {row.cells.map((cell, cIdx) => (
                                <span
                                  key={cIdx}
                                  className="inline-block px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs border border-slate-200 max-w-[150px] truncate"
                                >
                                  {cell === null ? '' : cell}
                                </span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                      {sheet.rows.length > 5 && (
                        <tr>
                          <td
                            colSpan={2}
                            className="px-3 py-2 text-center text-xs text-slate-400 bg-slate-50"
                          >
                            ... 他 {sheet.rows.length - 5} 行 ...
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
