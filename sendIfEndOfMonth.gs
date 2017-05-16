/**
 * チャットワーク投稿用情報
 */
var TOKEN   = 'xxxxxx'; // チャットワークAPIトークン
var ROOM_ID = xxxxxx;   // ルームID

/**
 * Toを送るアカウント情報
 */
var send_list = [
  xxxxxx,    // user A
  xxxxxx,    // user B
  xxxxxx,    // user C
];

/**
 * メッセージパターン
 */
var message_list = [
  "１２３４５６７８１０\n１２３４５６７８２０\n１２３４５６７８３０",
  "abcdefg\nhijk....",
];

/**
 * メッセージ接尾
 */
var message_suffix = "接尾語です\n２行目";

/**
 * 判定してメッセージ送信
 */
function callSendMessageIfNeeded(){
  // 月末からN日以内の営業日か
  if (!isLastWorkDay()) {
    return;
  }

  // メッセージを取得
  var message_body = "";
  for(var key = 0; key < send_list.length; key++){
    message_body += "[To:" + send_list[key] + "]";
  }
  message_body += "\n";
  message_body += message_list[Math.floor(Math.random() * message_list.length)];
  message_body += message_suffix;

  // メッセージ送信
  sendMessage(message_body);
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

/**
 * 月末から2日以内の営業日か
 */
function isLastWorkDay(){
  var current_date = new Date();
  var toyear = current_date.getFullYear();
  var tomonth = current_date.getMonth();
  var today = current_date.getDate();

  // 本日が休日か
  if (isWeekday(current_date)) {
    return false;
  }
 
  /**
   * 月末から1日ずつさかのぼり、2日営業日があれば抜ける
   * そのうちの営業日が本日であればtrueを返す
   */
  var end = new Date(toyear, tomonth + 1, 0);
  var end_date = end.getDate();
  var count = 0;
  var count_limit = 2;
  var is_today = false;
  for (;;) {
    // 本日か
    is_today = (end_date == today);

    // 営業日か
    if (!isWeekday(end)) {
      // 本日であればtrueを返却
      if (is_today) {
        return true;
      }

      // 営業日をカウント
      count++;
    }

    // 月末から2日内の営業日じゃない
    if (count >= count_limit) {
      return false;
    }

    // 判定日を前日にする
    end_date--;
    end = new Date(toyear, tomonth, end_date);
  }
}

/**
 * 休日か
 */
function isWeekday(target_date){
  var weekday = target_date.getDay();

  // 土日
  if (weekday == 0 || weekday == 6) {
    return true;
  }

  // 祝日
  var calendar = CalendarApp.getCalendarById('ja.japanese#holiday@group.v.calendar.google.com');
  if (calendar.getEvents(target_date, target_date).length > 0) {
    return true;
  }

  return false;
}
