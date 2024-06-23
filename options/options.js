document.addEventListener("DOMContentLoaded", function () {
  console.log("Options page loaded.");
  const optionsForm = document.getElementById("options-form");
  optionsForm.addEventListener("submit", saveOptions);
  // if (optionsForm) {
  //   optionsForm.addEventListener("submit", saveOptions);
  // }
});

function writeToLocalStorage(key, value) {
  console.log("Setting new value");
  chrome.storage.local.set({ [key]: value }, function () {
    console.log("New Value is " + value);
  });
}

function saveOptions(event) {
  event.preventDefault();
  const setupPageUri = document.getElementById("setupPage").value;
  console.log(setupPageUri);
  writeToLocalStorage("setup", setupPageUri);
  console.log("Options saved.");
  // Prevent form from submitting
}
