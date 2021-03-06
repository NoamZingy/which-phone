import React, { useCallback, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import IconTabs from './components/navbar';

function App() {
  const [message, setMessage] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const url = '/get-questions';

  const fetchData = useCallback(() => {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        setMessage(json.questions);
        setIsFetching(false);
      }).catch(e => {
        setMessage(`API call failed: ${e}`);
        setIsFetching(false);
      })
  }, [url]);

  useEffect(() => {
    setIsFetching(true);
    fetchData();
  }, [fetchData]);

  return (
    <div className="App">
      <IconTabs />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{'« '}<strong>
          {isFetching
            ? 'Fetching message from API'
            : message}
        </strong>{' »'}</p>
      </header>
    </div>
  );

}

export default App;


/* { process.env.NODE_ENV === 'production' ?
<p>
  This is a production build from create-react-app.
</p>
: <p>
  Edit <code>src/App.js</code> and save to reload.
</p>
} */

{/* <p><a
className="App-link"
href="https://github.com/mars/heroku-cra-node"
>
React + Node deployment on Heroku
</a></p>
<p><a
className="App-link"
href="https://reactjs.org"
target="_blank"
rel="noopener noreferrer"
>
Learn React
</a></p> */}