describe('Todo List Sort Functionality', () => {
    beforeEach(() => {
        cy.visit("/");

    });


    const createTodo = (title, priority, category, dueDate) => {
        if (title !== null) {
            cy.log(title)
            cy.get('[data-set="todo-form"] input[name = "title"]').type(title);

            cy.get('form[data-set="todo-form"]')
                .find('input[type="text"]')
                .last()
                .click();

            // Datum setzen
            cy.get('div.react-datepicker__day')
                .contains(dueDate.getDate())
                .click();

            cy.get('.react-datepicker__time-list-item')
                .contains(`${dueDate.getHours()}:${dueDate.getMinutes() < 10 ? '0' + dueDate.getMinutes() : dueDate.getMinutes()} ${dueDate.getHours() >= 12 ? 'PM' : 'AM'}`)
                .click();

            // Kategorie und Priorität setzen
            cy.get('[data-set="todo-form"] select[name = "category"]').select(category);
            cy.get('[data-set="todo-form"] select[name = "priority"]').select(priority);

            // Todo hinzufügen
            cy.get('button[data-set="add-todo-btn"]').click();
        }

    };

    it("clear all", () => {
        cy.get('[data-set="todo-form"] input[name = "title"]').type("TEST: Add a movie");
        cy.get('[data-set = "add-todo-btn"]').should("exist").click();
        cy.get('[data-set="todo-list"] li').each((todo) => {
            cy.wrap(todo)
                .find('[data-set="delete-todo-btn"]')
                .click();
        });
    });

    it('load test data', () => {
        const dueDate1 = new Date();
        dueDate1.setDate(dueDate1.getDate() + 2);
        dueDate1.setHours(12, 30, 0, 0);

        const dueDate2 = new Date();
        dueDate2.setDate(dueDate2.getDate() + 3);
        dueDate2.setHours(9, 0, 0, 0);

        const dueDate3 = new Date();
        dueDate3.setDate(dueDate3.getDate() + 1);
        dueDate3.setHours(7, 0, 0, 0);

        const dueDate4 = new Date();
        dueDate4.setDate(dueDate4.getDate() + 4);
        dueDate4.setHours(6, 30, 0, 0);

        const dueDate5 = new Date();
        dueDate5.setDate(dueDate5.getDate() + 5);
        dueDate5.setHours(5, 0, 0, 0);

        // Erstelle Todos
        createTodo('Task 1', 'High', 'Work', dueDate1);
        createTodo('Task 2', 'Low', 'Private', dueDate2);
        createTodo('Task 3', 'Medium', 'Work', dueDate3);
        createTodo('Task 4', 'High', 'Groceries', dueDate4);
        createTodo('Task 5', 'Low', 'Private', dueDate5);


    });

    it('should sort by priority from high to low', () => {
        cy.get('input[name="OrderHighToLow"]').check();

        cy.get('ul[data-set="todo-list"] li[data-type="todo-item"]')
            .eq(0).should('contain', 'Task 1');
        cy.get('ul[data-set="todo-list"] li[data-type="todo-item"]')
            .eq(1).should('contain', 'Task 4');

        cy.get('ul[data-set="todo-list"] li[data-type="todo-item"]')
            .eq(2).should('contain', 'Task 3');

        cy.get('ul[data-set="todo-list"] li[data-type="todo-item"]')
            .eq(3).should('contain', 'Task 2');

        cy.get('ul[data-set="todo-list"] li[data-type="todo-item"]')
            .eq(4).should('contain', 'Task 5');
    })

    it('should sort by priority from low to high', () => {
        cy.get('input[name="OrderLowToHigh"]').check();

        cy.get('ul[data-set="todo-list"] li[data-type="todo-item"]')
            .eq(0).should('contain', 'Task 2');
        cy.get('ul[data-set="todo-list"] li[data-type="todo-item"]')
            .eq(1).should('contain', 'Task 5');

        cy.get('ul[data-set="todo-list"] li[data-type="todo-item"]')
            .eq(2).should('contain', 'Task 3');

        cy.get('ul[data-set="todo-list"] li[data-type="todo-item"]')
            .eq(3).should('contain', 'Task 1');

        cy.get('ul[data-set="todo-list"] li[data-type="todo-item"]')
            .eq(4).should('contain', 'Task 4');
    })

    it('should sort by Category Private', () => {
        cy.get('input[name="OrderByCategory"]').check();
        cy.get('select[name = "category"]').last().select('Private');

        cy.get('ul[data-set="todo-list"] li[data-type="todo-item"]')
            .eq(0).should('contain', 'Task 2');
        cy.get('ul[data-set="todo-list"] li[data-type="todo-item"]')
            .eq(1).should('contain', 'Task 5');
    })

    it('should sort by due Date', () => {
        cy.get('input[name="OrderByDueDate"]').check();

        cy.get('ul[data-set="todo-list"] li[data-type="todo-item"]')
            .eq(0).should('contain', 'Task 3');
        cy.get('ul[data-set="todo-list"] li[data-type="todo-item"]')
            .eq(1).should('contain', 'Task 1');

        cy.get('ul[data-set="todo-list"] li[data-type="todo-item"]')
            .eq(2).should('contain', 'Task 2');

        cy.get('ul[data-set="todo-list"] li[data-type="todo-item"]')
            .eq(3).should('contain', 'Task 4');

        cy.get('ul[data-set="todo-list"] li[data-type="todo-item"]')
            .eq(4).should('contain', 'Task 5');
    })
});
