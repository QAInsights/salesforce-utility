const validUrls = ["salesforce", "lightning.force"];

// called when the user install this extension
chrome.runtime.onInstalled.addListener(() => {
  console.log("Installed");
  // Load options from storage
  loadDefaultOptions();
});

// called when the user clicks on the browser action.
chrome.action.onClicked.addListener(async (tab) => {
  // Send a message to the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
    const currentUrl = tabs[0].url;

    const validUrl = validUrls.some((url) => {
      return currentUrl.includes(url);
    });

    if (validUrl) {
      const urlObj = new URL(tabs[0].url);
      //   const setupUri = "/lightning/setup/SetupOneHome/home";
      const newUri = await readUri();
      console.log("New URI: " + newUri);
      const setupUrl = urlObj.protocol + "//" + urlObj.hostname + newUri;
      console.log("Setup URL: " + setupUrl);
      chrome.tabs.create({ url: setupUrl });
    }
  });
});

function readUri() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(["setup"], function (result) {
      if (result.setup) {
        console.log("Value currently is " + result.setup);
        resolve(result.setup);
      } else {
        reject('No value found for "setup"');
      }
    });
  });
}

async function loadDefaultOptions() {
  console.log("Loading default options");
  // Set setup page to default
  const items = await fetch("default.json");
  const data = await items.json();

  for (const key in data) {
    const options = data[key];
    for (const option in options) {
      const pageName = option;
      const pageUri = options[option];
      console.log(pageName, pageUri);

      chrome.storage.local.set({ [pageName]: pageUri }).then(() => {
        console.log("Value is set");
      });

      chrome.storage.local.get([pageName], function (result) {
        console.log("Default Value currently is " + result[pageName]);
      });
    }
  }

  chrome.storage.local.get(null, function (items) {
    console.log(items);
  });
}
