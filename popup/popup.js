chrome.storage.local.set({"isRunning":false})

//Elements
const runningElement = document.getElementById("runningStatus")
const failedElement = document.getElementById("failedStatus")
const successElement = document.getElementById("successStatus")
const notStartedElement = document.getElementById("notStarted")
const usernameElement = document.getElementById("username")
const passwordElement= document.getElementById("password")
const tokenElement = document.getElementById("token")
const rememberMeElement = document.getElementById("remember")
const clearElement = document.getElementById("clear")
const androidElement = document.getElementById("Android")
const iosElement = document.getElementById("Ios")
const bothElement = document.getElementById("Both")

chrome.storage.local.set({isRunning:false})
const disableElement = (elem) =>{
    elem.disabled = true
}

const enableElement = (elem) =>{
    elem.disabled = false
}

const hideElement = (elem) =>{
   elem.style.display = 'none' 
}

const showElement = (elem) =>{
    elem.style.display = '' 
 }

const disableElements = () =>{
    disableElement(usernameElement)
    disableElement(passwordElement)
    disableElement(tokenElement)
    disableElement(androidElement)
    disableElement(iosElement)
    disableElement(rememberMeElement)
    disableElement(clearElement)
}

const enableElements = () =>{
    enableElement(usernameElement)
    enableElement(passwordElement)
    enableElement(tokenElement)
    enableElement(androidElement)
    enableElement(iosElement)
    enableElement(clearElement)
}

async function readUsername(){
    if(usernameElement.value){
        return usernameElement.value
    }
    
}

async function readpassword(){
    if(passwordElement.value){
        return passwordElement.value
    }
}

async function readToken(){
    if(tokenElement.value){
        return tokenElement.value
    }
}


androidElement.onclick = async () => {
    showElement(runningElement)
    hideElement(failedElement)
    hideElement(successElement)
    hideElement(notStartedElement)
    disableElements()
    const prefs = {
        username: await readUsername(),
        password: await readpassword(),
        token: await readToken()
    }
    chrome.runtime.sendMessage({event:"android", prefs})
    // showElement(stoppedElement)
    // hideElement(runningElement)
}

iosElement.onclick = async () => {
    showElement(runningElement)
    hideElement(failedElement)
    hideElement(successElement)
    hideElement(notStartedElement)
    disableElements()
    const prefs = {
        username: await readUsername(),
        password: await readpassword(),
        token: await readToken()
    }
    chrome.runtime.sendMessage({event:"android", prefs})
    // showElement(stoppedElement)
    // hideElement(runningElement)
}

rememberMeElement.onclick = async () => {
    const prefs = {
        username: await readUsername(),
        password: await readpassword(),
        token: await readToken()
    }
    chrome.runtime.sendMessage({event:"remember", prefs})
}

clearElement.onclick = async () => {
    // chrome.storage.local.clear()
    usernameElement.value = ""
    passwordElement.value = ""
    tokenElement.value = ""
}

// both.onclick = async function(){
//     console.log(await readToken());
// }

chrome.storage.local.get(["username","password","token", "isRunning"], (results) =>{
    const {username, password, token, isRunning} = results;
    if(username){
        usernameElement.value = username
        disableElement(rememberMeElement)
    }
    if(password){
        passwordElement.value = password
    }
    if(token){
        tokenElement.value = token
    }
console.log(`isRunning ${isRunning}`);
    if(isRunning){
        showElement(runningElement)
        hideElement(failedElement)
        hideElement(successElement)
        hideElement(notStartedElement)
    }else{
        hideElement(runningElement)
        hideElement(failedElement)
        hideElement(successElement)
        showElement(notStartedElement)
    }
})

const afterSet = (value) => {
    let element
    switch(value){
        case "Uploaded successfully":
            element = successElement
            break;
        case "BS - Failed":
        case "App Center Failed":
            element = failedElement
            break;
        default:
            break
    }
    console.log(`inside ${value}`);
    element.innerHTML = value
    showElement(element)
    hideElement(runningElement)
    enableElements()
}

chrome.runtime.onMessage.addListener((value)=>{
    console.log(`after execution return value ${value}`);
    switch(value){
        case "Uploaded successfully":
            afterSet(value)
            break
        case "BS - Failed":
            afterSet(value)
            break
        case "App Center Failed":
            afterSet(value)
            break
        default:
            break
    }
})

