describe("todo tests", () => {
  beforeEach(() => {
    cy.visit("/");

  });


  it("should display the message when no todos are available", () => {
    cy.get('[data-set="todo-form"] input[name = "title"]').type("TEST: just a movie");
    cy.get('[data-set = "add-todo-btn"]').should("exist").click();
    //Delete all To-Dos
    cy.get('[data-set="todo-list"] li').each((todo) => {
      cy.wrap(todo)
          .find('[data-set="delete-todo-btn"]')
          .click();
    });
    cy.get('[data-set="todo-list"] li').should('have.length', 0);
    cy.contains("Keine ToDos vorhanden, erstelle welche").should("be.visible");
  });

  it("should render the todo app", () => {
    cy.getDataTest("todo-header").should("exist");
  });

  //-----------------------------Create------------------------------------------------------------------------------

  it("should add a todo", () => {
    cy.get('[data-set="todo-form"]').should("exist");
    cy.get('[data-set="todo-form"] input[name = "title"]').type("TEST: Add a movie");
    cy.get('[data-set = "add-todo-btn"]').should("exist").click();
    cy.contains("TEST: Add a movie").should("exist");
  });

  it("should add a todo with custom tag", () => {
    cy.get('[data-set="todo-form"]').should("exist");
    cy.get('[data-set="todo-form"] input[name = "title"]').type("TEST: Add a movie");
    cy.get('[data-set="todo-form"] select[name = "category"]').select('Custom');
    cy.get('[data-set="todo-form"] input[name = "category"]').type("My-Test-Category");


    cy.get('[data-set = "add-todo-btn"]').should("exist").click();
    cy.contains("TEST: Add a movie").should("exist");
  });

  it('should create a todo with a due date of 2 days from now at 12:30', () => {
    const title = 'TEST: Datum Movie';
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 2); // Set the due date to 2 days later
    dueDate.setHours(12, 30, 0, 0);

    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('input[name="title"]')
        .type(title)
        .should('have.value', title);

    cy.get('form[data-set="todo-form"]')
        .find('input[type="text"]')
        .last()
        .click();

    cy.get('div.react-datepicker__day')
        .contains(dueDate.getDate())
        .click();

    cy.get('.react-datepicker__time-list-item')
        .contains('2:30 PM')
        .click();

    // hinzufügen des Todos
    cy.get('button[data-set="add-todo-btn"]').click();


    cy.get('li[data-type="todo-item"]')
        .contains(title)
        .should('exist')

        // Das ToDos mit dem Titel holen und nächste klasse li holen, um dessen datum und Style zu kontrollieren
        .closest('li[data-type="todo-item"]')
        .then((todoItem) => {
          cy.wrap(todoItem)
              // CSS Prüfen
              .should('not.have.css', 'border', '2px solid rgb(255, 0, 0)')
              // Datum Prüfen
              .find('div.react-datepicker-wrapper div.react-datepicker__input-container input.input-text')
              .should(
                  'have.value',
                  `${dueDate.getDate().toString().padStart(2, '0')}.${(dueDate.getMonth() + 1).toString().padStart(2, '0')}.${dueDate.getFullYear()} ${dueDate.getHours().toString().padStart(2, '0')}:${dueDate.getMinutes().toString().padStart(2, '0')}`
              );
        });
  });

  it('should create a todo with a due date today at 12:30', () => {
    const title = 'TEST: Datum Movie Today';
    const dueDate = new Date();
    dueDate.setHours(12, 30, 0, 0);

    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('input[name="title"]')
        .type(title)
        .should('have.value', title);

    cy.get('form[data-set="todo-form"]')
        .find('input[type="text"]')
        .last()
        .click();

    cy.get('div.react-datepicker__day')
        .contains(dueDate.getDate())
        .click();

    cy.get('.react-datepicker__time-list-item')
        .contains('2:30 PM')
        .click();

    // hinzufügen des Todos
    cy.get('button[data-set="add-todo-btn"]').click();


    cy.get('li[data-type="todo-item"]')
        .contains(title)
        .should('exist')

        // Das ToDos mit dem Titel holen und nächste klasse li holen, um dessen datum und Style zu kontrollieren
        .closest('li[data-type="todo-item"]')
        .then((todoItem) => {
          cy.wrap(todoItem)
              // CSS Prüfen
              .should('have.css', 'border', '2px solid rgb(255, 0, 0)')
              // Datum Prüfen
              .find('div.react-datepicker-wrapper div.react-datepicker__input-container input.input-text')
              .should(
                  'have.value',
                  `${dueDate.getDate().toString().padStart(2, '0')}.${(dueDate.getMonth() + 1).toString().padStart(2, '0')}.${dueDate.getFullYear()} ${dueDate.getHours().toString().padStart(2, '0')}:${dueDate.getMinutes().toString().padStart(2, '0')}`
              );
        });
  });


  //----------------------------- Complete & Edit ------------------------------------------------------------------------------

  it('should edit / add dueDate to a todo with a due date of 2 days from now at 12:30', () => {
    const title = 'TEST: Datum Movie';
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 2); // Set the due date to 2 days later
    dueDate.setHours(12, 30, 0, 0);

    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('input[name="title"]')
        .type(title)
        .should('have.value', title);


    cy.get('input[type="text"]')
        .last()
        .click();

    cy.get('div.react-datepicker__day')
        .contains(dueDate.getDate())
        .click();

    cy.get('.react-datepicker__time-list-item')
        .contains('2:30 PM')
        .click();

    // hinzufügen des Todos
    cy.get('button[data-set="add-todo-btn"]').click();


    cy.get('li[data-type="todo-item"]')
        .contains(title)
        .should('exist')

        // Das ToDos mit dem Titel holen und nächste klasse li holen, um dessen datum und Style zu kontrollieren
        .closest('li[data-type="todo-item"]')
        .then((todoItem) => {
          cy.wrap(todoItem)
              // CSS Prüfen
              .should('not.have.css', 'border', '2px solid rgb(255, 0, 0)')
              // Datum Prüfen
              .find('div.react-datepicker-wrapper div.react-datepicker__input-container input.input-text')
              .should(
                  'have.value',
                  `${dueDate.getDate().toString().padStart(2, '0')}.${(dueDate.getMonth() + 1).toString().padStart(2, '0')}.${dueDate.getFullYear()} ${dueDate.getHours().toString().padStart(2, '0')}:${dueDate.getMinutes().toString().padStart(2, '0')}`
              );
        });
  });

  it('should edit priority, category and title', () => {
    const title = 'TEST: Edit bevore Movie';
    const newCategory = 'Private';
    const newPriority = 'HIGH';

    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('input[name="title"]')
        .type(title)
        .should('have.value', title);
    cy.get('button[data-set="add-todo-btn"]').click();

    cy.get('li[data-type="todo-item"]')
        .contains(title)
        .should('exist')

        .closest('li[data-type="todo-item"]')
        .then((todoItem) => {

          // eslint-disable-next-line cypress/unsafe-to-chain-command
          cy.wrap(todoItem)
              .find('input[type="text"]')
              .first()
              .clear({ force: true })
              .should('have.value', '');

          // eslint-disable-next-line cypress/unsafe-to-chain-command
          cy.wrap(todoItem)
              .find('select[name="category"]')
              .last()
              .select(newCategory)
              .should('have.value', newCategory);

          // eslint-disable-next-line cypress/unsafe-to-chain-command
          cy.wrap(todoItem)
              .find('select[name="priority"]')
              .last()
              .select(newPriority)
              .should('have.value', newPriority);
        });
  });


  it("should mark a todo as completed", () => {
    cy.get('[data-set="todo-form"] input[name = "title"]').type(
        "TEST: Complete a movie"
    );
    cy.get('[data-set = "add-todo-btn"]').should("exist").click();
    cy.contains("TEST: Complete a movie").should("exist");
    cy.get('[data-set="todo-list"] input[type ="checkbox"]')
        .should("exist")
        .should("not.be.checked");

    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.contains("TEST: Complete a movie")
        .parent()
        .find('input[type="checkbox"]')
        .should("exist")
        .should("not.be.checked")
        .click()
        .should("be.checked");
    cy.get('[data-set="todo-list"] input[type ="checkbox"]')
        .should("exist")
        .should("be.checked");
  });

  //----------------------------- Delete ------------------------------------------------------------------------------


  it("should delete a todo", () => {
    cy.get('[data-set="todo-form"] input[name = "title"]').type(
        "TEST: Delete a movie"
    );
    cy.get('[data-set = "add-todo-btn"]').should("exist").click();
    cy.contains("TEST: Delete a movie").should("exist");

    cy.contains("TEST: Delete a movie")
        .parent()
        .find('[data-set="delete-todo-btn"]')
        .should("exist")
        .click();

    cy.contains("TEST: Delete a movie").should("not.exist");
  });

  it("should delete all existing todos", () => {
    cy.get('[data-set="todo-list"] li').each((todo) => {
      cy.wrap(todo)
          .find('[data-set="delete-todo-btn"]')
          .click();
    });
  });
});


