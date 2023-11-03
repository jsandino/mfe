import { mount } from 'auth/AuthApp';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const onNavigation = () => {
  console.log('Child triggered navigation event!');
};

export default ({ onSignIn }) => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigation: ({ pathname: newPathname }) => {
        const { pathname } = history.location;
        if (pathname != newPathname) {
          console.log(
            `Container app: child changed location to ${newPathname}`
          );
          history.push(newPathname);
        }
      },
      onSignIn
    });

    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref} />;
};
