import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const Authmiddleware = ({
  component: Component,
  layout: Layout,
  isAuthProtected,

  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        console.log({ prop: props });
        // if (isAuthProtected && !localStorage.getItem('userInfo')) {
        //   return (
        //     <Redirect
        //       to={{ pathname: '/login', state: { from: props.location } }}
        //     />
        //   );
        // }

        return (
          <Layout>
            <Component {...props} />
          </Layout>
        );
      }}
      exact
    />
  );
};

Authmiddleware.propTypes = {
  isAuthProtected: PropTypes.bool,
  component: PropTypes.any,
  location: PropTypes.object,
  layout: PropTypes.any,
};

export default Authmiddleware;
