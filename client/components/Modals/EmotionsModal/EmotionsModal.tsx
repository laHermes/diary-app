import React from 'react';
import {
	ModalFooter,
	ModalFooterButton,
	ModalSubtitle,
	ModalTitle,
} from '@components/Elements/Modal/Styles.';

import emotionContent from '@data/content.json';
import Modal from '@components/Elements/Modal/Modal';
import { EmotionButton } from './Styles';

//TODO: Refactor
// select emotions for the entry
export const EmotionsModal = ({
	state,
	setState,
	isOpen,
	onCloseModal,
}: any) => {
	const handleSetState = (emotion: string) => {
		setState((state: any) => (state !== emotion ? emotion : ''));
	};

	const EmotionButtons = () => {
		return (
			<>
				{emotionContent.emotions.map((emotion) => {
					const isSelected = emotion.text === (state.text || state);
					return (
						<EmotionButton
							key={emotion.value}
							onClick={() => handleSetState(emotion.text)}
							$selected={isSelected}>
							<span>{emotion.value}</span>
						</EmotionButton>
					);
				})}
			</>
		);
	};

	return (
		<Modal value={isOpen} onCloseModal={onCloseModal}>
			<Modal.Body>
				<div className='w-full bg-white divide-y rounded-xl dark:divide-zinc-800 dark:bg-zinc-900'>
					<div className='px-4 py-5'>
						<ModalTitle>Emotions</ModalTitle>
						<ModalSubtitle>How are you feeling?</ModalSubtitle>
					</div>

					{/* Button content */}
					<EmotionButtons />

					<ModalFooter>
						<ModalFooterButton onClick={onCloseModal}>Done</ModalFooterButton>
					</ModalFooter>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default EmotionsModal;
