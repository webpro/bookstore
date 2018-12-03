import { Fragment } from 'react';
import Head from 'next/head';
import Header from '../components/Header/Header';
import Books from '../components/Books/Books';

export default () => {
  return (
    <Fragment>
      <Head>
        <title>Bookstore</title>
      </Head>
      <Header />
      <Books />
    </Fragment>
  );
};
