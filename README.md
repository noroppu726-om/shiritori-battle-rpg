# ことばクエスト（Shiritori Battle RPG）

しりとりで戦うブラウザ向けバトルRPGです。React + TypeScript + Vite で構築し、Vercel で公開しています。

## 🎮 公開URL（本番）

**https://shiritori-battle-rpg.vercel.app**

- スマホ（Safari / Chrome）・PC ブラウザからそのままプレイできます。
- アクセスするとオープニング画面 → タイトル画面 → バトルへと進みます。
- 追加のインストールやログインは不要です。

> デプロイは Vercel（プロジェクト: `shiritori-battle-rpg`）で行っています。
> 上記のエイリアスURLが常に最新の本番デプロイを指します。

## 動作確認

- HTTP ステータス 200 で応答（初回ロード約 0.7 秒）。
- `viewport` メタタグ（`width=device-width, initial-scale=1.0`）によりスマホ幅に最適化。
- JS / CSS アセットはすべて 200 で配信され、読み込みエラーはありません。

## ローカル開発

```bash
npm install       # 依存関係のインストール
npm run dev       # 開発サーバー（http://localhost:5173）
npm run build     # 本番ビルド（dist/ に出力）
npm run preview   # ビルド結果のプレビュー
```

## デプロイ

Vercel CLI を使って本番へデプロイします。

```bash
npx vercel --prod
```

ビルド設定は `vercel.json` に定義されています（framework: vite / outputDirectory: dist）。

## 技術スタック

- React 19
- TypeScript 5
- Vite 7
- Vercel（ホスティング）
