const counter = {
  value: 0
};

const MAX_INVITATIONS = 50;

function updateCounter(count) {
  const counterElement = document.getElementById('counter');
  const circle = document.querySelector('.circle');
  const circumference = 339.292;

  counterElement.textContent = count;
  
  const offset = circumference - (count / MAX_INVITATIONS * circumference);
  circle.style.strokeDashoffset = offset;
}

async function injectContentScript(tabId) {
  try {
    await chrome.scripting.executeScript({
      target: { tabId },
      files: ['content.js']
    });
    console.log('Content script injection completed');
  } catch (err) {
    console.log('Content script injection error:', err);
  }
}

async function initialize() {
  const response = await chrome.runtime.sendMessage({ action: 'checkLinkedIn' });
  
  if (!response.isLinkedIn) {
    document.body.innerHTML = '<div style="padding: 20px; color: white;">Please open a LinkedIn page to use this extension</div>';
    return;
  }

  await injectContentScript(response.tabId);

  document.getElementById('startButton').addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('stopButton').style.display = 'block';
    
    chrome.tabs.sendMessage(tab.id, { 
      action: 'start',
      timestamp: Date.now()
    });
  });

  document.getElementById('stopButton').addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    document.getElementById('startButton').style.display = 'block';
    document.getElementById('stopButton').style.display = 'none';
    
    chrome.tabs.sendMessage(tab.id, { 
      action: 'stop',
      timestamp: Date.now()
    });
  });
}

document.addEventListener('DOMContentLoaded', initialize);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'updateCount') {
    counter.value = request.count;
    updateCounter(counter.value);
  }
});