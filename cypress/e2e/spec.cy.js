import Homepage from '../pages/Homepage'

const validateLastPage = (pages,lastPage) => {
  const pageTextValues = Array.from(pages).map(page => page.outerText)
  
  const lastPageValue = pageTextValues[pageTextValues.length - 1]

  expect(lastPageValue).to.equal(lastPage)
}

describe('template spec', () => {

  const homepage = new Homepage()

  it('passes', () => {
    cy.visit('https://csb-x6dpt1.netlify.app/')

    cy.request('https://api.spacexdata.com/v3/rockets').as('rockets')

    cy.get('@rockets').its('body').should('have.length', 4)

    cy.get('@rockets').its('body').then(response => {

      const firstFlightDates = response.map(elements => elements.first_flight)

      const firstFlightYears = firstFlightDates.map(dates => parseInt(dates.slice(0,4)))
      
      firstFlightYears.forEach(year => expect(year).to.be.greaterThan(2005))
    })

    homepage.getSearchInput().should('be.visible')

    homepage.getSearchInput().type('crx')

    homepage.getSearchResult().should('not.exist')

    homepage.getSearchCloseIcon().click()

    homepage.getPages().then(pages => validateLastPage(pages,'12'))

    cy.reload()

    homepage.getPages().then(pages => validateLastPage(pages,'12'))
  })
})