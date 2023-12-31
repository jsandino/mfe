import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';

const mount = (el, { onNavigation, defaultHistory }) => {
  const history = defaultHistory || createMemoryHistory();
  if (onNavigation) {
    history.listen(onNavigation);
  }
  ReactDOM.render(<App history={history} />, el);

  return {
    onParentNavigate: ({ pathname: newPathname }) => {
      const { pathname } = history.location;
      if (pathname != newPathname) {
        console.log(`Child app: parent requested new path: ${newPathname}`);
        history.push(newPathname);
      }
    },
  };
};

if (process.env.NODE_ENV === 'development') {
  const el = document.querySelector('#_marketing-dev-root');
  if (el) {
    mount(el, { defaultHistory: createBrowserHistory() });
  }
}

export { mount };
