# gasまとめました。


## fetchMailAndSendChatWork.gs

- Gmailから好きな条件で検索し、ChatWorkへ通知します。
- 送信時、好きなアカウントへToをつけることができます。
- 使用方法
  - apiトークンを取得してください（http://developer.chatwork.com/ja/authenticate.html）
  - パラメータを書き換えてください。
    - TOKEN
    - ACCOUNT_ID
    - ROOM_ID
    - send_list
    - gmail search condition
- 時限のトリガーの設定をしてください。

## fetchMailAndSendSlack.gs

- Gmailから好きな条件で検索し、Slackへ通知します。
- 送信時、~好きなアカウントへメンションをつけることができます。~@hereメンションをつけます。
- 使用方法
  - Appの登録を行い、apiトークンを取得してください（https://api.slack.com/apps）
  - パラメータを書き換えてください。
    - CHANNEL_ID
    - BOT_NAME
    - BOT_ICON_URL
    - CONDITION
    - SEND_LIST
    - api token
      - ファイル→プロジェクトのプロパティ→スクリプトのプロパティ→`SLACK_ACCESS_TOKEN`に値を設定してください。
- 時限のトリガーの設定をしてください。

