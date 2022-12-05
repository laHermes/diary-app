beforeEach(() => {
	cy.visit('http://localhost:3000');
});
describe('Visit landing page', () => {
	it('should visit Landing page', () => {
		cy.visit('http://localhost:3000');
	});

	it('should find landing page title', () => {
		cy.get('h1').contains('Track your mood');
	});

	it('should find Get started button', () => {
		cy.get('button').contains('Get started');
	});

	it('should find Try it out button', () => {
		cy.get('button').contains('Try it out');
	});

	it('clicking "Get started" should navigate to a new url', () => {
		cy.get('button').contains('Get started').click();
		cy.url().should('include', '/login');
	});

	it('clicking "Try it out" should navigate to a new url', () => {
		cy.get('button').contains('Try it out').click();
		cy.url().should('include', '/demo');

		cy.get('[data-cy="add-new-story-modal"]').click();

		cy.get('textarea').type('Hello').should('have.value', 'Hello');
	});
});
