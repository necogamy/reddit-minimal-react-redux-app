import React, { Fragment } from 'react';

import { Header } from '../components/header/Header';
import { Subreddits } from '../components/subreddits/Subreddits';

const App = () => {
  return (
    <Fragment>
      <Header />
      <Subreddits />
    </Fragment>
  );
}

export default App;
