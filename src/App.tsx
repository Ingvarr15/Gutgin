import React from 'react';

import {useAppDispatch, useAppSelector} from './app/hooks';
import {switchTheme} from './store/slices/main';

const App = () => {
  const dispatch = useAppDispatch();
  const {theme} = useAppSelector(({main}) => ({
    theme: main.theme,
  }));

  return (
    <div>
      {theme}
      <button onClick={() => dispatch(switchTheme())}>toggle</button>
    </div>
  );
};

export default App;
