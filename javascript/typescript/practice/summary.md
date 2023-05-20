# 構築手順

## 必須手順
1. node インストール
2. nodeプロジェクトのセットアップ
   ```
   $ npm init
   ```
3. typescript インストール → tscコマンドが使えるようになる
   ```
   $ npm　install --save typescript
   ```
4. 型定義情報を入れる
   ```
   $ npm install --save-dev @types/node
   ```
5. tsconfig.json作成
   ```
   $ npx tsc --init
   ```
6. typescriptファイルをコンパイル
   ```
   $ npx tsc main.ts（tsファイル名）
   ```
7. 作成された同名のjsを実行
   ```
   $ node main.js（jsファイル名）
   ```

## nodeのパッケージを使いたいとき
パッケージだけでは型定義がなくエラーがでるので
パッケージ + @types/パッケージ名で型定義もインストールする必要がある
※ 型定義は--save-devとする
※ typescriptに対応しているパッケージも増えてきて、@typesをインストールしなくて良いものもある
※型定義がないパッケージもある

```
$ npm install --save uuid
$ npm install --save-dev @types/uuid
```