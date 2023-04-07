export default class Homepage {

    getSearchInput = () => {
        return cy.get('[class="search-input"] input')
    }

    getSearchResult = () => {
        return cy.get('[class=launch-card]')
    }

    getSearchCloseIcon = () => {
        return cy.get('[class="close-icon"]')
    }

    getPages = () => {
        return cy.get('[class=pagination] div')
    }
}