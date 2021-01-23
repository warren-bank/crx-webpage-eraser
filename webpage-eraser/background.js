chrome.browserAction.onClicked.addListener(tab => {
  chrome.tabs.sendMessage(tab.id, 'toggle_active_mode')
})
