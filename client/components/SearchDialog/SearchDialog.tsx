import { Fragment } from 'react';
import EntryCard from '@components/EntryCard/EntryCard';
import { SearchIcon } from '@heroicons/react/outline';
import { Combobox, Dialog, Transition } from '@headlessui/react';
import useFilter, { FILTER } from '@hooks/useFilter';
import { debounce } from 'lodash';

interface ISearchDialog {
	values: any[];
	isOpen: boolean;
	setIsOpen: Function;
}

export const SearchDialog = ({
	values: propsValue,
	isOpen,
	setIsOpen,
}: ISearchDialog) => {
	const { filteredData, filters, addFilter } = useFilter({ data: propsValue });

	// if no filters are applied return propValues
	const data = filters && filters.length > 0 ? filteredData : propsValue;

	const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
		const query = event.target.value;

		addFilter({
			value: FILTER.SEARCH,
			filterType: FILTER.SEARCH,
			action: (instance: any) => {
				return instance.content.toLowerCase().includes(query.toLowerCase());
			},
		});
	};

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog
				open={isOpen}
				onClose={() => setIsOpen(false)}
				className='fixed inset-0 p-4 overflow-y-auto'>
				<Transition.Child
					as={Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-300'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'>
					<Dialog.Overlay className='fixed inset-0 bg-zinc-500/10 pt-[10vh] backdrop-blur-sm'>
						<Combobox
							as='div'
							className='relative mx-auto max-w-xl divide-y divide-zinc-100 rounded-xl bg-white shadow-2xl ring-1 ring-black/5'>
							<div className='flex items-center px-4'>
								<SearchIcon className='w-6 h-6 text-zinc-500' />
								<Combobox.Input
									onChange={debounce(handleFilter, 400)}
									className='w-full h-12 text-sm bg-transparent border-0 text-zinc-800 placeholder-zinc-400 focus:ring-0'
									placeholder='Search...'
								/>
							</div>
							<div className='py-4 overflow-y-auto max-h-[35rem]'>
								{filters &&
									!!data?.length &&
									data.map((value) => (
										<div key={value.date} className='p-4'>
											<EntryCard path='/app/entry' {...value} />
										</div>
									))}

								{!data?.length && (
									<p className='text-center'>No entries found</p>
								)}
							</div>
						</Combobox>
					</Dialog.Overlay>
				</Transition.Child>
			</Dialog>
		</Transition>
	);
};

export default SearchDialog;
