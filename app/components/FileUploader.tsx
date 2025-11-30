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
    <div className="mb-8 p-8 border-2 border-dashed border-slate-300 rounded-xl text-center bg-slate-50 hover:bg-slate-100 transition-colors">
      <label className="cursor-pointer block">
        <span className="text-lg font-semibold text-slate-600 block mb-2">
          ここにExcelファイルをドロップ（複数可）
        </span>
        <span className="text-sm text-slate-400 block mb-4">
          またはクリックして選択
        </span>
        <input
          type="file"
          multiple
          accept=".xlsx, .xls"
          onChange={handleChange}
          disabled={disabled}
          className="hidden"
        />
        <span className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
          ファイルを選択
        </span>
      </label>
    </div>
  );
}
