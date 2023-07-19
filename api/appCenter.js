import chromeNotification from "../chromeNotification.js"


export async function getLatestQaBuild(platform, token){
    console.log("************************************")
    console.log(`Getting latest QA build of ${platform}`)
    console.log("************************************")
    let ownerName = "mobile-4dxl"
    let appName = `FDSB-${platform}-Daily-QA`
    let config = {
        method: "get",
        maxBodyLength: Infinity,
        headers: {
            'Access-Control-Allow-Headers':"*",
            "accept": "application/json",
            "X-API-Token": token,
        }
    }
    const response = await (await fetch(`https://appcenter.ms/api/v0.1/apps/${ownerName}/${appName}/releases/latest`, config))
    const data = await response.json()
    if(response.status == 200){
        const download_url = data["download_url"];
        await chromeNotification(`Got the latets App url from AppCenter ${download_url}`)
        return download_url
    }else{
        console.log(data);
        return `Error --> ${data.message}`
    } 
}

// async function chromeNotification(msg){
//     var options = {
//         title: "Got the latest App from Appcenter",
//         message: msg,
//         iconUrl: "assets/smartphone.png",
//         type: "basic",
//       };
//       chrome.notifications.create("", options);
// }