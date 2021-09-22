import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { Row, Col, Alert, Container } from 'reactstrap';
import Modal from '../../components/Modal';

// Redux
import { useDispatch, useSelector, connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

// availity-reactstrap-validation
import { AvForm, AvField } from 'availity-reactstrap-validation';

// actions
// import { loginUser, socialLogin } from '../../store/actions';
import { login } from '../../store/actions';

// import images
import logo from '../../assets/images/logo-sm-dark.png';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { error, success, userInfo } = userLogin;

  // console.log(props);
  useEffect(() => {
    if (success) {
      if (!userInfo.user.approved) {
        props.history.push('/not-approved');
      } else if (userInfo.user.role === 'user') {
        props.history.push('/enrollees');
      } else {
        props.history.push('/dashboard');
      }
    }

    // document.body.className = 'authentication-bg';
    // // remove classname when component will unmount
    // return function cleanup() {
    //   document.body.className = '';
    // };
  }, [props, success, userInfo]);

  // handleValidSubmit
  // const handleValidSubmit = (event, values = { email, password }) => {
  //   console.log(props);
  //   // props.loginUser(values, props.history);
  //   console.log(values);
  //   dispatch(login(values));
  // };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('Yes we got it!');
    dispatch(login(email, password));
  };

  return (
    <React.Fragment>
      {error && (
        <Modal
          type='error'
          title={'Login error'}
          message={error}
          action={'Login again!'}
        />
      )}
      <div className='home-btn d-none d-sm-block'>
        <Link to='/' className='text-dark'>
          <i className='fas fa-home h2' />
        </Link>
      </div>
      <div className='account-pages my-5 pt-sm-5'>
        <Container>
          <Row className='justify-content-center'>
            <Col md={8} lg={6} xl={5}>
              <div className='card overflow-hidden'>
                <div className='bg-login text-center'>
                  <div className='bg-login-overlay'></div>
                  <div className='position-relative'>
                    <h5 className='text-white font-size-20'>Welcome Back !</h5>
                    <p className='text-white mb-0'>
                      Sign in to continue to EMS.
                    </p>
                    <Link to='/' className='logo logo-admin mt-4'>
                      {/* <img src={logo} alt="" height="30" /> */}
                      <h4 className='mt-4'>EMS</h4>
                    </Link>
                  </div>
                </div>
                <div className='card-body pt-5'>
                  <div className='p-2'>
                    {/* <AvForm
                      className='form-horizontal'
                      onValidSubmit={(e, v) => {
                        handleValidSubmit(e, v);
                      }}
                      // onSubmit={(e) => submitHandler}
                    >
                      {console.log(error)};
                      {error ? (
                        <Alert color='danger'>{props.error}</Alert>
                      ) : null}
                      <div className='mb-3'>
                        <AvField
                          name='email'
                          label='Email'
                          value={email}
                          className='form-control'
                          placeholder='Enter email'
                          type='email'
                          required
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className='mb-3'>
                        <AvField
                          name='password'
                          label='Password'
                          value={password}
                          type='password'
                          required
                          placeholder='Enter Password'
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div> */}
                    {/* <div className='form-check'>
                        <input
                          type='checkbox'
                          className='form-check-input'
                          id='customControlInline'
                        />
                        <label
                          className='form-check-label'
                          htmlFor='customControlInline'
                        >
                          Remember me
                        </label>
                      </div>
                      <div className='mt-3'>
                        <button
                          className='btn btn-primary w-100 waves-effect waves-light'
                          type='submit'
                        >
                          Log In
                        </button>
                      </div>
                      <div className='mt-4 text-center'>
                        <Link to='/forgot-password' className='text-muted'>
                          <i className='mdi mdi-lock me-1'></i> Forgot your
                          password?
                        </Link>
                      </div>
                    </AvForm> */}
                    <form
                      className='space-y-6'
                      action='#'
                      method='POST'
                      onSubmit={submitHandler}
                    >
                      <div>
                        <label
                          htmlFor='email'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Email address
                        </label>
                        <div className='mt-1'>
                          <input
                            id='email'
                            name='email'
                            type='email'
                            autoComplete='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor='password'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Password
                        </label>
                        <div className='mt-1'>
                          <input
                            id='password'
                            name='password'
                            type='password'
                            autoComplete='current-password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                          />
                        </div>
                      </div>

                      <div className='flex items-center justify-between'>
                        <div className='flex items-center'>
                          <input
                            id='remember-me'
                            name='remember-me'
                            type='checkbox'
                            className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                          />
                          <label
                            htmlFor='remember-me'
                            className='ml-2 block text-sm text-gray-900'
                          >
                            Remember me
                          </label>
                        </div>

                        <div className='text-sm'>
                          <a
                            href='#'
                            className='font-medium text-blue-700 hover:text-blue-500'
                          >
                            Forgot your password?
                          </a>
                        </div>
                      </div>

                      <div>
                        <button
                          type='submit'
                          className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                        >
                          Sign in
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className='mt-5 text-center'>
                <p>
                  Don't have an account ?{' '}
                  <Link to='/register' className='fw-medium text-primary'>
                    {' '}
                    Signup now{' '}
                  </Link>{' '}
                </p>
                <p>
                  © {new Date().getFullYear()} EMS. Crafted with{' '}
                  <i className='mdi mdi-heart text-danger'></i> by SquirrieLabs
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  const { error } = state.Login;
  return { error };
};

// export default withRouter(
//   connect(mapStateToProps, { loginUser, socialLogin })(Login)
// );

// export default withRouter(connect(mapStateToProps, { login })(Login));
// export default withRouter(Login);
export default Login;

Login.propTypes = {
  error: PropTypes.any,
  history: PropTypes.object,
  loginUser: PropTypes.func,
  socialLogin: PropTypes.func,
};
