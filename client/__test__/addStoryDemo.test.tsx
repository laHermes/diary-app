import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DemoStoryForm from '@features/Demo/components/StoryForm/DemoStoryForm';
import { Provider } from 'react-redux';
import store from '@store/store';

describe('Demo Add Story Form', () => {
	it('renders demo story form', () => {
		render(
			<Provider store={store()}>
				<DemoStoryForm />
			</Provider>
		);

		const textbox = screen.getByRole('textbox', { name: /short summary/i });
		const emotionsSelect = screen.getByRole('combobox', { name: /emotion/i });
		const reasonsSelect = screen.getByRole('combobox', { name: /reason/i });

		expect(textbox).toBeInTheDocument();
		expect(emotionsSelect).toBeInTheDocument();
		expect(reasonsSelect).toBeInTheDocument();
	});
});
