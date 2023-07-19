export default async function chromeNotification(msg){
    var options = {
        title: "Got the latest App from Appcenter",
        message: msg,
        iconUrl: "assets/smartphone.png",
        type: "basic",
      };
      chrome.notifications.create("", options);
}