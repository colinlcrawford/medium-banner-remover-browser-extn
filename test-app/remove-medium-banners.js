function getNav () {
  return querySelector('nav')
}

function getMediumStickyHeader () {
  return querySelector('.metabar.js-metabar')
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
  return querySelector('.js-stickyFooter')
}

function getBottomBanner () {
  return querySelector('.js-meterBanner')
}

function getBottomFreeSignUpExtraPreviewBanner () {
  return pipe([
    filter(
      hasText('Get one more story in your member preview when you sign up')
    ),
    first,
    nthGenerationParent(6)
  ])(querySelectorAll('h2'))
}

function getMediumBanners () {
  return filter(isTruthy)([
    getMediumHeader(),
    getMediumStickyFooter(),
    getBottomBanner(),
    getBottomFreeSignUpExtraPreviewBanner()
  ])
}

/**
 * removes the medium ad and popup banners from the page
 */
function removeMediumBanners () {
  return map(removeDomNode)(getMediumBanners())
}

removeMediumBanners()

/*
==========================================
|======== Some helper functions =========|
==========================================
*/
function map (fn) {
  return function (arr) {
    return arr.map(fn)
  }
}

function filter (fn) {
  return function (arr) {
    return arr.filter(fn)
  }
}

function reduce (fn) {
  return function (arr) {
    return function (initialVal) {
      return arr.reduce(fn, initialVal)
    }
  }
}

function isTruthy (value) {
  return !!value
}

function pipe (fns) {
  return reduce(function (acc, nextFn) {
    return nextFn(acc)
  })(fns)
}

function emptyArray (n) {
  return Array(n).fill()
}

function first (arr) {
  return arr[0]
}

function iF (predicate) {
  return function (whenTrue) {
    return function (whenFalse) {
      return function (value) {
        return predicate(value) ? whenTrue(value) : whenFalse(value)
      }
    }
  }
}

function when (predicate) {
  return function (whenTrue) {
    return iF(predicate)(whenTrue)(function () {
      return undefined
    })
  }
}

function id (value) {
  return function () {
    return value
  }
}

/*
 * DOM helpers
 */

function removeDomNode (domNode) {
  return domNode.remove()
}

function querySelector (selector) {
  return document.querySelector(selector)
}

function querySelectorAll (selector) {
  return [...document.querySelectorAll(selector)]
}

function parentNode (domNode) {
  return domNode.parentNode
}

function nthGenerationParent (n) {
  const safelyGetParent = when(isTruthy)(parentNode)
  const getNParents = map(id(safelyGetParent))(emptyArray(n))
  return pipe(getNParents)
}

function hasText (text) {
  return function (node) {
    return node.textContent.includes(text)
  }
}
/* ===================================== */
