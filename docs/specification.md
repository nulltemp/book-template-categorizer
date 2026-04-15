## プロジェクト概要

ユーザーが事前に定義した「テンプレート（サイズ設定）」と、Google Books APIから取得した「書籍名」を照合し、最適なテンプレートを提案するWebアプリケーション。

## 1. 推奨技術スタック（コスト0円プラン）

- **フロントエンド / バックエンド**: **Next.js** (App Router)
- **ホスティング**: **Vercel**（無料枠で十分対応可能）
- **認証**: **NextAuth.js** (Google Provider)
- **データベース**: **Supabase** (PostgreSQLの無料枠を使用)
- **外部API**: **Google Books API**（無料枠内）

---

## 2. データベース設計（簡易案）

### `templates` テーブル

| カラム名  | 型     | 説明                           |
| :-------- | :----- | :----------------------------- |
| `id`      | UUID   | 一意識別子                     |
| `user_id` | String | Google認証のユーザーID         |
| `name`    | String | テンプレート名（例：文庫、A5） |
| `width`   | Number | 横サイズ (mm)                  |
| `height`  | Number | 縦サイズ (mm)                  |

---

## 3. 主要機能のロジック

### ① テンプレート登録

ユーザーがサイズを保存します。

### ② Google Books API 連携

書籍名で検索し、APIから `publisher`（出版社名）を取得します。

```javascript
// APIリクエスト例
const response = await fetch(
  `https://www.googleapis.com/books/v1/volumes?q=intitle:${bookName}`,
);
const data = await response.json();
const publisher = data.items[0].volumeInfo.publisher;
```

### ③ 照合ロジック

取得した出版社名が、登録済みテンプレートの `publisher_keywords` に含まれているか判定し、一致したサイズを表示します。

---

## 4. 実装のステップ

### ステップ1: 環境構築

1. Google Cloud Consoleでプロジェクトを作成し、**OAuth 2.0 クライアント ID**を取得します。
2. Google Books APIを有効化します。
3. Supabaseでデータベースを作成します。

### ステップ2: テンプレート管理機能

まずは、テンプレートを `CRUD`（作成・読み取り・更新・削除）できる画面を作成します。

### ステップ3: 検索と照合

検索窓を作成し、入力された書籍名をもとにAPIを叩き、結果をデータベース内のキーワードと比較して画面に返します。
