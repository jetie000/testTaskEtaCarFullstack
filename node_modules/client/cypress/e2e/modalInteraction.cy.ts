describe('modal interaction', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
    })
  
    it('add coin from table correct info', () => {
      cy.get('[data-testid="coin-table-body"]').get('tr:nth-child(2) th:last-child button').click()
      cy.get('[data-testid="add-input-modal"]').should('exist').type('2');
      cy.get('[data-testid="add-input-modal"] ~ button').should('exist').click();
      cy.get('[data-testid="add-response"]').should("contain", "Ok");

      cy.reload();
      cy.get('[data-testid="header-mycoins"] button').should('exist').click();
      cy.get('[data-testid="purchase-mycoins"]:last-child > :last-child > :last-child').should('exist').click();
    })

    it('add coin from table incorrect info (negative number)', () => {
      cy.get('[data-testid="coin-table-body"]').get('tr:nth-child(2) th:last-child button').click()
      cy.get('[data-testid="add-input-modal"]').should('exist').type('-2');
      cy.get('[data-testid="add-input-modal"] ~ button').should('exist').click();
      cy.get('[data-testid="add-response"]').should("contain", "Error")
    })

    it('add coin from table incorrect info (letters)', () => {
      cy.get('[data-testid="coin-table-body"]').get('tr:nth-child(2) th:last-child button').click()
      cy.get('[data-testid="add-input-modal"]').should('exist').type('asds');
      cy.get('[data-testid="add-input-modal"] ~ button').should('exist').click();
      cy.get('[data-testid="add-response"]').should("contain", "Error")
    })
  })