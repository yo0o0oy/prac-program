# 開発環境の構築

## create-react-app
  babel, webpack, ESLintなどの設定をまとめてしてくれる

  ## 構築手順
  1. インストール
    - npm run -g create-react-app
  2. 構築
    - crete-react-app project-name
  3. 起動
    - cd project-name
    - npm start

## チュートリアル
 * よくある間違い
   - onClickの値は関数。`onclick={ console.log('xxx') }` とするとrenderのたびに出力されてしまう。
 * thisの混乱しやすい挙動があるのでアロー関数を使うとよい

## Reactコンポーネント
 * `class XXX extends React.Component {}`
 * 自分自身でstateを管理せず、親コンポーネントから値を受け取ったりイベントを親コンポーネントに伝えるだけのコンポーネントを`制御されたコンポーネント (controlled component) `という
 * render
 * state
   - 状態を持つことができる（例：以前のヒストリをそのまま保って後で再利用できる）
   - 定義されているコンポーネント内でプライベート
   - React コンポーネントクラスのコンストラクタで設定
   - サブクラスのコンストラクタを定義する際は常に`super(props)`（オブジェクトの親の関数を呼び出す）の呼び出しから始める
   - `setState`でstateを更新。`setState` でReactはその内部の子コンポーネントも自動的に更新する。
   - 更新時はコピーを更新するようにする
     * 複雑な機能が簡単に実装できる
     * 変更の検出が容易
     * 定変更があったかどうか簡単に分かるため、コンポーネントをいつ再レンダーすべきなのか決定しやすくなる
   - 複数の子要素からデータを集めたい、2つの子コンポーネントに互いにやりとりさせたいと思った場合は**親コンポーネント内で共有のstateを宣言する**と常にデータが同期され読みやすいコードに
 * イベント
   - Reactでは、イベントを表すpropsにはon[Event] という名前、イベントを処理するメソッドには handle[Event]という名前を付けるのが慣習
   - 親コンポーネントからpropsのon[Event]で関数を渡し、子コンポーネントでthis.props.on[Event]を実行する

## 関数コンポーネント
 * renderメソッドだけを有して自分のstateを持たないコンポーネントを、よりシンプルに書くための方法
 * propsを入力として受け取り表示すべき内容を返す関数を定義
 * `function XXX(props) { return (<div onClick={props.onClick}>{props.value}</div>) }`