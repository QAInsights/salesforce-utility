const validUrls = ["salesforce", "lightning.force"];
chrome.action.onClicked.addListener(async (tab) => {
  // Send a message to the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentUrl = tabs[0].url;
    console.log("message sent");
    console.log("Current url", currentUrl);
    
    const validUrl = validUrls.some((url) => {
      console.log("url", url);
      console.log("Host", tabs[0]);

      return currentUrl.includes(url);
    });
    console.log(validUrl);

    if (validUrl) {

      console.log("valid url");
      const urlObj = new URL(tabs[0].url);
      

      console.log("Host name", urlObj.protocol, urlObj.hostname);

      // setup url https://*.lightning.force.com/lightning/setup/SetupOneHome/home
      // change to setup url
      const setupUri = "/lightning/setup/SetupOneHome/home";
      const setupUrl = urlObj.protocol + "//" + urlObj.hostname + setupUri
      chrome.tabs.create({ url: setupUrl });
    }

    // check for valid salesforce url
  });
});
