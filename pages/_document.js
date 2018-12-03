import Document, { Head, Main, NextScript } from 'next/document';
import React, { Fragment } from 'react';
import flush from 'styled-jsx/server';

class MyDocument extends Document {
  render() {
    return (
      <html lang="en" dir="ltr">
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

MyDocument.getInitialProps = context => {
  let pageContext;
  const page = context.renderPage(Component => {
    const WrappedComponent = props => {
      pageContext = props.pageContext;
      return <Component {...props} />;
    };
    return WrappedComponent;
  });

  return {
    ...page,
    pageContext,
    styles: (
      <Fragment>
        <style id="jss-server-side" dangerouslySetInnerHTML={{ __html: pageContext.sheetsRegistry.toString() }} />
        {flush() || null}
      </Fragment>
    )
  };
};

export default MyDocument;
