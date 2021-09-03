import React, { Fragment } from 'react';

import { Header } from '../components/header/Header';
import { Articles } from '../components/articles/Articles';
import { Subreddits } from '../components/subreddits/Subreddits';

const App = () => {
  return (
    <Fragment>
      <Header />
      <section>
        <Articles />
        <Subreddits />
      </section>
    </Fragment>
  );
}

export default App;
