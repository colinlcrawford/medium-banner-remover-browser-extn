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
  return filter(isTruthy, [
    getMediumStickyHeader(),
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

// ==========================================
// ===== Some helper functions
// ==========================================
function map (fn, arr) {
  return arr.map(fn)
}

function filter (fn, arr) {
  return arr.filter(fn)
}

function isTruthy (value) {
  return !!value
}
// ==========================================
