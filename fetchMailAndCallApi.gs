/**
 * チャットワーク投稿用情報
 */
var TOKEN      = 'xxxxxx';                         // チャットワークAPIトークン
var ACCOUNT_ID = 000000;                           // 投稿アカウントID
var ROOM_ID    = 000000;                           // ルームID

/**
 * Toを送るアカウント情報
 */
var send_list = [
  000000,     // アカウントA
  000000,     // アカウントB
  000000,     // アカウントC
];

/**
 * Gmailから特定条件のスレッドを検索しメールを取り出す
 * メッセージをChatworkに送る
 */
function fetchMailAndCallApi() {
  // Gmail検索条件
  var condition = '(is:unread from:xxx@xxx.com)';

  // 条件にマッチしたスレッドを取得
  var threads = GmailApp.search(
    condition, // 検索条件
    0,        // offset
    500       // limit
  );

  // スレッドからメールを取得する
  var messages = GmailApp.getMessagesForThreads(threads);
 
  for(var i = 0; i < messages.length; i++){ 
    // メールの情報を取得する
    var date    = Utilities.formatDate( messages[i][0].getDate(), 'JST', 'yyyy年M月d日 HH時mm分ss秒');
    var subject = messages[i][0].getSubject();
    var body    = messages[i][0].getPlainBody().slice(0,10000);

    // chatworkのメッセージを作成
    var message_body = "";
    for(var key = 0; key < send_list.length; key++){
      message_body += "[To:" + send_list[key] + "]";
    }
    message_body += "[info]";
    message_body += "[title]" + subject + "[/title]";
    message_body += "[code]" + body + "[/code]";// 絵文字防止のため。リンクがあるなどの場合はcodeタグをはずす
    message_body += "[hr]" + date;
    message_body += "[/info]";

    // chatworkでメッセージを送信する
    sendMessage(message_body);

    // 既読にする
    threads[i].markRead();
  }

}

/**
 * chatworkでメッセージを送信する
 */
function sendMessage(message_body){
  var params = {
    headers : {"X-ChatWorkToken" : TOKEN},
    method : "post",
    payload : {
      body : message_body
    }
  };
 
  var url = "https://api.chatwork.com/v1/rooms/" + ROOM_ID + "/messages";
  UrlFetchApp.fetch(url, params);
}
