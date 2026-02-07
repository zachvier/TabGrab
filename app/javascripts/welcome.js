import '../stylesheets/welcome.scss';

document.addEventListener('DOMContentLoaded', () => {
  // Helper to localize elements
  const setHtml = (id, messageKey) => {
    const el = document.getElementById(id);
    if (el) {
      el.innerHTML = chrome.i18n.getMessage(messageKey);
    }
  };

  // Localize content
  document.title = chrome.i18n.getMessage("txt_welcome_header_main");
  setHtml('header-thank-you', 'txt_welcome_header_thank_you');
  setHtml('header-main', 'txt_welcome_header_main');
  setHtml('header-hook', 'txt_welcome_header_hook');
  
  setHtml('header-what-do', 'txt_welcome_header_what_do');
  setHtml('body-what-do', 'txt_welcome_body_what_do');
  
  setHtml('header-new-tab', 'txt_welcome_header_new_browser_tab');
  setHtml('body-new-tab', 'txt_welcome_body_new_browser_tab');
  
  setHtml('header-lose-work', 'txt_welcome_header_lose_work');
  setHtml('body-lose-work', 'txt_welcome_body_lose_work');
  
  setHtml('header-what-links', 'txt_welcome_header_what_links');
  setHtml('body-what-links', 'txt_welcome_body_what_links');
  
  setHtml('btn-read-docs', 'txt_welcome_button_read_docs');

  // Handle documentation button click
  const docsBtn = document.getElementById('btn-read-docs');
  if (docsBtn) {
    docsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      chrome.tabs.create({ url: 'https://github.com/zachvier/TabGrab#readme' });
    });
  }
});
