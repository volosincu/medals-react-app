

describe ("Todos landing page integration test", ()=> {

    const LANDING_TITLT = "The todos list",
          TODO_OBJECTIVE_PERSONAL = "Personal",
          TODO_OBJECTIVE_PROFESIONAL = "Profesional";


    it("Navigate to landing page and verify the title", function () {
        cy.visit('http://localhost:9000');
        cy.get('.todos-title').contains(LANDING_TITLT).click();
    });

    it("Check the objective type checkbox and verify the update correctness.", function () {
        cy.visit('http://localhost:9000');

        cy.get(".selected-objective-type").contains(TODO_OBJECTIVE_PERSONAL);
        cy.get('#objective-type').click();
        cy.get(".selected-objective-type").contains(TODO_OBJECTIVE_PROFESIONAL);
    });

});
