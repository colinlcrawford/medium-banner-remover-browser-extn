function getMediumStickyHeader () {
  return document.querySelector('.metabar.js-metabar')
}

function getMediumStickyFooter () {
  return document.querySelector('.js-stickyFooter')
}

function getBottomBanner () {
  return document.querySelector('.js-meterBanner')
}

function getMediumBanners () {
  return filter([
    getMediumStickyHeader(),
    getMediumStickyFooter(),
    getBottomBanner()
  ], isTruthy)
}

function removeDomNode (domNode) {
  return domNode.remove()
}

/**
 * removes the medium ad and popup banners from the page
 */
function removeMediumBanners () {
  return map(getMediumBanners(), removeDomNode)
}

removeMediumBanners()

// ==========================================
// ===== Some helper functions
// ==========================================
function map (arr, fn) {
  return arr.map(fn)
}

function filter (arr, fn) {
  return arr.filter(fn)
}

function isTruthy (value) {
  return !!value
}
// ==========================================
