import React, { useEffect, useState } from 'react';

// availity-reactstrap-validation
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Link } from 'react-router-dom';

import { Container, Row, Col, CardBody, Card, Button } from 'reactstrap';

// import images
import logo from '../../assets/images/logo-sm-dark.png';
import avatar1 from '../../assets/images/users/default.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/userActions';

const LockScreen = ({ history }) => {
  const [password, setPassword] = useState('');
  const userLogin = useSelector((state) => state.userLogin);

  const dispatch = useDispatch();

  const { success, userInfo } = userLogin;
  console.log(userInfo);

  useEffect(() => {
    if (success) {
      history.push('/dashboard');
    }
  }, [history, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('We got this');
    console.log(userInfo.user.email, password);

    dispatch(login(userInfo.user.email, password));
  };

  return (
    <React.Fragment>
      <div className='home-btn d-none d-sm-block'>
        <Link to='/' className='text-dark'>
          <i className='fas fa-home h2' />
        </Link>
      </div>
      <div className='account-pages my-5 pt-sm-5'>
        <Container>
          <Row className='justify-content-center'>
            <Col md={8} lg={6} xl={5}>
              <Card className='overflow-hidden'>
                <div className='bg-login text-center'>
                  <div className='bg-login-overlay'></div>
                  <div className='position-relative'>
                    <h5 className='text-white font-size-20'>Lock screen</h5>
                    <p className='text-white-50 mb-0'>
                      Enter your password to unlock the screen!
                    </p>
                    <Link to='/' className='logo logo-admin mt-4'>
                      <img src={logo} alt='' height='30' />
                    </Link>
                  </div>
                </div>
                <CardBody className='pt-5'>
                  <div className='p-2'>
                    {/* <AvForm
                      onSubmit={submitHandler}
                      className='form-horizontal'
                    >
                      <div className='user-thumb text-center mb-4'>
                        <img
                          src={avatar1}
                          className='rounded-circle img-thumbnail avatar-md'
                          alt='thumbnail'
                        />
                        <h5 className='font-size-15 mt-3'>
                          {userInfo.user.firstName} {userInfo.user.lastName}
                        </h5>
                      </div>

                      <div className='mb-3'>
                        <AvField
                          name='password'
                          label='Password'
                          type='password'
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          placeholder='Enter Password'
                        />
                      </div>

                      <div className='row mb-0'>
                        <div className='col-12 text-end'>
                          <Button
                            color='primary'
                            className='w-md waves-effect waves-light'
                            type='submit'
                          >
                            Unlock
                          </Button>
                        </div>
                      </div>
                    </AvForm> */}
                    <form
                      className='space-y-6'
                      action='#'
                      method='POST'
                      onSubmit={submitHandler}
                    >
                      <div className='user-thumb text-center mb-4 mx-auto'>
                        <img
                          src={avatar1}
                          className='rounded-circle img-thumbnail avatar-md mx-auto'
                          alt='thumbnail'
                        />
                        <h5 className='font-size-15 mt-3'>
                          {userInfo.user.firstName} {userInfo.user.lastName}
                        </h5>
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
                            autoComplete='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                          />
                        </div>
                      </div>

                      <div>
                        <button
                          type='submit'
                          className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                        >
                          Unlock
                        </button>
                      </div>
                    </form>
                  </div>
                </CardBody>
              </Card>
              <div className='mt-5 text-center'>
                <p>
                  Not you ? return{' '}
                  <Link to='/login' className='fw-medium text-primary'>
                    {' '}
                    Sign In
                  </Link>{' '}
                </p>
                <p>
                  © {new Date().getFullYear()} EMS Crafted with{' '}
                  <i className='mdi mdi-heart text-danger' /> by SquirrieLabs
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};
export default LockScreen;
