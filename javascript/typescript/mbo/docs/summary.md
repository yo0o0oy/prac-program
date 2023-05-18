# Typescript

## Typescriptとは
 * Javascriptの上位互換（= JavaScriptが持つ機能を維持しつつ、追加の機能をそなえた言語）
 * Typescriptの特徴
   - 静的型付け：あらかじめ型を定義する（←→動的型付け：実行時にデータ型を決める）
   - インターフェースとクラスの定義が可能
   - 基本構文はJavaScriptとほぼ同じ
 * TypeScriptが生まれたきっかけは、大規模化するフロントエンドの開発。規模が大きくなっていくにつれて、JavaScriptでは型定義が行えないため、コードに変更を加えるとどのような影響があるか検証するのに時間がかかる。型定義をすることでプログラムを動かさずとも、バグが無いか未然に検知できるようになり大規模な開発における生産性を大きく向上させた。
 * TypeScriptは「AltJS（= JavaScriptより優れた機能を持ち、コンパイル（トランスパイル）後はJavaScriptのコードが生成される言語）」のひとつで次世代のJavaScriptの最有力候補と言われている。

## 学習内容まとめ
* tsconfig.json [参考](https://blog.isystk.com/system_develop/frontend/typescript/757/)
  - compilerOptions
    * target
    * module
    * ...
    * ...
    * ...
    * ...
    * ...
  - exclude
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
* アサーション：？
  ```
  // 書き方は2通り
  let someValue: any = 'this is a string'
  let strLength: number = (<string>someValue).length // JSXでは非推奨
  let strLength: number = (someValue as string).length
  ```
* 
* 
* 
* 
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

## 勉強してみた感想
* ...
* ...
* ...
* ...