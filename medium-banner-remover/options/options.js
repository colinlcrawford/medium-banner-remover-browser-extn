/* global browser, chrome */

function getBrowser () {
  if (chrome) return chrome
  if (browser) return browser
}

function withBrowser (fn, noBrowser) {
  const browser = getBrowser()
  if (!browser && noBrowser) return noBrowser()
  if (!browser) return
  return fn(browser)
}

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

function getFromStorage (key) {
  if (chrome) {
    return new Promise(resolve => {
      chrome.storage.sync.get(key, v => resolve(v))
    })
  }
  if (browser) {
    return browser.storage.sync.get(key)
  }
  return Promise.resolve()
}

function setInStorage (keyValues) {
  if (chrome) {
    return new Promise(resolve => {
      chrome.storage.sync.set(keyValues, resolve)
    })
  }
  if (browser) {
    return browser.storage.sync.set(keyValues)
  }
  return Promise.resolve()
}

function pickAutoRun (obj) {
  return obj.autoRun
}

/** @returns a promise that resolves to a boolean saved by the user */
function savedAutoRunIsChecked () {
  return getFromStorage('autoRun').then(pickAutoRun).then(Boolean)
}

function saveOptions (e) {
  withBrowser(browser => setInStorage({ autoRun: autoRunIsChecked() }))
  e.preventDefault()
}

function restoreOptions () {
  return savedAutoRunIsChecked().then(setAutoRunCheckbox)
}

document.addEventListener('DOMContentLoaded', restoreOptions)
document.querySelector('form').addEventListener('submit', saveOptions)
