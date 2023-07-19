import chromeNotification from "../chromeNotification.js"

export async function uploadAppCenterApp(platform, appPath, authorization){
    console.log("********************************************")
    console.log("uploading the App Center app to browserstack")
    console.log("********************************************")
    let data = new FormData()
    data.append("url", appPath)
    let config = {
        method: "post",
        maxBodyLength: Infinity,
        headers: {
            "Authorization": authorization
        },
        body: data
    }

    const response = await (await fetch(`https://api-cloud.browserstack.com/app-automate/upload`, config))
    const data1 = await response.json()
    if (response.status == 200) {
        console.log("**************************************************")
        console.log(`App ${data1.app_url} uploaded Successfully`)
        console.log("**************************************************")
        console.log(`Latest ${platform} app has been uploaded to BrowserStack. App Id --> ${data1.app_url}`);
        await chromeNotification(`Latest ${platform} app has been uploaded to BrowserStack. App Id --> ${data1.app_url}`)
        return data1.app_url
    }else{
        console.log(data1.error);
        return (`Error --> ${data1.error}`)
    }
}

export async function generateBasicToken(username, password){
    const token = btoa(username + ":" + password)
    return `Basic ${token}`
 }

//  async function chromeNotification(msg){
//     var options = {
//         title: "App Uploaded to BrowserStack",
//         message: msg,
//         iconUrl: "assets/smartphone.png",
//         type: "basic",
//       };
//       chrome.notifications.create("", options);
// }
