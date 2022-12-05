import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CharacterCount from '@tiptap/extension-character-count';

const limit = 280;

const ReadOnlyText = ({ content }: { content: string }) => {
	const editor = useEditor({
		editable: false,
		content: content,
		extensions: [
			StarterKit,
			CharacterCount.configure({
				limit,
			}),
		],
	});

	return <EditorContent editor={editor} />;
};

export default ReadOnlyText;
