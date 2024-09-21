// called when the user install this extension
chrome.runtime.onInstalled.addListener(() => {
  // Load options from storage
  loadDefaultOptions();
});

// called when the user clicks on the browser action.
chrome.action.onClicked.addListener(async (tab) => {
  // Send a message to the active tab
  chrome.tabs.query(
    { active: true, currentWindow: true },
    async function (tabs) {
      const currentUrl = tabs[0].url;

      const urlObj = new URL(tabs[0].url);
      const newUri = await readUri();

      const setupUrl = urlObj.protocol + "//" + urlObj.hostname + "/" + newUri;
      chrome.tabs.create({ url: setupUrl });
    },
  );
});

function readUri() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(["setup"], function (result) {
      if (result.setup) {
        resolve(result.setup);
      } else {
        reject('No value found for "setup"');
      }
    });
  });
}

async function loadDefaultOptions() {
  // Set setup page to default
  const items = await fetch("default.json");
  const data = await items.json();

  for (const key in data) {
    const options = data[key];
    for (const option in options) {
      const pageName = option;
      const pageUri = options[option];
      console.log(pageName, pageUri);

      chrome.storage.local.set({ [pageName]: pageUri }).then(() => {});

      chrome.storage.local.get([pageName], function (result) {});
    }
  }
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "loadDefaultOptions") {
    // Assuming loadDefaultOptions is a function that returns the default options
    loadDefaultOptions().then((defaultOption) => {
      sendResponse({ defaultOption: defaultOption });
    });
    return true;
  }
});
