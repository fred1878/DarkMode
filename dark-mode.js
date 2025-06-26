let isDarkModeEnabled = false;

function toggleDarkMode() {
  isDarkModeEnabled = !isDarkModeEnabled;
  const darkModeStyle = document.getElementById('dark-mode-filter');
  if (isDarkModeEnabled) {
    if (!darkModeStyle) {
      const style = document.createElement('style');
      style.id = 'dark-mode-filter';
      style.textContent = `html {
        filter: invert(1) hue-rotate(180deg) !important;
        background: #111 !important;
        }`;
      document.head.appendChild(style);
    }
  } else {
    if (darkModeStyle) darkModeStyle.remove();
  }
  chrome.storage.local.set({ darkModeEnabled: isDarkModeEnabled });
}

chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  if (request.action === 'toggleDarkMode') {
    toggleDarkMode();
    sendResponse({ status: 'toggled', enabled: isDarkModeEnabled });
  } else if (request.action === 'getDarkModeStatus') {
    sendResponse({ enabled: isDarkModeEnabled });
  }
});

chrome.storage.local.get(['darkModeEnabled'], (result) => {
  if (result.darkModeEnabled) {
    isDarkModeEnabled = true;
    applyDarkMode();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.shiftKey && event.key === 'D') {
    event.preventDefault();
    toggleDarkMode();
  }
}); 