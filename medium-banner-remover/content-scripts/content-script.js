/* global browser, chrome */

/* ======================== Extension API wrappers ========================= */
function getFromStorage (key) {
  if (chrome) {
    return new Promise(resolve => chrome.storage.sync.get(key, v => resolve(v)))
  }
  if (browser) {
    return browser.storage.sync.get(key)
  }
  return Promise.resolve()
}

function sendMessage (message) {
  if (chrome) {
    return chrome.runtime.sendMessage(message)
  } else if (browser) {
    return browser.runtime.sendMessage(message)
  }
}
/* ========================================================================= */

/* ========================= Storage Interactors =========================== */
function pickAutoRun (obj) {
  return obj.autoRun
}

function savedAutoRunIsChecked () {
  return getFromStorage('autoRun').then(pickAutoRun).then(Boolean)
}
/* ========================================================================= */

/* ============================== Messaging  =============================== */
function sendClearBannersMessage () {
  return sendMessage({ command: 'clearBanners' })
}
/* ========================================================================= */

/* ============================= Utility Fns  ============================== */
function when (predicate) {
  return whenTrue => value => predicate(value) && whenTrue()
}
/* ========================================================================= */

function websiteIsMedium () {
  return window.location.href.includes('medium.com')
}

function bannersShouldBeCleared (autoClearIsOn) {
  if (!autoClearIsOn) return false
  return websiteIsMedium()
}

function clearBanners () {
  return sendClearBannersMessage()
}

function main () {
  savedAutoRunIsChecked().then(when(bannersShouldBeCleared)(clearBanners))
}

main()
