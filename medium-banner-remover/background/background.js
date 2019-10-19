/* global browserAction, chrome, tabs, browser */

function runMediumBannerRemoverScript (file) {
  if (chrome) {
    chrome.tabs.executeScript({ file })
  } else if (browser) {
    tabs.executeScript({ file })
  }
}

/**
 * registers a cb with the browser to be run when the
 * extension icon is clicked
 */
function registerOnExtensionIconClicked (cb) {
  if (chrome) {
    chrome.browserAction.onClicked.addListener(cb)
  } else if (browser) {
    browserAction.onClicked.addListener(cb)
  }
}

function removeMediumBanners () {
  return runMediumBannerRemoverScript('/content-scripts/remove-medium-banners.js')
}

registerOnExtensionIconClicked(removeMediumBanners)
