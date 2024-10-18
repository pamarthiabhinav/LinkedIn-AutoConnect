# LinkedIn AutoConnect

## Overview

**LinkedIn AutoConnect** is a Chrome extension developed to automate the process of sending connection requests on LinkedIn, designed for users looking to efficiently grow their professional network. Whether for sales, recruiting, or expanding your personal connections, this tool does the heavy lifting while keeping you in control.

## Features

- Automatically detects LinkedIn search result pages.
- Sends connection requests to profiles on your behalf.
- User-friendly interface to start and stop the connection process with a single click.
- Real-time connection counter to monitor progress.
- Built-in delays to mimic human interaction and reduce detection risk.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/pamarthiabhinav/LinkedIn-AutoConnect.git
   ```

2. **Set up in Chrome:**
   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable "Developer mode" in the top-right corner.
   - Click "Load unpacked" and select the folder where the repository was cloned.

3. **Launch the extension:**
   - You should now see the LinkedIn AutoConnect icon in your toolbar.

## Usage Instructions

1. Go to LinkedIn, search for people you'd like to connect with, and open the extension from the toolbar.
2. Click the `START CONNECTING` button to begin sending connection requests.
3. The extension will automatically detect "Connect" buttons and send out invites.
4. Keep an eye on the invitation counter in the popup interface.
5. To stop the automation, simply click `STOP CONNECTING` at any time.

## Architecture

The architecture of this extension is designed for simplicity and reliability, ensuring users have full control over the automation process while minimizing detection risks. Here's a breakdown of how it works:

### **Background Script (`background.js`)**
The background script monitors your active tabs and checks if LinkedIn is open. When a LinkedIn page is detected, it enables interaction with the content script that handles sending invites.

### **Content Script (`content.js`)**
This script does the actual heavy lifting:
- It scans the LinkedIn search results for "Connect" buttons.
- Simulates clicks on those buttons and sends out connection requests.
- Incorporates random delays between actions to mimic human interaction and avoid detection.

### **Popup Script (`popup.js`)**
The popup script gives users a simple interface to control the extension:
- You can start or stop the auto-connect process with a click.
- A circular progress bar shows the number of connection requests sent, ensuring transparency.

## Thought Process Behind the Design

When designing this extension, I focused on three key principles:

- **User Control:** While automation is great, it’s essential that users remain in control. That’s why I built a start/stop functionality into the popup, allowing users to manage the connection process with ease.
- **Human-Like Interaction:** I wanted to make sure the automation simulates real human behavior to avoid detection. That’s why random delays were included between actions, and only one request is processed at a time to reduce risk.
- **Efficiency:** The extension is lightweight, with the content script only activated on LinkedIn pages. This ensures minimal resource usage while maximizing performance.

This project reflects my ability to design solutions that balance automation with user control, delivering both functionality and safety for end-users in a professional context.

## License

MIT License

```
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
```

## Copyright

©2024 Abhinav Pamarthi. This project is licensed under the MIT License. Contributions are welcome!