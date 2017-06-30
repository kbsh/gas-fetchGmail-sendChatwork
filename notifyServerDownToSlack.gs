// チャンネル名
var CHANNEL_ID = "#general"
// 投稿するbotの名前
var BOT_NAME = "通知するマン。";
// 投稿するbotのアイコンURL
var BOT_ICON_URL = "https://hoge/1.jpg";
// webhook url
var WEBHOOK_URL = "https://hooks.slack.com/services/xxxx/xxxx/xxxx";

// チェックするIPアドレス
var IP_ADDRESS = "https://github.com";

// 合格ステータスコード
var STATUS_CODE_OK = 200;

// メッセージ
var MESSAGE_OK = "復活したよ";
var MESSAGE_NG = "サーバー落ちてるやんけ！";

// サーバー状態
var SERVER_STATUS_KEY = 'server_status';// PropertiesServiceのキー
var SERVER_STATUS_OK = 'status_ok';// 生きてる
var SERVER_STATUS_NG = 'status_ng';// しんでる


function main()
{
  // httpステータスを取得
  var status_code = getStatusCode(IP_ADDRESS);
  // 保存している現在の状態を取得
  var current_status = getCurrentStatus();

  if (current_status === undefined) {
    // 初回実行
    if (status_code == STATUS_CODE_OK) {
      setCurrentStatus(SERVER_STATUS_OK);
    } else {
      setCurrentStatus(SERVER_STATUS_NG);
      postSlackMessage(MESSAGE_NG);
    }
  } else if (status_code != STATUS_CODE_OK && current_status == SERVER_STATUS_OK) {
    // ダウンしたとき
    setCurrentStatus(SERVER_STATUS_NG);
    postSlackMessage(MESSAGE_NG);
  } else if (status_code == STATUS_CODE_OK && current_status == SERVER_STATUS_NG) {
    // ダウンから復帰したとき
    setCurrentStatus(SERVER_STATUS_OK);
    postSlackMessage(MESSAGE_OK);
  }
}

/**
 * httpステータスコードを取得します。
 * @param string url
 * @return integer ステータスコード
 */
function getStatusCode(url)
{ 
  var response = UrlFetchApp.fetch(
    url,
    { muteHttpExceptions:true }// エラー時に例外になるのもキャッチ
  );

  return response.getResponseCode();
}

/**
 * 保存している状態を取得します。
 * @return integer 状態タイプ
 */
function getCurrentStatus()
{
  return PropertiesService.getUserProperties().getProperty(SERVER_STATUS_KEY);
}

/**
 * 保存している状態を更新します。
 * @param integer 状態タイプ
 */
function setCurrentStatus(server_status)
{
  PropertiesService.getUserProperties().setProperty(SERVER_STATUS_KEY, server_status);
}

/**
 * slackにメッセージを送ります。
 * @param string message
 */
function postSlackMessage(message)
{
  // メンションつける
  message = "<!channel>\n" + message;

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
