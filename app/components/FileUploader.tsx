import { Upload } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type Props = {
  onFilesSelected: (files: FileList) => void;
  disabled?: boolean;
};

export function FileUploader({ onFilesSelected, disabled }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFilesSelected(files);
    }
  };

  return (
    <Card className="mb-8 border-2 border-dashed border-border hover:border-primary/50 transition-colors">
      <CardContent className="p-8 text-center">
        <label htmlFor="excel-file-upload" className="cursor-pointer block">
          <div className="flex flex-col items-center gap-4">
            <Upload className="size-12 text-muted-foreground" />
            <div className="space-y-2">
              <span className="text-lg font-semibold text-foreground block">
                ここにExcelファイルをドロップ（複数可）
              </span>
              <span className="text-sm text-muted-foreground block">
                またはクリックして選択
              </span>
            </div>
            <input
              id="excel-file-upload"
              type="file"
              multiple
              accept=".xlsx, .xls"
              onChange={handleChange}
              disabled={disabled}
              className="hidden"
              aria-label="Excelファイルを選択"
            />
            <Button type="button" disabled={disabled} asChild>
              <span>
                <Upload />
                ファイルを選択
              </span>
            </Button>
          </div>
        </label>
      </CardContent>
    </Card>
  );
}
