import React, {
	createContext,
	DependencyList,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';
import warning from 'warning';

//Text editor extensions
import {
	Editor as TipTapEditor,
	EditorContent,
	useEditor,
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Button from '@components/Elements/Button/Button';
import CharacterCount from '@tiptap/extension-character-count';

// Icons
import BoldIcon from '@icons/BoldIcon';
import HeadingOneIcon from '@icons/HeadingOneIcon';
import HeadingTwoIcon from '@icons/HeadingTwoIcon';
import ItalicIcon from '@icons/ItalicIcon';
import ParagraphIcon from '@icons/ParagraphIcon';
import UndoIcon from '@icons/UndoIcon';
import RedoIcon from '@icons/RedoIcon';
import UnorderedList from '@icons/UnorderedList';
import OrderedList from '@icons/OrderedList';

const TextEditorContext = createContext<any>({});

function useTextEditorContext() {
	const context = useContext(TextEditorContext);
	if (!context) {
		throw new Error(
			`This TextEditor components cannot be rendered outside the TextEditor component`
		);
	}
	return context;
}

interface ITextEditor {
	children: ReactNode;
	value?: string | Node;
	editor?: TipTapEditor | null;
	defaultValue?: string | Node;
	placeholder?: string;
	onChange?: React.Dispatch<React.ChangeEventHandler<any>>;
	depList?: DependencyList;
}

const TextEditor = ({
	children,
	value: propsValue,
	editor: propsEditor,
	placeholder,
	onChange,
	depList,
}: ITextEditor) => {
	const characterLimit = 1000;
	const [stateValue, setStateValue] = useState(null);

	const isControlled = propsValue != null;
	const state = isControlled ? propsValue : stateValue;

	const hasOnChange = Boolean(onChange);

	const handleOnChange = (editorValue: any) => {
		if (!isControlled) {
			setStateValue(editorValue);
		}
		onChange && onChange(editorValue);
	};

	useEffect(() => {
		warning(
			!(!hasOnChange && isControlled),
			`\`Value\` props was provided to TextEditor component without an \`onChange\` handler.`
		);
	}, [hasOnChange, isControlled]);

	const internalEditor = useEditor(
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
			content: state,
			onUpdate: ({ editor }) => {
				const html = editor.getHTML();
				handleOnChange(html);
			},
		},
		depList
	);

	const editor = propsEditor ? propsEditor : internalEditor;

	const value = { editor, state, handleOnChange };

	return (
		<TextEditorContext.Provider value={value}>
			{children}
		</TextEditorContext.Provider>
	);
};

// Editor Component
const Editor = () => {
	const { editor } = useTextEditorContext();
	if (!editor) {
		return null;
	}
	return <EditorContent editor={editor} />;
};

// Menu Bar component
const MenuBar = ({ children }: { children?: ReactNode }) => {
	const { editor } = useTextEditorContext();

	if (!editor) {
		return null;
	}
	const activeButtonClass = 'bg-zinc-900/5 dark:bg-white/10';

	return (
		<div className='flex flex-wrap gap-3 mb-3'>
			<Button
				$alt
				role='text-editor-button-bold'
				onClick={() => editor.chain().focus().toggleBold().run()}
				disabled={!editor.can().chain().focus().toggleBold().run()}
				className={editor.isActive('bold') ? activeButtonClass : ''}>
				<BoldIcon className='dark:stroke-white' />
			</Button>
			<Button
				$alt
				role='text-editor-button-italic'
				onClick={() => editor.chain().focus().toggleItalic().run()}
				disabled={!editor.can().chain().focus().toggleItalic().run()}
				className={editor.isActive('italic') ? activeButtonClass : ''}>
				<ItalicIcon className='dark:stroke-white' />
			</Button>

			<Button
				$alt
				role='text-editor-button-paragraph'
				onClick={() => editor.chain().focus().setParagraph().run()}
				className={editor.isActive('paragraph') ? activeButtonClass : ''}>
				<ParagraphIcon className='dark:stroke-white' />
			</Button>
			<Button
				$alt
				role='text-editor-button-heading-one'
				onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
				className={
					editor.isActive('heading', { level: 1 }) ? activeButtonClass : ''
				}>
				<HeadingOneIcon className='dark:stroke-white' />
			</Button>
			<Button
				$alt
				role='text-editor-button-heading-two'
				onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
				className={
					editor.isActive('heading', { level: 2 }) ? activeButtonClass : ''
				}>
				<HeadingTwoIcon className='dark:stroke-white' />
			</Button>
			<Button
				$alt
				role='text-editor-button-bullet-list'
				onClick={() => editor.chain().focus().toggleBulletList().run()}
				className={editor.isActive('bulletList') ? activeButtonClass : ''}>
				<UnorderedList className='dark:stroke-white' />
			</Button>
			<Button
				$alt
				role='text-editor-button-ordered-list'
				onClick={() => editor.chain().focus().toggleOrderedList().run()}
				className={editor.isActive('orderedList') ? activeButtonClass : ''}>
				<OrderedList className='dark:stroke-white' />
			</Button>
			<Button
				$alt
				role='text-editor-button-undo'
				onClick={() => editor.chain().focus().undo().run()}
				disabled={!editor.can().chain().focus().undo().run()}>
				<UndoIcon className='dark:stroke-white' />
			</Button>

			<Button
				$alt
				role='text-editor-button-redo'
				onClick={() => editor.chain().focus().redo().run()}
				disabled={!editor.can().chain().focus().redo().run()}>
				<RedoIcon className='dark:stroke-white' />
			</Button>

			{children}
		</div>
	);
};

TextEditor.Editor = Editor;
TextEditor.MenuBar = MenuBar;

export default TextEditor;
