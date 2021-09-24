import PropTypes from 'prop-types';
import React from 'react';

import { Switch, BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Import Routes all
import { userRoutes, authRoutes } from './routes/allRoutes';
import Home from './pages/Home/index';
import NotApprovedPage from './pages/NotApprovedPage';
import NotFoundPage from './pages/NotFoundPage';

// Import all middleware
import Authmiddleware from './routes/middleware/Authmiddleware';

// layouts Format
import VerticalLayout from './components/VerticalLayout/';
// import HorizontalLayout from './components/HorizontalLayout/';
import NonAuthLayout from './components/NonAuthLayout';

// Import scss
import './assets/scss/theme.scss';

// import fakeBackend from './helpers/AuthType/fakeBackend';

// console.log(fakeBackend);

// Activating fake backend
// fakeBackend();

const App = (props) => {
  // function getLayout() {
  //   let layoutCls = VerticalLayout;

  //   switch (props.layout.layoutType) {
  //     case 'horizontal':
  //       layoutCls = HorizontalLayout;
  //       break;
  //     default:
  //       layoutCls = VerticalLayout;
  //       break;
  //   }
  //   return layoutCls;
  // }

  // const Layout = getLayout();
  return (
    <React.Fragment>
      <Router>
        <Switch>
          {authRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={NonAuthLayout}
              component={route.component}
              key={idx}
              isAuthProtected={false}
            />
          ))}

          {userRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={VerticalLayout}
              component={route.component}
              key={idx}
              isAuthProtected={true}
              exact
            />
          ))}
          {/* <Route path='/' component={Home} exact /> */}
          <Authmiddleware
            path='/not-approved'
            layout={NonAuthLayout}
            component={NotApprovedPage}
            isAuthProtected={true}
            exact
          />
          <Authmiddleware
            path='/'
            layout={NonAuthLayout}
            component={Home}
            isAuthProtected={true}
            exact
          />
          <Authmiddleware
            path='*'
            layout={NonAuthLayout}
            component={NotFoundPage}
            isAuthProtected={true}
            exact
          />
          {/* <Authmiddleware
            paht
          /> */}

          {/* {authRoutes.map((route, idx) => (
            <Route
              render={() => {
                console.log(route.component);
                return <NonAuthLayout>{route.component}</NonAuthLayout>;
              }}
              path={route.path}
              key={idx}
              exact
            />
            // <Route exact render  />
          ))}
          {userRoutes.map((route, idx) => (
            <Route
              path={route.path}
              render={() => {
                console.log(route.component);
                return <VerticalLayout>{route.component}</VerticalLayout>;
              }}
              component={route.component}
              key={idx}
              exact
            />
          ))}
          <Route path='/' component={Home} exact /> */}
        </Switch>
      </Router>
    </React.Fragment>
    // <Router>
    //  <div className='bg-white'>
    //   {/* <div className='relative overflow-hidden'> */}
    //   {/* <Header /> */}
    //   <main>
    //    <Switch>
    //     {/* <Route path='/login' component={} exact />
    //     <Route path='/' component={} exact />
    //     <Route path='/alt-dashboard' component={} exact /> */}
    //     {authRoutes.map((route, idx) => (
    //      <Route
    //       path={route.path}
    //       layout={Layout}
    //       render={() => <Layout>{route.component}</Layout>}
    //       key={idx}
    //       exact
    //      />
    //     ))}

    //     {userRoutes.map((route, idx) => (
    //      <Route
    //       path={route.path}
    //       layout={Layout}
    //       render={() => <Layout>{route.component}</Layout>}
    //       key={idx}
    //       exact
    //      />
    //     ))}
    //     <Layout exact />
    //    </Switch>
    //   </main>
    //  </div>
    //  {/* </div> */}
    // </Router>
  );
};

App.propTypes = {
  layout: PropTypes.any,
};

const mapStateToProps = (state) => {
  return {
    layout: state.Layout,
  };
};

export default connect(mapStateToProps, null)(App);
