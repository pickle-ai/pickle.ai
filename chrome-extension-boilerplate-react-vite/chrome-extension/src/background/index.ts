import 'webextension-polyfill';
// import { exampleThemeStorage } from '@extension/storage';

// exampleThemeStorage.get().then(theme => {
//   console.log('theme', theme);
// });

console.log('background loaded');
console.log("Edit 'chrome-extension/src/background/index.ts' and save to reload.");

// listen to the popup user-code message
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Message received in background script', request, 'sender', sender);
  if (request.type === 'user-code') {
    console.log('User code received in background script', request);
    sendMessageToBackend(request).then(response => {
      console.log('Response from backend', response);
      sendResponse(response);
    });
    // return true because we want to send response asynchronously
    return true;

    // send message back to popup
    // console.log('Sending response to popup', message);
    // sendResponse(message);
    // chrome.runtime.sendMessage({ type: 'llm-response', payload: message });
  }
});

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   console.log('Message received in background script', request, 'sender', sender);
//   if (request.type === 'user-code') {
//     console.log('User code received in background script', request);
//     const message = sendMessageToBackend(request);
//     // send message back to popup
//     sendResponse(message);
//     // chrome.runtime.sendMessage({ type: 'llm-response', payload: message });
//   }
// });

const mockLLMResponse = {
  data: {
    response:
      'Optimization suggestions for the minWindow function include: 1) Replace the map with unordered_map for better average-case time complexity.\n2) Use a vector instead of a map for character frequency counting.\n3) Implement a sliding window approach with two pointers to reduce unnecessary iterations.\n4) Remove the inner while loop and maintain a count of matched characters.\n5) Utilize early termination conditions to exit the loop when a valid window is found.',
  },
};

async function sendMessageToBackend(payload: unknown) {
  console.log('Sending message to backend', payload);
  // const flaskRequest = await fetch('http://localhost:8000/', {
  //   method: 'GET',
  //   body: JSON.stringify(message),
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });
  // const flaskResponse = await flaskRequest.text();
  const flaskResponse = mockLLMResponse;
  // console.log('Response from backend', flaskResponse);
  return flaskResponse;
}