
describe ("Todo functional test", ()=> {

    it("Set a wrong format for the todo date and verify validation error is present.", function () {
        cy.visit('http://localhost:9000');
        cy.get('input[name="datetime"]')
            .first()
            .type("10");

        cy.get('.fieldError');
    });

    it("Set a correct format for the todo date and check that no validation error is present.", function () {
        cy.visit('http://localhost:9000');
        cy.get('input[name="datetime"]')
            .first()
            .type("10/10/2019");

        cy.get('.fieldError').should('have.length', 0);
    });
});

