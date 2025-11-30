# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ExcelLint - 複数のExcelファイル（設計書）を一括でチェックするWebアプリケーション

## Commands

- **Dev server:** `npm run dev` (runs on http://localhost:3000)
- **Build:** `npm run build`
- **Start production:** `npm run start`
- **Lint:** `npm run lint`
- **Format:** `npm run format` (Prettierで整形)
- **Format check:** `npm run format:check`

## Architecture

Next.js 16 App Router アプリケーション:

- React 19 + TypeScript (strict mode)
- Tailwind CSS 4 with PostCSS
- **shadcn/ui** (new-york style) - UIコンポーネント基盤
- **next-themes** - ダークモード対応
- **exceljs** - Excelファイル(.xlsx, .xls)のパース処理
- Geist font family via next/font

### Project Structure

- `app/` - Next.js App Router pages and layouts
  - `page.tsx` - メインページ（ファイルアップロード、Excel解析、プレビュー表示）
  - `types.ts` - 共通型定義（ParsedRow, ParsedSheet, ParsedWorkbook）
  - `components/` - アプリ固有コンポーネント
  - `hooks/` - カスタムフック（useExcelParser等）
  - `providers/` - ThemeProvider等
- `components/ui/` - shadcn/uiコンポーネント
- `lib/utils.ts` - cn()ユーティリティ（tailwind-merge + clsx）

### Data Flow

1. `FileUploader` → ファイル選択 → `useExcelParser.parseFiles()`
2. `useExcelParser` → exceljs でパース → `ParsedWorkbook[]` を返却
3. `WorkbookPreview` → ワークブック/シート/行をテーブル表示

### Path Alias

`@/*` maps to the project root (e.g., `@/components/ui/button`).

## Code Style

Prettier: single quotes, semicolons, 2-space tabs, trailing commas (ES5), 80-char line width.

## Communication

Please use Japanese exclusively when conversing with me.
