if (!window.linkedInConnectorInitialized) {
  window.linkedInConnectorInitialized = true;

  class LinkedInConnector {
    constructor() {
      if (LinkedInConnector.instance) {
        return LinkedInConnector.instance;
      }
      LinkedInConnector.instance = this;

      this.isRunning = false;
      this.processedButtons = new Set();
      this.invitationCount = 0;
      
      this.initializeMessageListener();
      
      console.log('LinkedIn Connector initialized');
    }

    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    getRandomDelay() {
      return Math.floor(Math.random() * (10000 - 5000 + 1) + 5000);
    }

    updatePopupCounter() {
      chrome.runtime.sendMessage({ 
        action: 'updateCount', 
        count: this.invitationCount 
      });
    }

    async startConnecting() {
      if (this.isRunning) {
        console.log('Already running, ignoring start request');
        return;
      }

      console.log('Starting connection process...');
      this.isRunning = true;
      
      const buttons = document.querySelectorAll('button span.artdeco-button__text');
      for (const buttonSpan of buttons) {
	      if (!this.isRunning) break;
	      
	      const button = buttonSpan.parentElement;
	      const buttonText = buttonSpan.textContent.trim();
	      
	      if (this.processedButtons.has(button) || buttonText !== 'Connect') continue;
	      
	      this.processedButtons.add(button);
	      button.click();
	      
	      await this.sleep(1000);
	      
	      const sendButton = document.querySelector('button[aria-label="Send without a note"]');
	      if (sendButton) {
	        sendButton.click();
	        this.invitationCount++;
	        this.updatePopupCounter();
	      }
	      
	      await this.sleep(this.getRandomDelay());
        }
    }

    stopConnecting() {
      console.log('Stopping connection process...');
      this.isRunning = false;
    }

    initializeMessageListener() {
      chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        console.log('Received message:', request.action);
        
        if (request.action === 'start') {
          this.startConnecting();
        } else if (request.action === 'stop') {
          this.stopConnecting();
        }
      });
    }

    static getInstance() {
      if (!LinkedInConnector.instance) {
        LinkedInConnector.instance = new LinkedInConnector();
      }
      return LinkedInConnector.instance;
    }
  }

  const connector = LinkedInConnector.getInstance();

  window.linkedInConnector = connector;

  console.log('LinkedIn Connector content script loaded (first time)');
} else {
  console.log('LinkedIn Connector content script already loaded, skipping initialization');
}