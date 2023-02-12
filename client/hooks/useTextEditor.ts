import { DependencyList, useEffect, useState } from 'react';
import warning from 'warning';

// Text editor extensions
import { Content, Editor as TipTapEditor, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';

interface ITextEditor {
	value?: string | Node;
	defaultValue?: string | Node;
	characterLimit?: number;
	placeholder?: string;
	onChange?: (...args: any[]) => void;
	depList?: DependencyList;
}

interface ITextEditorExport {
	editor: TipTapEditor | null;
	editorState: string | Node | null;
	handleOnEditorChange: (...args: any[]) => void;
}

const useTextEditor = ({
	value: propsValue,
	placeholder,
	defaultValue = '',
	characterLimit: propsCharacterLimit = 1000,
	onChange,
	depList,
}: ITextEditor): ITextEditorExport => {
	const [characterLimit] = useState<number>(propsCharacterLimit);

	const [stateValue, setStateValue] = useState<string | Node>(
		defaultValue ?? ''
	);
	const isControlled = propsValue != null;
	const state = isControlled ? propsValue : stateValue;

	const hasOnChange = Boolean(onChange);

	const handleOnChange = (editorValue: any) => {
		if (!isControlled) {
			setStateValue(editorValue);
		}
		onChange?.(editorValue);
	};

	useEffect(() => {
		warning(
			!(!hasOnChange && isControlled),
			`\`Value\` props was provided to TextEditor component without an \`onChange\` handler.`
		);
	}, [hasOnChange, isControlled]);

	const editor = useEditor(
		{
			extensions: [
				StarterKit,
				Placeholder.configure({
					placeholder: placeholder,
				}),
				CharacterCount.configure({
					limit: characterLimit,
				}),
			],
			content: state as Content,
			onUpdate: ({ editor }) => {
				const html = editor.getHTML();
				handleOnChange(html);
			},
		},
		depList
	);

	return { editor, editorState: state, handleOnEditorChange: handleOnChange };
};

export default useTextEditor;
