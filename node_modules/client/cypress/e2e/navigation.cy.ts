import { variables } from "../../src/variables"

describe('navigation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('coin page on table item click', () => {
    cy.get('[data-testid="coin-table-body"]').should("exist").children().get('tr:nth-child(2)').click()
    cy.location('pathname').should('contain', '/coin/')
    cy.get('[data-testid="coin-page"]').should("exist")
    cy.get('[data-testid="graph-price"]').should("exist")
  })

  it('coin page on search item click', () => {
    cy.get('[data-testid="search-shown"]').click()
    cy.get('#searchInput').click().type('bitcoin{enter}', {
      delay: 100
    });
    cy.get('[data-testid="search-coins"] div:first').click()

    cy.location('pathname').should('contain', '/coin/')
    cy.get('[data-testid="coin-page"]').should("exist")
    cy.get('[data-testid="graph-price"]').should("exist")
  })

  it('error page', () => {
    cy.visit('http://localhost:3000/not-existing-page/')
    cy.get('[data-testid="not-found"]').should("contain", "404 - Page not found")
  })

  it('pagination', () =>{
      cy.get('[data-testid="pagination"]').should("exist")
      cy.get('#pagination').get('a:nth-child(4)').click()
      cy.location('search').should('contain', '?page=2')

      cy.get('[data-testid="pagination"]').should("exist")
      cy.get('#pagination').get('a:nth-child(2)').click()
      cy.location('search').should('contain', '?page=1')

      cy.get('[data-testid="pagination"]').should("exist")
      cy.get('#pagination').get('a:nth-child(5)').click()
      cy.location('search').should('contain', '?page='+variables.LAST_PAGE)

      cy.get('[data-testid="pagination"]').should("exist")
      cy.get('#pagination').get('a:nth-child(1)').click()
      cy.location('search').should('contain', '')
    
  })
})