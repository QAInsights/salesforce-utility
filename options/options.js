document.addEventListener("DOMContentLoaded", function () {
  const notification = document.getElementById("notification");
  notification.style.display = "none";

  const userConfigValue = loadOptions().then((value) => {
    document.getElementById("setupPage").value = value;
    return value;
  });
});

document.getElementById("submitButton").addEventListener("click", function () {
  saveOptions();
});

document.getElementById("resetButton").addEventListener("click", function () {
  chrome.runtime.sendMessage(
    { action: "loadDefaultOptions" },
    function (response) {}
  );
});

async function loadOptions() {
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
function writeToLocalStorage(key, value) {
  chrome.storage.local.set({ [key]: value }, function () {
    console.log("New Value is ", key, value);
  });
}

function saveOptions() {
  // Prevent form from submitting
  // event.preventDefault();

  const setupPageUri = document.getElementById("setupPage").value;
  if (setupPageUri.length <= 0) {
    const invalidTooltip = document.getElementById("invalid-tooltip");
    invalidTooltip.style.display = "block";
    setTimeout(() => {
      invalidTooltip.style.display = "none";
    }, 3000);
    return;
  }

  cleanupInput(setupPageUri);
  writeToLocalStorage("setup", setupPageUri);

  // Show the notification upon successful submission
  notification.style.display = "block";

  // Optionally, hide the notification after a few seconds
  setTimeout(() => {
    notification.style.display = "none";
  }, 3000); // Adjust time as needed
}

function cleanupInput(input) {
  if (input.trim().startsWith("/")) {
    // remove leading slash
    return input.trim().substring(1);
  }
  return input.trim();
}
