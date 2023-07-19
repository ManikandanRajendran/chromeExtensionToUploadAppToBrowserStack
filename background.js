import {getLatestQaBuild} from "./api/appCenter.js"
import {generateBasicToken, uploadAppCenterApp} from "./api/browserstack.js"
import chromeNotification from "./chromeNotification.js"

var download_url, authorization, appId 

chrome.runtime.onMessage.addListener(async (data) => {
    const { event, prefs } = data
    switch(event){
        case "android":
            download_url = await getLatestQaBuild("Android", prefs.token)
            if(!download_url.includes("Error"))
            {
                authorization = await generateBasicToken(prefs.username, prefs.password)
                appId = await uploadAppCenterApp("Android", download_url, authorization)
                let retValue;
                appId.includes(`Error`)? retValue = "BS - Failed" : retValue="Uploaded successfully"
                setRunningStatus(false)
                chrome.runtime.sendMessage(retValue)
            }
            else{
                await chromeNotification(`FAILED - APP CENTER --> ${download_url}`)
                setRunningStatus(false)
                chrome.runtime.sendMessage("App Center Failed")
            }    
            break;

        case "ios":
            setRunningStatus(true)
            download_url = await getLatestQaBuild("IOS", prefs.token)
            if(!download_url.includes("Error"))
            {
                authorization = await generateBasicToken(prefs.username, prefs.password)
                appId = await uploadAppCenterApp("IOS", download_url, authorization)
                let retValue;
                appId.includes(`Error`)? retValue = "BS - Failed" : retValue="Uploaded successfully"
                setRunningStatus(false)
                chrome.runtime.sendMessage(retValue)
            }
            else{
                await chromeNotification(`FAILED - APP CENTER --> ${download_url}`)
                setRunningStatus(false)
                chrome.runtime.sendMessage("App Center Failed")
            }
            break;
        case "remember":
            handleRemember(prefs)
            break;
        default:
            break;
    }
})

const handleRemember = async (data) =>{
    chrome.storage.local.set(data)
}

const setRunningStatus = (isRunning) =>{
    chrome.storage.local.set({isRunning})
}

