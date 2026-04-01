var extension = {
  getUrl: function(file) {
    return chrome.runtime.getURL(file);
  }
}

module.exports = extension;
