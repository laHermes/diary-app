/// <reference types="cypress" />

context('Landing Page', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000');
	});
});

it('should find the landing page', () => {
	cy.get('h1').contains('Track your mood');
});
