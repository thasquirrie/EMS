import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Row, Col, Card, CardBody, CardTitle } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
// import { Link } from 'react-router-dom';
// import { PlusIcon } from '@heroicons/react/outline';
import NaijaStates from 'naija-state-local-government';
import { editUser, getUser } from '../../actions/userActions';
import { EDIT_USER_RESET } from '../../store/auth/login/actionTypes';
import Modal from '../../components/Modal';
// import { centersList } from '../../actions/centerActions';
// import Modal from '../../components/Modal';

// console.log(NaijaStates);

const UserDetails = ({ match, history }) => {
  const userId = match.params.id;
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [center, setCenter] = useState('');
  const [role, setRole] = useState('');
  const [phone, setPhone] = useState('');
  const [nin, setNin] = useState('');
  // const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [userState, setUserState] = useState('');
  const [city, setCity] = useState('');
  const [lga, setLga] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [country, setCountry] = useState('');
  const [approved, setApproved] = useState(false);

  const userDetail = {
    firstName,
    lastName,
    middleName,
    email,
    phone,
    gender,
    address,
    userState,
    city,
    lga,
    // password,
    // confirmPassword,
    country,
    nin,
    role,
    center,
  };

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);

  const { loading, success, error, user } = userDetails;

  const userEdit = useSelector((state) => state.userEdit);

  const { success: successEdit, error: errorEdit } = userEdit;

  // const addUser = useSelector((state) => state.);
  console.log({ loading, success, user });

  useEffect(() => {
    if (!user || user.id !== userId) {
      console.log('This user', { user });
      dispatch(getUser(userId));
    } else {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setMiddleName(user.middleName);
      setEmail(user.email);
      setPhone(user.phone);
      setGender(user.gender);
      setAddress(user.address);
      setUserState(user.userState);
      setCity(user.city);
      setLga(user.lga);
      // setPassword(user.password);
      // setConfirmPassword(user.confirmPassword);
      setCountry(user.country);
      setNin(user.nin);
      setRole(user.role);
      setApproved(user.approved);
      if (user.center) {
        setCenter(user.center);
      }
    }

    if (successEdit) {
      history.push('/users');
      dispatch({
        type: EDIT_USER_RESET,
      });
    }
  }, [dispatch, history, successEdit, userInfo, userId, user]);

  // console.log({ loading, error, centers });
  // console.log(user.address);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(userDetail);

    dispatch(editUser(userId, userDetail));
    dispatch({
      type: EDIT_USER_RESET,
    });
    console.log(user.id, { userId });
  };

  console.log({ successEdit, errorEdit });

  return (
    <>
      {errorEdit && <Modal type='error' title='Error' message={errorEdit} />}(
      <div className='page-content'>
        <Breadcrumbs title='Users' breadcrumbItem='Add User' />

        <Row>
          <Col className='col-12'>
            <Card>
              <CardBody>
                {/* <div className='flex justify-between items-center'> */}
                <CardTitle>Add User Form </CardTitle>
                {/* <Link
                 to={'/add-user'}
                 className='inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
               >
                 <PlusIcon className='-ml-1 mr-3 h-5 w-5' aria-hidden='true' />
                 Add User
               </Link>
             </div> */}
                <form
                  onSubmit={submitHandler}
                  className='space-y-8 divide-y divide-gray-200'
                >
                  <div className='space-y-8 divide-y divide-gray-200 sm:space-y-5'>
                    <div className='pt-8 space-y-6 sm:pt-10 sm:space-y-5'>
                      <div>
                        <h3 className='text-lg leading-6 font-medium text-gray-900'>
                          User Information
                        </h3>
                        {/* <p className='mt-1 max-w-2xl text-sm text-gray-500'>
                        Use a permanent address where you can receive mail.
                      </p> */}
                      </div>
                      <div className='space-y-6 sm:space-y-5'>
                        <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                          <label
                            htmlFor='first-name'
                            className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                          >
                            First name
                          </label>
                          <div className='mt-1 sm:mt-0 sm:col-span-2'>
                            <input
                              type='text'
                              name='first-name'
                              id='first-name'
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              autoComplete='given-name'
                              className='max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md'
                            />
                          </div>
                        </div>
                        <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                          <label
                            htmlFor='first-name'
                            className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                          >
                            Middle name
                          </label>
                          <div className='mt-1 sm:mt-0 sm:col-span-2'>
                            <input
                              type='text'
                              name='middle-name'
                              id='middle-name'
                              autoComplete='middle-name'
                              value={middleName}
                              onChange={(e) => setMiddleName(e.target.value)}
                              className='max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md'
                            />
                          </div>
                        </div>

                        <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                          <label
                            htmlFor='last-name'
                            className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                          >
                            Last name
                          </label>
                          <div className='mt-1 sm:mt-0 sm:col-span-2'>
                            <input
                              type='text'
                              name='last-name'
                              id='last-name'
                              autoComplete='family-name'
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              className='max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md'
                            />
                          </div>
                        </div>

                        <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                          <label
                            htmlFor='email'
                            className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                          >
                            Email address
                          </label>
                          <div className='mt-1 sm:mt-0 sm:col-span-2'>
                            <input
                              id='email'
                              name='email'
                              type='email'
                              autoComplete='email'
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className='block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md'
                            />
                          </div>
                        </div>

                        {userInfo.user.role === 'super-admin' && (
                          <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                            <label
                              htmlFor='country'
                              className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                            >
                              Approved
                            </label>
                            <div className='mt-1 sm:mt-0 sm:col-span-2'>
                              <select
                                id='center'
                                name='center'
                                autoComplete='center'
                                value={approved}
                                onChange={(e) => setApproved(e.target.value)}
                                className='max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md'
                              >
                                <option value='false'>No</option>
                                <option value='true'>Yes</option>
                              </select>
                            </div>
                          </div>
                        )}

                        {userInfo.user.id === userId && (
                          <>
                            <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                              <label
                                htmlFor='password'
                                className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                              >
                                Password
                              </label>
                              <div className='mt-1 sm:mt-0 sm:col-span-2'>
                                <input
                                  id='password'
                                  name='password'
                                  type='password'
                                  autoComplete='password'
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  className='block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md'
                                />
                              </div>
                            </div>
                            <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                              <label
                                htmlFor='confirmPassword'
                                className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                              >
                                Confirm Password
                              </label>
                              <div className='mt-1 sm:mt-0 sm:col-span-2'>
                                <input
                                  id='confirmPassword'
                                  name='confirmPassword'
                                  type='password'
                                  autoComplete='confirmPassword'
                                  value={confirmPassword}
                                  onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                  }
                                  className='block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md'
                                />
                              </div>
                            </div>{' '}
                          </>
                        )}

                        <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                          <label
                            htmlFor='nin'
                            className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                          >
                            NIN
                          </label>
                          <div className='mt-1 sm:mt-0 sm:col-span-2'>
                            <input
                              id='nin'
                              name='nin'
                              type='text'
                              autoComplete='nin'
                              value={nin}
                              onChange={(e) => setNin(e.target.value)}
                              className='block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md'
                            />
                          </div>
                        </div>

                        {/* {userInfo &&
                          (userInfo.user.role === 'super-admin' ||
                            userInfo.user.role === 'admin' ||
                            userInfo.user.role === 'center-manager') && (
                            <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                              <label
                                htmlFor='country'
                                className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                              >
                                Role
                              </label>
                              <div className='mt-1 sm:mt-0 sm:col-span-2'>
                                <select
                                  id='role'
                                  name='role'
                                  autoComplete='role'
                                  aria-readonly={true}
                                  value={role}
                                  onChange={(e) => setRole(e.target.value)}
                                  className='max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md'
                                >
                                  <option>Select role for user</option>
                                  <option value='user'>User</option>
                                  <option value='center-manager'>
                                    Center Manager
                                  </option> */}
                        {/* {centers
                                  ? centers.map((center) => (
                                      <option key={center.id} value={center.id}>
                                        {center.centerName}
                                      </option>
                                    ))
                                  : ''} */}
                        {/* </select>
                              </div>
                            </div>
                          )} */}

                        <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                          <label
                            htmlFor='email'
                            className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                          >
                            Role
                          </label>
                          <div className='mt-1 sm:mt-0 sm:col-span-2'>
                            <input
                              id='role'
                              name='role'
                              type='text'
                              autoComplete='role'
                              readOnly
                              value={role}
                              onChange={(e) => setRole(e.target.value)}
                              className='block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md'
                            />
                          </div>
                        </div>

                        {/* {userInfo &&
                          (userInfo.user.role === 'super-admin' ||
                            userInfo.user.role === 'admin') && (
                            <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                              <label
                                htmlFor='country'
                                className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                              >
                                Center
                              </label>
                              <div className='mt-1 sm:mt-0 sm:col-span-2'>
                                <select
                                  id='center'
                                  name='center'
                                  autoComplete='center'
                                  value={center}
                                  onChange={(e) => setCenter(e.target.value)}
                                  className='max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md'
                                >
                                  <option>Select center for user</option>
                                  {centers
                                    ? centers.map((center) => (
                                        <option
                                          key={center.id}
                                          value={center.id}
                                        >
                                          {center.centerName}
                                        </option>
                                      ))
                                    : ''}
                                </select>
                              </div>
                            </div>
                          )} */}

                        {user && user.center && (
                          <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                            <label
                              htmlFor='email'
                              className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                            >
                              Center
                            </label>
                            <div className='mt-1 sm:mt-0 sm:col-span-2'>
                              <input
                                id='center'
                                name='center'
                                type='text'
                                autoComplete='center'
                                readOnly
                                value={center.centerName}
                                onChange={(e) => setCenter(e.target.value)}
                                className='block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md'
                              />
                            </div>
                          </div>
                        )}

                        <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                          <label
                            htmlFor='country'
                            className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                          >
                            Country
                          </label>
                          <div className='mt-1 sm:mt-0 sm:col-span-2'>
                            <select
                              id='country'
                              name='country'
                              autoComplete='country'
                              value={country}
                              onChange={(e) => setCountry(e.target.value)}
                              className='max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md'
                            >
                              <option value='Nigeria'>Nigeria</option>
                              <option value='Ghana'>Ghana</option>
                              <option value='Togo'>Togo</option>
                            </select>
                          </div>
                        </div>

                        <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                          <label
                            htmlFor='street-address'
                            className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                          >
                            Street address
                          </label>
                          <div className='mt-1 sm:mt-0 sm:col-span-2'>
                            <input
                              type='text'
                              name='street-address'
                              id='street-address'
                              autoComplete='street-address'
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              className='block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md'
                            />
                          </div>
                        </div>

                        <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                          <label
                            htmlFor='state'
                            className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                          >
                            State
                          </label>
                          <div className='mt-1 sm:mt-0 sm:col-span-2'>
                            <select
                              id='state'
                              name='state'
                              autoComplete='state'
                              value={userState}
                              onChange={(e) => setUserState(e.target.value)}
                              className='max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md'
                            >
                              <option>Please select a state</option>
                              {NaijaStates.states().map((state) => (
                                <option key={state} value={state}>
                                  {state}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                          <label
                            htmlFor='city'
                            className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                          >
                            City
                          </label>
                          <div className='mt-1 sm:mt-0 sm:col-span-2'>
                            <input
                              type='text'
                              name='city'
                              id='city'
                              autoComplete='city'
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                              className='block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md'
                            />
                          </div>
                        </div>

                        <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                          <label
                            htmlFor='state'
                            className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                          >
                            LGA
                          </label>
                          <div className='mt-1 sm:mt-0 sm:col-span-2'>
                            <select
                              id='lga'
                              name='lga'
                              autoComplete='lga'
                              value={lga}
                              onChange={(e) => setLga(e.target.value)}
                              className='max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md'
                            >
                              <option>Please select a LGA</option>
                              {!userState
                                ? ''
                                : NaijaStates.lgas(userState).lgas.map(
                                    (lga) => (
                                      <option key={lga} value={lga}>
                                        {lga}
                                      </option>
                                    )
                                  )}
                            </select>
                          </div>
                        </div>

                        <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                          <label
                            htmlFor='zip'
                            className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                          >
                            Phone
                          </label>
                          <div className='mt-1 sm:mt-0 sm:col-span-2'>
                            <input
                              type='text'
                              name='phone'
                              id='phone'
                              autoComplete='phone'
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className='max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md'
                            />
                          </div>
                        </div>

                        <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                          <label
                            htmlFor='zip'
                            className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                          >
                            Gender
                          </label>
                          <div className='mt-1 sm:mt-0 sm:col-span-2'>
                            <select
                              id='gender'
                              name='gender'
                              autoComplete='gender'
                              value={gender}
                              onChange={(e) => setGender(e.target.value)}
                              className='max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md'
                            >
                              <option>Male</option>
                              <option>Female</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='pt-5'>
                    <div className='flex justify-end'>
                      {/* <button
                      type='button'
                      className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    >
                      Cancel
                    </button> */}
                      <button
                        type='submit'
                        className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </form>
                {/* ) } */}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
      )
    </>
  );
};

export default UserDetails;
