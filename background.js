function onExtensionIconClick(){
    chrome.tabs.executeScript( null, {"code": "window.getSelection().toString()"}, function(selection) {
        let remotedatetime = selection[0];
        alert(convert(remotedatetime));
    });
}

chrome.browserAction.onClicked.addListener(onExtensionIconClick);
