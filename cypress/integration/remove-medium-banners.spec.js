const baseUrl = 'http://localhost:8080'
const backgroundScriptUrl = '/remove-medium-banners.js'

const loadBackgroundJs = win =>
  cy.request(baseUrl + backgroundScriptUrl)
    .then((resp) => win.eval(resp.body))

describe('remove-medium-banners', function () {
  describe('removeMediumBanners()', function () {
    it('removes top banners (div banner)', function () {
      cy.visit(baseUrl + '/div-header.html')

      cy.get('.metabar.js-metabar').should('exist')

      cy.window()
        .then(win => loadBackgroundJs(win))
        .then(() => cy.get('.metabar.js-metabar').should('not.exist'))
    })

    it('removes top banners (nav banner)', function () {
      cy.visit(baseUrl + '/nav-header.html')
      cy.get('nav').should('exist')

      cy.window()
        .then(win => loadBackgroundJs(win))
        .then(() => cy.get('nav').should('not.exist'))
    })

    it('removes the bottom banner', function () {
      cy.visit(baseUrl + '/bottom-banner.html')
      cy.get('.js-meterBanner').should('exist')

      cy.window()
        .then(win => loadBackgroundJs(win))
        .then(() => cy.get('.js-meterBanner').should('not.exist'))
    })

    it('removes the sticky footer', function () {
      cy.visit(baseUrl + '/sticky-footer.html')
      cy.get('.js-stickyFooter').should('exist')

      cy.window()
        .then(win => loadBackgroundJs(win))
        .then(() => cy.get('.js-stickyFooter').should('not.exist'))
    })
  })
})
