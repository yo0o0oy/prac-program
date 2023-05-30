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
 * インターフェースとクラスの定義が可能（→大規模なシステムをクラスを使って細分化し、チームで分担しながら開発を進めるのに適している）JavaScriptで使えないクラス生成ができるので、どうしてもJavaScriptだと長くなるコーディングが、TypeScriptのクラスベースの開発によって簡略化することが可能
 * AltJsの一つでJavascriptと相互に互換性を持っている
   - AltJsとはJavaScriptより優れた機能を持ち、コンパイル（トランスパイル）後はJavaScriptのコードが生成される言語
   - TypeScriptで書いたコードをJavaScriptに変換できるので、JavaScriptで書かれたコードを、処理に応じてTypeScriptで書き換えられる。またTypeScriptから直接JavaScriptを呼び出したり、反対にJavaScriptからTypeScriptを呼び出すこともできる。→ プログラムのメンテナンス性↑

## 学習内容まとめ

### **基本の型推論とアノテーション**
 * typescriptは勝手に型を推論してくれるけど、明示的に型をつけたい時は型アノテーションを使う。
 * 絶対に知っておくべき基本の型
   - プリミティブ型
     * string：すべての文字列を扱う型
     * number：整数、浮動小数点数、整数、負数、Infinity（無限大）、NaN（非数）など全ての数値を扱う型
     * boolean：trueとfalseの2つの値を扱う型
   - 存在しないことを表現する型
     * null：値が欠如していることを表す
     * undefined：初期化されておらず値が割り当てられていないことを表す
   - 型を許容する
     * any：どんな型でも許容する = 全く安全でないのでなるべく回避する
     * unknown：どんな型になるのか不明、代入した値によって型が変化する

### **関数**
 * 関数で使われる特別な型
   - void：戻り値を持たない関数の戻り値
   - never：決して戻ることのない関数の戻り値
 * 関数の型定義
   - パラメーター（関数宣言時に渡される値）
     * オプションパラメーター（省略可能なパラメーター）：オプショナルを表す `?` をつける
       ```
       const sample1 = (a: string, b?:string): boolean => {}
       ```
     * デフォルトパラメーター（初期値をもつパラメーター）：`=` で指定する、順序は関係なく記述できる
       ```
       const sample2 = (a: string, b = 'sample'): boolean => {}
       ```
     * レストパラメーター（不特定多数の引数を配列として受け取るパラメーター）：`...` を用いる、パラメーターの最後に1つだけ指定できる
       ```
       const sample3 = (...numbers: number[]): number => {}
       ```
   - 戻り値（関数が返す値）
 * 呼び出しシグネチャ
   - どのような関数なのかを表現する型定義
   - 記法は2種類
     * 省略記法：アロー関数と似た形
       ```
       type Func1 = (param: string) => void
       const func1: Func1 = () => {}
       ```
     * 完全な記法：オブジェクトと似た形
       ```
       type Func2 = {
        (param: string): void
       }
       const func2: Func2 = () => {}
       ```

### **オブジェクト**
 * tsのobject型はobjectであることを伝えるだけで構造は定義されないので定義しないといけない
 * オブジェクトの型定義
   - オブジェクトリテラル記法
     * 基本の形
       ```
       let obj: {
         name: string,
         age: number,
       } = {
         name: 'Tom',
         age: 20,
       }
       ```
     * 特別なプロパティ
       - オプショナル（`?`）のついたプロパティ = あってもなくてもOK
       - `readonly` のついたプロパティ = 上書きできない
       ```
       let obj: {
         readonly name: string,
         age?: number,
       } = {
         name: 'Tom',
       }
       obj.name = 'John' // Error!
       ```
     * インデックスシグネチャ（ = オブジェクトの柔軟な型定義）
       - オブジェクトが複数のプロパティを持つ可能性を示す
       - `[key: T]: U` のように定義する
       - keyはstringかnumberのみ
         ```
         const capitals: {
          [countryName: string]: string,
         } = {
          Japan: 'Tokyo',
          Korea: 'Seoul',
         }
         ```
   - 型エイリアス
     * typeを使って型に名前をつけて宣言できる
     * 再利用できるので同じ型を何度も定義する必要がない + コードの見通しも良くなる
     * 型に名前をつけることで変数の役割を明確化
       ```
       type Country: {
         language: string,
         name: string,
       }
       const japan: Country = {
         language: 'Japanese',
         name: 'Japan',
       }
       ```
   - 複雑な型の定義
     * 合併型（Union Types）：型 A, B の和集合（ = どちらかの型をもつ）を表す型
     * 交差型（Intersection Types）：型 A, B の積集合（ = 両方の型をもつ）を表す型
       ```
       type Kick = {
         effect: boolean;
         hit: boolean;
       };

       type Punch = {
         hit: boolean;
         damage: number;
       };

       type KickOrPunch = Kick | Punch;
       type KickAndPunch = Kick & Punch;
       ```

### **配列/タプル**
 * 配列の型定義
   - T[]
   - Array<T>
   - 合併型も使える（けどあまり使わない方がいい）
 * 配列の型推論
   ```
   const generateArray = () => {
     const _array = [] // any[]と推論される
     _array.push(123) // number[]と推論される
     _array.push('ABC') // (string | number)[]と推論される
   }
   const array = generateArray()
   array.push(true) // Error!
   ```
 * タプル（各要素の数と型を定義した配列）の型定義
   - 基本の記法
     ```
     let response: [number, string] = [200, 'OK]
     ```
   - 可変長（レストパラメーター）も使える
     ```
     const friends: [string, ...string[]] = ['Tom', 'John', 'Mary']
     ```
 * イミュータブル（= 書き換え不可）な配列/タプル
   - jsの配列はconstで宣言してもミュータブル（書き換え可能）
   - `readonly`でイミュータブルな配列/タプルを作れる
     ```
     const commands: readonly string[] = ['git add', 'git commit', 'git push']
     const commands: ReadonlyArray<string> = ['git add', 'git commit', 'git push']
     const commands: Readonly<string[]> = ['git add', 'git commit', 'git push']
     ```

### **ジェネリクス**

### **クラス**

### **interface vs type**

### **非同期処理**





<!-- ごみ -->
## 学習内容まとめ

* 参考書
実践TypeScript ~ BFFとNext.js & Nuxt.jsの型定義 ~
日本一わかりやすいTypeScript入門【基礎編】【とらゼミ】トラハックのエンジニア学習講座
TypeScript超入門 覚えることは9個だけ！ プラスウイングTV

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

