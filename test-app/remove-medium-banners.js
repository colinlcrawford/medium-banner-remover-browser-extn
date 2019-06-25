function getNav () {
  return document.querySelector('nav')
}

function getMediumStickyHeader () {
  return document.querySelector('.metabar.js-metabar')
}

/**
 * Prefer the more granular sticky header -
 * but sometimes the class names seem to
 * be obfuscated, so just grab the nav element
 */
function getMediumHeader () {
  const stickyHeader = getMediumStickyHeader()
  return stickyHeader || getNav()
}

function getMediumStickyFooter () {
  return document.querySelector('.js-stickyFooter')
}

function getBottomBanner () {
  return document.querySelector('.js-meterBanner')
}

function getMediumBanners () {
  return filter(isTruthy, [
    getMediumHeader(),
    getMediumStickyFooter(),
    getBottomBanner()
  ])
}

function removeDomNode (domNode) {
  return domNode.remove()
}

/**
 * removes the medium ad and popup banners from the page
 */
function removeMediumBanners () {
  return map(removeDomNode, getMediumBanners())
}

removeMediumBanners()

/*
==========================================
|======== Some helper functions =========|
==========================================
*/
function map (fn, arr) {
  return arr.map(fn)
}

function filter (fn, arr) {
  return arr.filter(fn)
}

function isTruthy (value) {
  return !!value
}
/* ===================================== */
