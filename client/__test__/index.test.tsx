import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Home from '../pages/index';
import '@testing-library/jest-dom';

describe('Home', () => {
	it('renders a landing navbar', () => {
		render(<Home />);

		const heading = screen.getByRole('landing-navbar');
		const changeThemeButton = screen.getByRole('change-theme');

		expect(heading).toBeInTheDocument();
		expect(changeThemeButton).toBeInTheDocument();
	});
});
