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

function setInStorage (keyValues) {
  if (chrome) {
    return new Promise(resolve => chrome.storage.sync.set(keyValues, resolve))
  }
  if (browser) {
    return browser.storage.sync.set(keyValues)
  }
  return Promise.resolve()
}
/* ========================================================================= */

/* =========================== DOM interactors ============================= */
function getAutoRunCheckbox () {
  return document.querySelector('#auto-run')
}

function setAutoRunCheckbox (checked) {
  const checkbox = getAutoRunCheckbox()
  checkbox.checked = checked
  return checkbox
}

function autoRunIsChecked () {
  return getAutoRunCheckbox().checked
}
/* ========================================================================= */

/* ========================= Storage Interactors =========================== */
function pickAutoRun (obj) {
  return obj.autoRun
}

/** returns a promise that resolves to a boolean saved by the user */
function savedAutoRunIsChecked () {
  return getFromStorage('autoRun').then(pickAutoRun).then(Boolean)
}

function saveOptions (e) {
  setInStorage({ autoRun: autoRunIsChecked() })
}
/* ========================================================================= */

function restoreOptions () {
  return savedAutoRunIsChecked().then(setAutoRunCheckbox)
}

function handleFormSubmit (e) {
  saveOptions()
  e.preventDefault()
}

function listenForFormSubmit () {
  return document.querySelector('form').addEventListener('submit', handleFormSubmit)
}

function main () {
  restoreOptions().then(listenForFormSubmit)
}

main()
