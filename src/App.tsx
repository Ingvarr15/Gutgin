import React, {useState} from 'react';

import {useAppSelector} from './app/hooks';
import {Notify} from './renderer';

const App = () => {
  const [value, setValue] = useState('');
  const {theme} = useAppSelector(({main}) => ({
    theme: main.theme,
  }));

  const sendNotification = () => {
    Notify('Title', value);
  };

  return (
    <div>
      {theme}
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
      />
      <button onClick={sendNotification}>Send Notification</button>
    </div>
  );
};

export default App;
