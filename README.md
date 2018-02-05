# webview_sample_web

## 起動手順

```
git clone https://github.com/ozaki25/webview_sample_web.git
cd webview_sample_web
npm i
npm start
```
- デフォルトだと3000ポートで起動する

## コンセプト

- Webからはファイルをローカルからアップロード、スマホアプリからはカメラで撮影したファイルをアップロードさせたい
  - できた
- Webアプリ自体はスマホアプリのWebViewから利用されることを意識することのない作りとしたい
  - 無理でした。SPAにせずにjQueryごりごりで行くならできるかも(撮影したファイル情報をReactに渡すところで断念したため)


## アプリの内容

1. ファイルを選択or撮影する
1. 選択or撮影したファイルをプレビュー
1. 「Upload」押下でサーバにアップロード
1. 「Download」押下でサーバからダウンロード

## アプリの動き

### ブラウザ

- なぜか色がおかしい...

![web](https://user-images.githubusercontent.com/10087419/35786888-aeacca96-0a6d-11e8-8fc6-67362cc140f1.gif)

### Android(WebView)

![android](https://user-images.githubusercontent.com/10087419/35786891-b76be77a-0a6d-11e8-92d6-dee191aefbc4.gif)

### ios(webView)

![ios](https://user-images.githubusercontent.com/10087419/35786890-b5bde11c-0a6d-11e8-9cf4-0980d167b6e9.gif)

## 関連リポジトリ

- スマホアプリ
  - https://github.com/ozaki25/webview_sample_native
- API
  - https://github.com/ozaki25/webview_sample_api
