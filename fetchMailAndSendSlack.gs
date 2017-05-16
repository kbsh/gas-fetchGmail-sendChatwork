// チャンネル名
var CHANNEL_ID = "#test"
// 投稿するbotの名前
var BOT_NAME = "うさぎ。";
// 投稿するbotのアイコンURL
var BOT_ICON_URL = "http://hoge/image/hoge1.jpg";

// Gmail検索条件
var CONDITION = '(is:unread 検索条件)';
// メンション
var SEND_LIST = [
  "kbsh",
];

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
  var token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN'); 
  var slackApp = SlackApp.create(token); //SlackApp インスタンスの取得

  slackApp.postMessage(
    CHANNEL_ID,
    message,
    {
      username: BOT_NAME,
      icon_url: BOT_ICON_URL
    }
  );
}
