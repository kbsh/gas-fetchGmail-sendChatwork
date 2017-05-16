// チャンネル名
var CHANNEL_ID = "#test"
// 投稿するbotの名前
var BOT_NAME = "うさぎ。";
// 投稿するbotのアイコンURL
var BOT_ICON_URL = "http://hoge/image/hoge1.jpg";
// webhook url
var WEBHOOK_URL = "https://hooks.slack.com/services/xxxx/xxxx/xxxx";
// Gmail検索条件
var CONDITION = '(is:unread 検索条件)';

/**
 * Gmailから取得したメッセージをslackに流します。
 */
function fetchMailAndCallApi()
{
  // 条件にマッチしたスレッドを取得
  var threads = GmailApp.search(
    CONDITION, // 検索条件
    0,        // offset
    500       // limit
  );

  // スレッドからメールを取得する
  var messages = GmailApp.getMessagesForThreads(threads);
 
  for(var i = 0; i < messages.length; i++){ 
    // メールの情報を取得する
    var subject = messages[i][0].getSubject();
    var body    = messages[i][0].getPlainBody().slice(0,10000);

    // メッセージを作成
    var message_body = "";
    for(var key = 0; key < SEND_LIST.length; key++){
      message_body += "@" + SEND_LIST[key] + "\n";
    }
    message_body += "\n" + ">" + subject + "\n";
    message_body += "```";
    message_body += body;
    message_body += "```";

    // slackでメッセージを送信する
    postSlackMessage(message_body);

    // 既読にする
    threads[i].markRead();
  }

}

/**
 * slackにメッセージを送ります。
 * @param string message
 */
function postSlackMessage(message)
{
  var param = {
    payload : JSON.stringify({
      channel : CHANNEL_ID,
      username : BOT_NAME,
      text : message,
      icon_url : BOT_ICON_URL
    })
  };
 
  UrlFetchApp.fetch(WEBHOOK_URL, param);
}
