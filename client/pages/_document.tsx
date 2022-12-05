import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	TITLE = 'diaryapp';
	bodyClassName =
		'bg-backgroundLight dark:bg-black dark:text-white transition-all';

	render() {
		return (
			<Html>
				<Head />
				<title>{this.TITLE}</title>
				<body className={this.bodyClassName}>
					<Main />
					<div id='root'>
						<NextScript />
					</div>
				</body>
			</Html>
		);
	}
}

export default MyDocument;
