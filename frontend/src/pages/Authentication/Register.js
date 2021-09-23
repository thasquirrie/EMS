import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import { Row, Col, Card, Alert, Container } from 'reactstrap';
import NaijaStates from 'naija-state-local-government';

import {
  Card,
  CardBody,
  Col,
  Form,
  Input,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from 'reactstrap';

import classnames from 'classnames';
import { Link } from 'react-router-dom';

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

// availity-reactstrap-validation
// import { AvForm, AvField } from 'availity-reactstrap-validation';

// action
// import { registerUser, registerUserFailed } from '../../store/actions';

// Redux
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';

// import images
// import logo from '../../assets/images/logo-sm-dark.png';
import { signup } from '../../actions/userActions';
import Modal from '../../components/Modal';

const Register = (props) => {
  const [activeTab, setactiveTab] = useState(1);
  const [userState, setUserState] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [nin, setNin] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [centerState, setCenterState] = useState('');
  const [centerName, setCenterName] = useState('');
  const [centerEmail, setCenterEmail] = useState('');
  const [centerAddress, setCenterAddress] = useState('');
  const [centerCity, setCenterCity] = useState('');
  const [centreLga, setCenterLga] = useState('');
  const [error, setError] = useState('');

  const registrationDetails = {
    firstName,
    middleName,
    lastName,
    nin,
    email,
    phone,
    address,
    city,
    password,
    confirmPassword,
    centerState,
    centerEmail,
    centerAddress,
    centerCity,
    centreLga,
    centerName,
  };

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { error: errorLogin } = userLogin;

  function toggleTab(tab) {
    if (activeTab !== tab) {
      if (tab >= 1 && tab <= 3) {
        setactiveTab(tab);
      }
    }
  }

  // handleValidSubmit
  // const handleValidSubmit = (event, values) => {
  //   props.registerUser(values);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    toggleTab(activeTab + 1);
    if (password !== confirmPassword) {
      setError('Passwords does not match');
    }

    console.log(registrationDetails);

    dispatch(signup(registrationDetails));
  };

  useEffect(() => {
    // props.apiError('');
    document.body.className = 'authentication-bg';
    // remove classname when component will unmount
    return function cleanup() {
      document.body.className = '';
    };
  });

  return (
    <React.Fragment>
      {errorLogin && (
        <Modal
          type='error'
          title='Signup Error'
          message={error}
          action='Sign up again'
        />
      )}
      <div className='home-btn d-none d-sm-block'>
        <Link to='/' className='text-dark'>
          <i className='fas fa-home h2'></i>
        </Link>
      </div>
      <div className='page-content'>
        <Breadcrumbs title='Forms' breadcrumbItem='Register' />

        <Row>
          <Col lg='12'>
            <Card>
              <CardBody>
                <h1 className='card-title text-center mb-5 text-3xl'>
                  Registration Page
                </h1>
                {/* <p className='card-title-desc'>
                  A powerful jQuery wizard plugin that supports accessibility
                  and HTML5
                </p> */}
                <div className='form-wizard-wrapper wizard clearfix'>
                  <div className='steps clearfix mb-3'>
                    <ul>
                      <NavItem
                        className={classnames({ current: activeTab === 1 })}
                      >
                        <NavLink
                          className={classnames({ current: activeTab === 1 })}
                          onClick={() => {
                            setactiveTab(1);
                          }}
                        >
                          <span className='number'>1.</span> Center Details
                        </NavLink>
                      </NavItem>
                      <NavItem
                        className={classnames({ current: activeTab === 2 })}
                      >
                        <NavLink
                          className={classnames({ active: activeTab === 2 })}
                          onClick={() => {
                            setactiveTab(2);
                          }}
                        >
                          <span className='number'>2.</span> Personal Details
                        </NavLink>
                      </NavItem>
                      <NavItem
                        className={classnames({ current: activeTab === 3 })}
                      >
                        <NavLink
                          className={classnames({ active: activeTab === 3 })}
                          onClick={() => {
                            setactiveTab(3);
                          }}
                        >
                          <span className='number'>3.</span>
                          Success Screen
                        </NavLink>
                      </NavItem>
                    </ul>
                  </div>
                  <Form onSubmit={handleSubmit}>
                    <div className='content clearfix'>
                      <TabContent activeTab={activeTab} className='body'>
                        <TabPane tabId={2}>
                          <div>
                            <Row>
                              <Col md={6}>
                                <Row className='mb-3'>
                                  <label
                                    htmlFor='firstName'
                                    className='col-lg-3 col-form-label'
                                  >
                                    First Name
                                  </label>
                                  <div className='col-lg-9'>
                                    <Input
                                      id='firstName'
                                      name='firstName'
                                      type='text'
                                      value={firstName}
                                      onChange={(e) =>
                                        setFirstName(e.target.value)
                                      }
                                      className='form-control rounded-sm'
                                      required
                                    />
                                  </div>
                                </Row>
                              </Col>
                              <Col md={6}>
                                <Row className='mb-3'>
                                  <label
                                    htmlFor='middleName'
                                    className='col-lg-3 col-form-label'
                                  >
                                    Middle Name
                                  </label>
                                  <div className='col-lg-9'>
                                    <Input
                                      id='middleName'
                                      name='middleName'
                                      type='text'
                                      value={middleName}
                                      onChange={(e) =>
                                        setMiddleName(e.target.value)
                                      }
                                      className='form-control'
                                      required
                                    />
                                  </div>
                                </Row>
                              </Col>
                            </Row>
                            <Row>
                              <Col md={6}>
                                <Row className='mb-3'>
                                  <label
                                    htmlFor='lastName'
                                    className='col-lg-3 col-form-label'
                                  >
                                    Last Name
                                  </label>
                                  <div className='col-lg-9'>
                                    <Input
                                      id='lastName'
                                      name='lastName'
                                      type='text'
                                      value={lastName}
                                      onChange={(e) =>
                                        setLastName(e.target.value)
                                      }
                                      className='form-control'
                                      required
                                    />
                                  </div>
                                </Row>
                              </Col>
                              <Col md={6}>
                                <Row className='mb-3'>
                                  <label
                                    htmlFor='phone'
                                    className='col-lg-3 col-form-label'
                                  >
                                    Phone
                                  </label>
                                  <div className='col-lg-9'>
                                    <Input
                                      id='phone'
                                      name='phone'
                                      type='text'
                                      value={phone}
                                      onChange={(e) => setPhone(e.target.value)}
                                      className='form-control'
                                      required
                                    />
                                  </div>
                                </Row>
                              </Col>
                            </Row>
                            <Row>
                              <Col md={6}>
                                <Row className='mb-3'>
                                  <label
                                    htmlFor='NIN'
                                    className='col-lg-3 col-form-label'
                                  >
                                    NIN
                                  </label>
                                  <div className='col-lg-9'>
                                    <Input
                                      id='nin'
                                      name='NIN'
                                      type='text'
                                      value={nin}
                                      onChange={(e) => setNin(e.target.value)}
                                      className='form-control'
                                      required
                                    />
                                  </div>
                                </Row>
                              </Col>
                              <Col md={6}>
                                <Row className='mb-3'>
                                  <label
                                    htmlFor='email'
                                    className='col-lg-3 col-form-label'
                                  >
                                    Email Address
                                  </label>
                                  <div className='col-lg-9'>
                                    <Input
                                      id='email'
                                      name='email'
                                      type='email'
                                      value={email}
                                      onChange={(e) => setEmail(e.target.value)}
                                      className='form-control'
                                      required
                                    />
                                  </div>
                                </Row>
                              </Col>
                            </Row>
                            <Row>
                              <Col md={6}>
                                <Row className='mb-3'>
                                  <label
                                    htmlFor='address'
                                    className='col-lg-3 col-form-label'
                                  >
                                    Address
                                  </label>
                                  <div className='col-lg-9'>
                                    <Input
                                      id='address'
                                      name='address'
                                      value={address}
                                      onChange={(e) =>
                                        setAddress(e.target.value)
                                      }
                                      className='form-control'
                                      required
                                    />
                                  </div>
                                </Row>
                              </Col>
                              <Col md={6}>
                                <Row className='mb-3'>
                                  <label
                                    htmlFor='state'
                                    className='col-lg-3 col-form-label'
                                  >
                                    State
                                  </label>
                                  <div className='col-lg-9'>
                                    <Input
                                      type='select'
                                      id='state'
                                      name='state'
                                      value={userState}
                                      onChange={(e) =>
                                        setUserState(e.target.value)
                                      }
                                      className='form-select'
                                      required
                                    >
                                      <option value=''>
                                        --Please Select Your State--
                                      </option>
                                      {NaijaStates.states().map((state) => (
                                        <option key={state} value={state}>
                                          {state}
                                        </option>
                                      ))}
                                    </Input>
                                  </div>
                                </Row>
                              </Col>
                            </Row>
                            <Row>
                              <Col md={6}>
                                <Row className='mb-3'>
                                  <label
                                    htmlFor='city'
                                    className='col-lg-3 col-form-label'
                                  >
                                    City
                                  </label>
                                  <div className='col-lg-9'>
                                    <Input
                                      id='city'
                                      name='city'
                                      type='text'
                                      value={city}
                                      onChange={(e) => setCity(e.target.value)}
                                      className='form-control'
                                      required
                                    />
                                  </div>
                                </Row>
                              </Col>
                              <Col md={6}>
                                <Row className='mb-3'>
                                  <label
                                    htmlFor='lga'
                                    className='col-lg-3 col-form-label'
                                  >
                                    LGA
                                  </label>
                                  <div className='col-lg-9'>
                                    <Input
                                      type='select'
                                      id='lga'
                                      name='lga'
                                      className='form-select'
                                      required
                                    >
                                      <option value=''>
                                        --Please Select Your LGA--
                                      </option>
                                      {!userState
                                        ? ''
                                        : NaijaStates.lgas(userState).lgas.map(
                                            (lga) => (
                                              <option key={lga} value={lga}>
                                                {lga}
                                              </option>
                                            )
                                          )}
                                    </Input>
                                  </div>
                                </Row>
                              </Col>
                            </Row>

                            <Row>
                              <Col md={6}>
                                <Row className='mb-3'>
                                  <label
                                    htmlFor='password'
                                    className='col-lg-3 col-form-label'
                                  >
                                    Password
                                  </label>
                                  <div className='col-lg-9'>
                                    <Input
                                      id='txtTelephoneBilling'
                                      name='password'
                                      type='password'
                                      value={password}
                                      onChange={(e) =>
                                        setPassword(e.target.value)
                                      }
                                      className='form-control'
                                      required
                                    />
                                  </div>
                                </Row>
                              </Col>
                              <Col md={6}>
                                <Row className='mb-3'>
                                  <label
                                    htmlFor='confirmPassword'
                                    className='col-lg-3 col-form-label'
                                  >
                                    Confirm Password
                                  </label>
                                  <div className='col-lg-9'>
                                    <Input
                                      id='confirmPassword'
                                      name='confirmPassword'
                                      type='password'
                                      value={confirmPassword}
                                      onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                      }
                                      className='form-control'
                                      required
                                    />
                                  </div>
                                </Row>
                              </Col>
                            </Row>
                          </div>
                        </TabPane>
                        <TabPane tabId={1}>
                          <div>
                            <Row>
                              <Col md={6}>
                                <Row className='mb-3'>
                                  <label
                                    htmlFor='centerName'
                                    className='col-lg-3 col-form-label'
                                  >
                                    Centre Name
                                  </label>
                                  <div className='col-lg-9'>
                                    <Input
                                      id='centerName'
                                      name='centerName'
                                      type='text'
                                      className='form-control'
                                      value={centerName}
                                      onChange={(e) =>
                                        setCenterName(e.target.value)
                                      }
                                      required
                                    />
                                  </div>
                                </Row>
                              </Col>
                              <Col md={6}>
                                <Row className='mb-3'>
                                  <label
                                    htmlFor='centerEmail'
                                    className='col-lg-3 col-form-label'
                                  >
                                    Email Address
                                  </label>
                                  <div className='col-lg-9'>
                                    <Input
                                      id='centerEmail'
                                      name='centerEmail'
                                      type='email'
                                      value={centerEmail}
                                      onChange={(e) =>
                                        setCenterEmail(e.target.value)
                                      }
                                      className='form-control'
                                      required
                                    />
                                  </div>
                                </Row>
                              </Col>
                            </Row>
                            <Row>
                              <Col md={6}>
                                <Row className='mb-3'>
                                  <label
                                    htmlFor='centerAddress'
                                    className='col-lg-3 col-form-label'
                                  >
                                    Address
                                  </label>
                                  <div className='col-lg-9'>
                                    <Input
                                      id='centerAddress'
                                      name='centerAddress'
                                      type='text'
                                      value={centerAddress}
                                      onChange={(e) =>
                                        setCenterAddress(e.target.value)
                                      }
                                      className='form-control'
                                      required
                                    />
                                  </div>
                                </Row>
                              </Col>
                              <Col md={6}>
                                <Row className='mb-3'>
                                  <label
                                    htmlFor='centerState'
                                    className='col-lg-3 col-form-label'
                                  >
                                    State
                                  </label>
                                  {/* <div className='col-lg-9'>
                                  <Input
                                    id='txtEmailAddressShipping'
                                    name='txtEmailAddressShipping'
                                    type='text'
                                    className='form-control'
                                    required
                                  />
                                </div> */}
                                  <div className='col-lg-9'>
                                    <Input
                                      type='select'
                                      id='state'
                                      name='state'
                                      value={centerState}
                                      onChange={(e) =>
                                        setCenterState(e.target.value)
                                      }
                                      className='form-select'
                                      required
                                    >
                                      <option value=''>
                                        --Please Select State--
                                      </option>
                                      {NaijaStates.states().map((state) => (
                                        <option key={state} value={state}>
                                          {state}
                                        </option>
                                      ))}
                                    </Input>
                                  </div>
                                </Row>
                              </Col>
                            </Row>

                            <Row>
                              <Col md={6}>
                                <Row className='mb-3'>
                                  <label
                                    htmlFor='centerCity'
                                    className='col-lg-3 col-form-label'
                                  >
                                    City
                                  </label>
                                  <div className='col-lg-9'>
                                    <Input
                                      id='centerCity'
                                      name='centerCity'
                                      type='text'
                                      value={centerCity}
                                      onChange={(e) =>
                                        setCenterCity(e.target.value)
                                      }
                                      className='form-control'
                                      required
                                    />
                                  </div>
                                </Row>
                              </Col>
                              <Col md={6}>
                                <Row className='mb-3'>
                                  <label
                                    htmlFor='centerLGA'
                                    className='col-lg-3 col-form-label'
                                  >
                                    LGA
                                  </label>
                                  <div className='col-lg-9'>
                                    <Input
                                      type='select'
                                      id='state'
                                      name='state'
                                      value={centreLga}
                                      onChange={(e) =>
                                        setCenterLga(e.target.value)
                                      }
                                      className='form-select'
                                      required
                                    >
                                      <option value=''>
                                        --Please Select LGA--
                                      </option>
                                      {!centerState
                                        ? ''
                                        : NaijaStates.lgas(
                                            centerState
                                          ).lgas.map((lga) => (
                                            <option key={lga} value={lga}>
                                              {lga}
                                            </option>
                                          ))}
                                    </Input>
                                  </div>
                                </Row>
                              </Col>
                            </Row>
                          </div>
                        </TabPane>
                        <TabPane tabId={3}>
                          <div className='row justify-content-center'>
                            <Col lg='6'>
                              <div className='text-center'>
                                <div className='mb-4'>
                                  <i className='mdi mdi-check-circle-outline text-success display-4' />
                                </div>
                                <div>
                                  <h5>Registration Successful</h5>
                                  <p className='text-muted'>
                                    Kindly wait for your approval. You will be
                                    contacted shortly
                                  </p>
                                </div>
                              </div>
                            </Col>
                          </div>
                        </TabPane>
                      </TabContent>
                    </div>
                    <div className='actions clearfix'>
                      <ul className='flex justify-end'>
                        <li
                          className={
                            activeTab === 1 ? ' text-red-400' : 'previous'
                          }
                        >
                          {console.log({ activeTab })}
                          {/* {activeTab !== 1 && 'Yeah, we moving'} */}
                          <Link
                            to='#'
                            className='btn btn-primary mr-4'
                            onClick={
                              activeTab !== 1
                                ? () => {
                                    toggleTab(activeTab - 1);
                                  }
                                : undefined
                            }
                          >
                            Previous
                          </Link>
                        </li>
                        <li
                          className={
                            activeTab >= 2 ? 'next disabled hidden' : 'next'
                          }
                        >
                          <Link
                            to='#'
                            className='btn btn-primary'
                            onClick={() => {
                              toggleTab(activeTab + 1);
                            }}
                          >
                            Next
                          </Link>
                        </li>
                        <li
                          className={activeTab === 3 ? 'next disabled' : 'next'}
                        >
                          {console.log({ activeTab })}
                          <button
                            type='submit'
                            className='btn btn-primary ml-4'
                            // onClick={() => {
                            //   toggleTab(activeTab + 1);
                            // }}
                          >
                            Submit
                          </button>
                        </li>
                      </ul>
                    </div>
                  </Form>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
      {/* <div className='account-pages my-5 pt-sm-5'>
        <Container>
          <Row className='justify-content-center'>
            <Col md={8} lg={6} xl={5}>
              <Card className='overflow-hidden'>
                <div className='bg-login text-center'>
                  <div className='bg-login-overlay'></div>
                  <div className='position-relative'>
                    <h5 className='text-white font-size-20'>Free Register</h5>
                    <p className='text-white-50 mb-0'>
                      Get your free Qovex account now
                    </p>
                    <Link to='/' className='logo logo-admin mt-4'>
                      <img src={logo} alt='' height='30' />
                    </Link>
                  </div>
                </div>
                <div className='card-body pt-5'>
                  <div className='p-2'>
                    <AvForm
                      className='form-horizontal'
                      onValidSubmit={(e, v) => {
                        handleValidSubmit(e, v);
                      }}
                    >
                      {props.user && props.user ? (
                        <Alert color='success'>
                          Register User Successfully
                        </Alert>
                      ) : null}

                      {props.registrationError && props.registrationError ? (
                        <Alert color='danger'>{props.registrationError}</Alert>
                      ) : null}

                      <div className='mb-3'>
                        <AvField
                          id='email'
                          name='email'
                          label='Email'
                          className='form-control'
                          required
                          placeholder='Enter email'
                          type='email'
                          required
                        />
                      </div>

                      <div className='mb-3'>
                        <AvField
                          name='username'
                          label='Username'
                          type='text'
                          required
                          placeholder='Enter username'
                        />
                      </div>
                      <div className='mb-3'>
                        <AvField
                          name='password'
                          label='Password'
                          type='password'
                          required
                          placeholder='Enter Password'
                        />
                      </div>

                      <div className='mt-4'>
                        <button
                          className='btn btn-primary w-100 waves-effect waves-light'
                          type='submit'
                        >
                          Register
                        </button>
                      </div>

                      <div className='mt-4 text-center'>
                        <p className='mb-0'>
                          By registering you agree to the Qovex{' '}
                          <Link to='#' className='text-primary'>
                            Terms of Use
                          </Link>
                        </p>
                      </div>
                    </AvForm>
                  </div>
                </div>
              </Card>
              <div className='mt-5 text-center'>
                <p>
                  Already have an account ?{' '}
                  <a href='/login' className='fw-medium text-primary'>
                    Login
                  </a>{' '}
                </p>
                <p>
                  © {new Date().getFullYear()} Qovex. Crafted with{' '}
                  <i className='mdi mdi-heart text-danger'></i> by Themesbrand
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div> */}
    </React.Fragment>
  );
};

Register.propTypes = {
  registerUser: PropTypes.func,
  registerUserFailed: PropTypes.func,
  registrationError: PropTypes.any,
  user: PropTypes.any,
};

export default Register;

// const mapStatetoProps = (state) => {
//   const { user, registrationError, loading } = state.Account;
//   return { user, registrationError, loading };
// };

// export default connect(mapStatetoProps, {
//   registerUser,
//   // apiError,
//   registerUserFailed,
// })(Register);

// import React, { useState } from 'react';

// const FormWizard = () => {

//   return (
//     <React.Fragment>

//     </React.Fragment>
//   );
// };

// export default FormWizard;
