/* global browserAction, chrome, tabs, browser */

/* ======================== Extension API wrappers ========================= */
function registerMessageListener (cb) {
  if (chrome) {
    return chrome.runtime.onMessage.addListener(cb)
  } else if (browser) {
    return browser.runtime.onMessage.addListener(cb)
  }
}

function runMediumBannerRemoverScript (file) {
  if (chrome) {
    return chrome.tabs.executeScript({ file })
  } else if (browser) {
    return tabs.executeScript({ file })
  }
}
/* ========================================================================= */

/* ============================= Utility Fns  ============================== */
function when (predicate) {
  return whenTrue => value => predicate(value) && whenTrue()
}
/* ========================================================================= */

/**
 * registers a cb with the browser to be run when the
 * extension icon is clicked
 * (the extension icon is on the bar at the top of the browser)
 */
function registerOnExtensionIconClicked (cb) {
  if (chrome) {
    return chrome.browserAction.onClicked.addListener(cb)
  } else if (browser) {
    return browserAction.onClicked.addListener(cb)
  }
}

function isClearBannersMessage (message) {
  return message.command && (message.command === 'clearBanners')
}

function removeMediumBanners () {
  const scriptPath = '/content-scripts/remove-medium-banners.js'
  return runMediumBannerRemoverScript(scriptPath)
}

function registerOnClearBannersMessageListener () {
  return registerMessageListener(when(isClearBannersMessage)(removeMediumBanners))
}

function main () {
  registerOnExtensionIconClicked(removeMediumBanners)
  registerOnClearBannersMessageListener()
}

main()
