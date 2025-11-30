import { FileSpreadsheet, Sheet } from 'lucide-react';

import type { ParsedWorkbook } from '@/app/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type Props = {
  workbooks: ParsedWorkbook[];
};

export function WorkbookPreview({ workbooks }: Props) {
  if (workbooks.length === 0) return null;

  return (
    <div className="space-y-12">
      {workbooks.map((book) => (
        <Card key={book.fileName}>
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-2">
              <FileSpreadsheet className="h-5 w-5 text-muted-foreground" />
              <span className="text-foreground">{book.fileName}</span>
              <Badge variant="secondary" className="ml-2">
                {book.sheets.length} シート
              </Badge>
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-8">
            {book.sheets.map((sheet) => (
              <div key={sheet.sheetName}>
                {/* シート名ヘッダー */}
                <div className="mb-3 flex items-center gap-2">
                  <Sheet className="h-4 w-4 text-primary" />
                  <h3 className="text-lg font-semibold text-primary">
                    {sheet.sheetName}
                  </h3>
                  <Badge variant="outline" className="ml-2">
                    {sheet.rows.length} 行
                  </Badge>
                </div>

                {/* データテーブル */}
                <div className="rounded-lg border">
                  <Table aria-label={`${sheet.sheetName}のデータプレビュー`}>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12 text-xs uppercase">
                          No.
                        </TableHead>
                        <TableHead className="text-xs uppercase">
                          Content Preview
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sheet.rows.slice(0, 5).map((row) => (
                        <TableRow key={row.rowNumber}>
                          <TableCell className="font-mono text-xs text-muted-foreground">
                            {row.rowNumber}
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {row.cells.map((cell, cIdx) => (
                                <Badge
                                  key={`${row.rowNumber}-${cIdx}`}
                                  variant="outline"
                                  className="max-w-[150px] truncate"
                                >
                                  {cell === null ? '' : cell}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                      {sheet.rows.length > 5 && (
                        <TableRow>
                          <TableCell
                            colSpan={2}
                            className="bg-muted/50 text-center text-xs text-muted-foreground"
                          >
                            ... 他 {sheet.rows.length - 5} 行 ...
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
