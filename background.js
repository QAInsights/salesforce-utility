const validUrls = ["salesforce", "lightning.force"];
chrome.action.onClicked.addListener(async (tab) => {
  // Send a message to the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentUrl = tabs[0].url;
    console.log("message sent");
    console.log("Current url", currentUrl);
    
    const validUrl = validUrls.some((url) => {
      console.log("url", url);
      return currentUrl.includes(url);
    });
    console.log(validUrl);

    if (validUrl) {
      console.log("valid url");
      chrome.tabs.create({ url: tabs[0].url });
    }

    // check for valid salesforce url
  });
});
