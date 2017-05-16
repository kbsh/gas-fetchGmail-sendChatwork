# gasまとめました。


## fetchMailAndSendChatWork.gs

- Gmailから好きな条件で検索し、ChatWorkへ通知します。
- 送信時、好きなアカウントへToをつけることができます。
- 使用方法

  - apiトークンを取得してください
    - http://developer.chatwork.com/ja/authenticate.html

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

  - Appの登録を行い、webhook urlを取得してください
    - https://api.slack.com/apps
    - https://imj-sys.slack.com/apps/new/A0F7XDUAZ-incoming-webhooks

  - パラメータを書き換えてください。
    - CHANNEL_ID
    - BOT_NAME
    - BOT_ICON_URL
    - WEBHOOK_URL
    - CONDITION
- 時限のトリガーの設定をしてください。

