document.addEventListener('DOMContentLoaded', async () => {
  const toggle = document.getElementById('darkModeToggle');
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  try {
    const response = await chrome.tabs.sendMessage(tab.id, { action: 'getDarkModeStatus' });
    toggle.checked = response.enabled;
  } catch (error) {
    const result = await chrome.storage.local.get(['darkModeEnabled']);
    toggle.checked = result.darkModeEnabled || false;
  }
  
  toggle.addEventListener('change', async () => {
    await chrome.tabs.sendMessage(tab.id, { action: 'toggleDarkMode' });
    await chrome.storage.local.set({ darkModeEnabled: toggle.checked });
  });
}); 