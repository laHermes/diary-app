interface IUserPayload {
	googleId: string;
	username: string;
	avatar: string;
}

interface IChildren {
	children: React.ReactNode;
}

interface IStory {
	id: string;
	description: string;
	emotion: string;
	reason: string;
	date: string | Date;
}

interface IEntry {
	id: string;
	content: string;
	date: string | Date;
	isBookmarked?: boolean;
	numberOfWords?: number;
	characters?: number;
	emotion?: string;
	tags?: string[];
}

// https://stackoverflow.com/questions/42233987/how-to-configure-custom-global-interfaces-d-ts-files-for-typescript
// If you want an interface/type that you can simply use without having to import it in the consuming
// module said interface must reside in a .ts or ideally a .d.ts file without any imports or exports
// being present in the same file. This is of utmost importance because as soon as you are exporting
// at least one thing from the same file it becomes a module and everything that is in that module
// must be subsequently imported by consumers.
