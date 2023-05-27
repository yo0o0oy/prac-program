# Typescript

## Typescriptとは
 * 2012年にMicrosoftが開発したオープンソースのプログラミング言語でJavaScriptの上位互換（JavaScriptが持つ機能を維持しつつ、追加の機能をそなえる）
 * JavaScriptと同じように記述ができる +α 型の指定ができる
 * JavaScriptと同じ構文を用いているので、JavaScriptの経験があれば比較的習得は容易
 * JavaScriptでできることはTypeScriptでもできるので、webサイトやwebアプリケーション開発に適した言語だが、特に大規模なWebアプリケーションを開発する際に威力を発揮する
 * 型定義をすることでプログラムを動かさずとも、バグが無いか未然に検知できるようになり大規模な開発における生産性を向上させる
 * TypeScriptは「AltJS」のひとつで次世代のJavaScriptの最有力候補と言われる

## Typescriptの特徴
 * 型推論付きの静的型付け言語
   - 型推論：言語自体が変数の型を予測して補完してくれる機能。高速に処理できるメリットがある。
   - 静的型付け言語：変数やメソッドの戻り値にあらかじめ型を指定する
   - 動的型付け言語：実行時にデータ型を決める
 * インターフェースとクラスの定義が可能（→大規模なシステムをクラスを使って細分化し、チームで分担しながら開発を進めるのに適している）
 * AltJsの一つでJavascriptと相互に互換性を持っている
   - AltJsとはJavaScriptより優れた機能を持ち、コンパイル（トランスパイル）後はJavaScriptのコードが生成される言語
   - TypeScriptで書いたコードをJavaScriptに変換できるので、JavaScriptで書かれたコードを、処理に応じてTypeScriptで書き換えられる。またTypeScriptから直接JavaScriptを呼び出したり、反対にJavaScriptからTypeScriptを呼び出すこともできる。→ プログラムのメンテナンス性↑


## 学習内容まとめ

### 導入

#### 開発環境と設定
* vscode
* tscコマンド
* ビルドツールと設定
  - tsconfig.json [参考](https://blog.isystk.com/system_develop/frontend/typescript/757/)
    * compilerOptions
      - target
      - module
      - ...
      - ...
      - ...
      - ...
      - ...
    * exclude

#### 基礎
* 型
  - 基本の型
    * boolean型
    * number型
    * string型
    * array型
      ```
      let list: number[] = [1, 2, 3]
      let list: Array<number> = [1, 2, 3]
      ```
    * tuple型：固定数の要素の型が分かっている配列
      ```
      let x: [string, number]
      x = ['hello', 10] // OK
      x = [10, 'hello'] // Error!
      ```
    * any型：型の不明な変数に付与することで特定の値の型チェックを無効にしコンパイルを通過させる。typescriptの恩恵を受けられないため、できる限り使わない。
    * unknown型：any型に似ているが型安全なanyを表したいときに利用する。値の代入には寛容だが、値の利用に関しては厳しい。
      ```
      const numbers: unknown[] = ['0'] // OK
      numbers[0].toFixed(1) // Error!
      ```
    * void型：≒ any型の反対。型がまったくないことを表す。一般的に値を返さない関数の戻り型として利用する。
    * null型／undefined型：全ての型のサブタイプで単体ではあまり役に立たない。（--strictNullChecksフラグをtrueにするとvoid型、およびそれぞれのタイプのみに割り当て可能となる）
    * never型：発生し得ない値の型。
      ```
      // 戻り値を得られないためnever型とできる
      function error(message: string): never {
        throw new Error(message)
      }
      ```
    * object型：非プリミティブ型（ = boolean, number, string, symbol, null, undefinedのいずれでもない）。ブレース（{}）を使った型表現ではエラーを得ることができない。
      ```
      let objBrace = {}
      let objType = object

      objBrace = true
      objBrace = 0
      objType = false // Error!
      objType = 1 // Error!
      ```
  - 高度な型
    * Intersection Types（交差）：複数の型を1つに統合する。
      ```
      type Dog = {
        tail: Tail
        bark: () => void
      }
      type Bird = {
        wing: Wing
        fly: () => void
      }
      type Kimera = Dog & Bird

      // 推論結果
      type Kimera = {
        tail: Tail
        wing: Wing
        bark: () => void
        fly: () => void
      }
      ```
    * Union Types（共用体）：複数の型のうちの1つの方が成立することを示す。
      ```
      let value: boolean | number | string
      value = false // OK
      value = 1 // OK
      value = '2' // OK

      let numberOrStrings: (number | string)[]
      numberOrStrings = [0, '1'] // OK
      numberOrStrings = [0, '1', false] // Error!
      ```
    * Literal Types：正確な値を指定できる
      ```
      // String Literal Types（string型のサブタイプ）
      let users: 'Taro' | 'Jiro' | 'Hanako'
      users = 'Hanako' // OK
      users = 'Keiko' // Error!

      // Numeric Literal Types（number型のサブタイプ）
      let bit: 8 | 16 | 32 | 64
      bit = 8 // OK
      bit = 12 // Error!

      // Boolean Literal Types（boolean型のサブタイプ）
      let truth: true
      truth = true // OK
      truth = false // Error!
* typeofキーワードとkeyofキーワード
* アサーション：？
  ```
  // 書き方は2通り
  let someValue: any = 'this is a string'
  let strLength: number = (<string>someValue).length // JSXでは非推奨
  let strLength: number = (someValue as string).length
  ```
* クラス
* 列挙型（enum）：複数の変数に一連の整数値を付ける必要がある場合に使用すると便利。 例えばswitch-case文のcaseの値など。

#### 型推論
typescriptの型宣言はとても強力な一方で、柔軟なプログラミングも許容する。Javascriptらしさを損なわず、開発者を手助けする。
ちょうどよい型推論が魅力である。

* const / let
  変数宣言時に代入された値からその値の型を推論できる。（※ constはWidening Literal Type）
  ```
  let user = 'Taro' // let user: string
  let value = 0 // let value: number
  let flag = false // let flag: boolean

  const user = 'Taro' // const user: string
  const value = 0 // const value: number
  const flag = false // const flag: boolean
  ```
* Array / Tuple
  ```
  // Array
  const a1 = [true, false] // const a1: boolean[]
  const a2 = [0, 1, '2'] // const a2: (string | number)[]
  const a3 = [galse, 1, '2'] // const a3: (string | number | boolean)[]

  // Tuple
  ```
* object
* 関数の戻り型
* Promise
* import構文
* JSON

#### 型安全
* 制約による型安全
* 抽象度による型安全
* 絞り込みによる型安全

#### 型システム
* 型の互換性
* 宣言の結合

#### 高度な型
* Generics
* Conditional Types
* Utility Types


### 実践

#### Vue.jsとTypescript
* Vue.extendベースの開発
* vue-class-componentベースの開発
* Vuexの型推論を探求する

#### Nuxt.jsとTypescript
* Typescriptで始めるNuxt.js
  - 開発環境の構築
  - ページコンポーネント
  - asyncData関数
  - app.$axiosの付与
  - asyncData関数を修正する
* Vuexの型課題を解決する
  - 名前空間を解決する
  - Module型定義を分離する
  - Vuex型定義を拡張する
  - SFCでthis.$storeを参照する
  - store.commitとstore.dispatchの型
  - store.stateの型
  - rootStateとrootGettersの型
  - nuxtServerInitにも付与する
  - 定義の整理






## 構築手順

* 手順
  1. create-nuxt-app
  2. tsconfig.js調整
  3. stylusいれる

## 実践
以下の機能をもつTODOアプリを最初に素のJavascriptで作成し、学習した内容を元にTypescriptに書き換える学習を行いました。
- json-serverを使ってモックを作成
- `タスクを追加` 押下で新規タスク入力欄を追加 + 入力欄にフォーカス
- `ごみ箱アイコン` 押下でタスクをリストから削除
- タスク内容を編集後フォーカスアウトまたはEnter押下でタスクリストを更新

キャプチャなど


## Nuxt(Options API)をtypescript化
1. Options API Vue.extend
  * 従来のVueの記法で書けるため、ある程度Vue2系に慣れいている人であれば、追加の学習コストがほとんどない
  * 変わる点
    - script langをtsに変更
    - Vueモジュールをimport/extend
    - コンポーネント、ページ自体にクラス名を付与
2. Class API @Component
   * Nuxt.js（2系） + TypeScript環境で最もメジャーな組み合わせであったこともあり、ドキュメントが豊富に揃っている
   * vue-property-decoratorを使用した記法が必要となるので、Vueの標準の記法とは異なり、多少慣れが必要
   * Vue3では廃止
3. Composition API
   * Vue3で採用された新しいAPI
   * 各コンポーネントがVueインスタンス（this）に依存しないためテストが書きやすく、TypeScriptとの相性が良い

## 勉強してみた感想
* ...
* ...
* ...
* ...