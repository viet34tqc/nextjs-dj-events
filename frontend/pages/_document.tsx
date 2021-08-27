// This is the root DOM structure of NextJS page
// It renders <html>, <body>, some basic <meta> tags in <head>
// It also renders NextJS scripts

// We will add a custom div before the close </body> tag to implement our own modal

import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx);

		return initialProps;
	}

	render() {
		return (
			<Html>
				<Head />
				<body>
					<Main />
					<NextScript />
                    <div id="modal-root"></div>
				</body>
			</Html>
		);
	}
}

export default MyDocument;
