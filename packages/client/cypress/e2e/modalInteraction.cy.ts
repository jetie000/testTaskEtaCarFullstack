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
      cy.get('[data-testid="sell-btn-wrapper"] > :last-child').should('exist').click();
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

    it('fav coin from table', () => {
      cy.get('[data-testid="coin-table-body"]').get('tr:nth-child(2) th:first-child img').click()
      cy.get('[data-testid="header-mycoins"] button').should('exist').click();
      cy.get('[data-testid="purchase-mycoins"] > :nth-child(2) > :first-child').should('exist').click();
      cy.get('[data-testid="purchase-mycoins"] > :nth-child(2) > :first-child').should('not.exist')
    })

    
    it('fav coin from coin page', () => {
      cy.get('[data-testid="coin-table-body"]').should("exist").children().get('tr:nth-child(2)').click()
      cy.get('[data-testid="coin-page"] > :first-child > :first-child > :last-child').should('exist').click();
      cy.get('[data-testid="header-mycoins"] button').should('exist').click();
      cy.get('[data-testid="purchase-mycoins"] > :nth-child(2) > :first-child').should('exist').click();
      cy.get('[data-testid="purchase-mycoins"] > :nth-child(2) > :first-child').should('not.exist')
    })
  })