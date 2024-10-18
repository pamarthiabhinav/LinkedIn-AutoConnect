let activeTabId = null;

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url?.includes("linkedin.com")) {
    activeTabId = tabId;
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'checkLinkedIn') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const isLinkedIn = tabs[0]?.url?.includes('linkedin.com') || false;
      sendResponse({ isLinkedIn, tabId: tabs[0]?.id });
    });
    return true;
  }
});
