// import { Menu, Transition } from '@headlessui/react';
// import { Fragment, forwardRef, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { PencilIcon, TrashIcon } from '@heroicons/react/outline';
// import DotsVertical from '@icons/DotsVertical';
// import { removeDemoStory } from '@store/demoStorySlice';
// import { MenuButton } from './Styles';
// import Button from '@components/Elements/Button/Button';
// import DemoUpdateStoryForm from '@features/Demo/components/StoryForm/DemoUpdateStoryForm';

// // DROPDOWN
// // Select to either delete or edit story
// // clicking on edit -> edit modal opens
// // clicking on delete -> delete modal opens

// const StoryDropdown = forwardRef(
// 	(
// 		{ storyId, description, emotion, reason }: any,
// 		ref?: React.Ref<HTMLDivElement>
// 	) => {
// 		// state for edit and delete modal
// 		const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
// 		const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

// 		// redux dispatch
// 		const dispatch = useDispatch();

// 		// delete handler
// 		const handleOnDelete = () => {
// 			dispatch(removeDemoStory({ id: storyId }));
// 		};

// 		// items rendered in dropdown
// 		const menuItems = [
// 			{
// 				title: 'Edit',
// 				icon: PencilIcon,
// 				handler: () => setIsEditModalOpen(true),
// 			},
// 			{
// 				title: 'Delete',
// 				icon: TrashIcon,
// 				handler: () => setIsDeleteModalOpen(true),
// 			},
// 		];

// 		// edit modal
// 		const EditModal = () => (
// 			<Modal
// 				title='Update your story'
// 				isOpen={isEditModalOpen}
// 				onClose={() => setIsEditModalOpen(false)}
// 				renderContent={(modal: any) => (
// 					<div className='mt-2'>
// 						<DemoUpdateStoryForm
// 							storyId={storyId}
// 							description={description}
// 							emotion={emotion}
// 							reason={reason}
// 							modalClose={modal.close}
// 						/>
// 					</div>
// 				)}
// 			/>
// 		);

// 		// delete modal
// 		const DeleteModal = () => (
// 			<Modal
// 				title='Delete'
// 				isOpen={isDeleteModalOpen}
// 				onClose={() => setIsDeleteModalOpen(false)}
// 				renderContent={(modal: any) => (
// 					<div className='mt-2'>
// 						<p className='text-sm text-zinc-500'>
// 							Are sure you want to delete this story?
// 						</p>
// 						<div className='inline-flex gap-3'>
// 							<Button $negative onClick={handleOnDelete}>
// 								Delete
// 							</Button>
// 							<Button $positive onClick={modal.close}>
// 								Cancel
// 							</Button>
// 						</div>
// 					</div>
// 				)}
// 			/>
// 		);

// 		return (
// 			<div className='absolute right-2 bottom-3 text-right '>
// 				<Menu as='div' className='relative inline-block text-left' ref={ref}>
// 					{({ open }) => (
// 						<>
// 							{/* EXPOSED MODAL BUTTON */}
// 							<MenuButton>
// 								<DotsVertical className='fill-zinc-500 stroke-zinc-500' />
// 							</MenuButton>
// 							{/* DROPDOWN */}
// 							<Transition
// 								as={Fragment}
// 								show={open}
// 								enter='transition ease-out duration-100'
// 								enterFrom='transform opacity-0 scale-95'
// 								enterTo='transform opacity-100 scale-100'
// 								leave='transition ease-in duration-75'
// 								leaveFrom='transform opacity-100 scale-100'
// 								leaveTo='transform opacity-0 scale-95'>
// 								<Menu.Items
// 									className={`absolute right-0 mt-2 w-56 z-50 origin-top-right divide-y divide-zinc-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}>
// 									<div className='px-1 py-1 '>
// 										{menuItems.map((item) => {
// 											const Icon = item.icon;
// 											return (
// 												<Menu.Item key={item.title}>
// 													{({ active }) => (
// 														<button
// 															onClick={item.handler}
// 															className={`${
// 																active
// 																	? 'bg-zinc-100 text-zinc-900'
// 																	: 'text-zinc-900'
// 															} group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
// 															<Icon className='mr-2 h-5 w-5' />
// 															{item.title}
// 														</button>
// 													)}
// 												</Menu.Item>
// 											);
// 										})}
// 									</div>
// 								</Menu.Items>
// 							</Transition>
// 						</>
// 					)}
// 				</Menu>
// 				<EditModal />
// 				<DeleteModal />
// 			</div>
// 		);
// 	}
// );

// StoryDropdown.displayName = 'StoryDropdown';
// export default StoryDropdown;

import React from 'react';

const StoryDropdown = () => {
	return <div>StoryDropdown</div>;
};

export default StoryDropdown;
