function onExtensionIconClick(){
    // alert(42);
    chrome.tabs.executeScript( null, {"code": "window.getSelection().toString()"}, function(selection) {
        alert(selection[0])
    });
}

chrome.browserAction.onClicked.addListener(onExtensionIconClick);
