import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Row, Col, Card, CardBody, CardTitle } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { Link } from 'react-router-dom';
import { PlusIcon } from '@heroicons/react/outline';
import NaijaStates from 'naija-state-local-government';
import { createEnrollee } from '../../actions/enrolleeActions';
import Modal from '../../components/Modal';

// console.log(NaijaStates);

const AddEnrollee = ({ history }) => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [trackingID, setTrackingID] = useState('');
  const [phone, setPhone] = useState('');
  const [associatedTrackingID, setAssociatedTrackingID] = useState('');
  const [bvn, setBvn] = useState('');
  const [typeOfTransaction, setTypeOfTransaction] = useState('Enrollment');
  const [modeOfTransaction, setModeOfTransaction] = useState('Cash');
  const [nin, setNin] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('Male');
  const [channel, setChannel] = useState('Socket');
  const [otherIdProvided, setOtherIdProvided] = useState([]);
  const [plasticIDCard, setPlasticIDCard] = useState(false);
  const [address, setAddress] = useState('');
  const [addressState, setAddressState] = useState('');
  const [addressCity, setAddressCity] = useState('');
  const [lga, setLga] = useState('');
  const [stateOfOrigin, setStateOfOrigin] = useState('');
  const [lgaOfOrigin, setlgaOfOrigin] = useState('');
  const [country, setCountry] = useState('Nigeria');

  const enrolleeDetails = {
    firstName,
    lastName,
    middleName,
    email,
    trackingID,
    phone,
    associatedTrackingID,
    bvn,
    typeOfTransaction,
    modeOfTransaction,
    gender,
    channel,
    plasticIDCard,
    address,
    addressState,
    addressCity,
    lga,
    stateOfOrigin,
    lgaOfOrigin,
    country,
  };

  const addEnrollee = useSelector((state) => state.addEnrollee);

  const { loading, success, error } = addEnrollee;

  useEffect(() => {
    if (success) {
      history.push('/enrollees');
    }
  }, [history, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(enrolleeDetails);

    dispatch(createEnrollee(enrolleeDetails));
  };

  console.log({ success, error });
  return (
    <>
      {error && <Modal type='error' title='Error' message={error} />}
      <div className='page-content'>
        <Breadcrumbs title='Enrollees' breadcrumbItem='Add Enrollee' />

        <Row>
          <Col className='col-12'>
            <Card>
              <CardBody>
                {/* <div className='flex justify-between items-center'> */}
                <CardTitle>Enrollee Form </CardTitle>
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
                          Enrollee Information
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
                              name='first-name'
                              id='first-name'
                              autoComplete='given-name'
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
                              value={addressState}
                              onChange={(e) => setAddressState(e.target.value)}
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
                              name='street-address'
                              id='street-address'
                              autoComplete='street-address'
                              value={addressCity}
                              onChange={(e) => setAddressCity(e.target.value)}
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
                              <option>Please select a state</option>
                              {!addressState
                                ? ''
                                : NaijaStates.lgas(addressState).lgas.map(
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
                            State of Origin
                          </label>
                          <div className='mt-1 sm:mt-0 sm:col-span-2'>
                            <select
                              id='origin'
                              name='origin'
                              autoComplete='origin'
                              value={stateOfOrigin}
                              onChange={(e) => setStateOfOrigin(e.target.value)}
                              className='max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md'
                            >
                              <option>Please select state of origin</option>
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
                            htmlFor='zip'
                            className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                          >
                            LGA of Origin
                          </label>
                          <div className='mt-1 sm:mt-0 sm:col-span-2'>
                            <select
                              id='lgaOrigin'
                              name='lgaOrigin'
                              autoComplete='lgaOrigin'
                              value={lgaOfOrigin}
                              onChange={(e) => setlgaOfOrigin(e.target.value)}
                              className='max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md'
                            >
                              <option>Please select LGA of origin </option>
                              {!stateOfOrigin
                                ? ''
                                : NaijaStates.lgas(stateOfOrigin).lgas.map(
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
                            Tracking ID
                          </label>
                          <div className='mt-1 sm:mt-0 sm:col-span-2'>
                            <input
                              type='text'
                              name='trackingId'
                              id='trackingId'
                              autoComplete='trackingId'
                              value={trackingID}
                              onChange={(e) => setTrackingID(e.target.value)}
                              className='max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md'
                            />
                          </div>
                        </div>

                        <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                          <label
                            htmlFor='zip'
                            className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                          >
                            Associated Tracking ID (if it exists)
                          </label>
                          <div className='mt-1 sm:mt-0 sm:col-span-2'>
                            <input
                              type='text'
                              name='associated-trackingId'
                              id='associated-trackingId'
                              autoComplete='associated-trackingId'
                              value={associatedTrackingID}
                              onChange={(e) =>
                                setAssociatedTrackingID(e.target.value)
                              }
                              className='max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md'
                            />
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
                            BVN
                          </label>
                          <div className='mt-1 sm:mt-0 sm:col-span-2'>
                            <input
                              type='text'
                              name='bvn'
                              id='bvn'
                              autoComplete='bvn'
                              value={bvn}
                              onChange={(e) => setBvn(e.target.value)}
                              className='max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md'
                            />
                          </div>
                        </div>

                        <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                          <label
                            htmlFor='zip'
                            className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                          >
                            Type of Transaction
                          </label>
                          <div className='mt-1 sm:mt-0 sm:col-span-2'>
                            <select
                              id='typeOfTransaction'
                              name='typeOfTransaction'
                              autoComplete='typeOfTransaction'
                              value={typeOfTransaction}
                              onChange={(e) =>
                                setTypeOfTransaction(e.target.value)
                              }
                              className='max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md'
                            >
                              <option value='Enrollment'>Enrollment</option>
                              <option value='Reprint'>Reprint</option>
                              <option value='Correction of data'>
                                Correction of data
                              </option>
                              <option value='Revalidation'>Revalidation</option>
                            </select>
                          </div>
                        </div>

                        <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                          <label
                            htmlFor='zip'
                            className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                          >
                            Mode of Transaction
                          </label>
                          <div className='mt-1 sm:mt-0 sm:col-span-2'>
                            <select
                              id='modeOfTransaction'
                              name='modeOfTransaction'
                              autoComplete='modeOfTransaction'
                              value={modeOfTransaction}
                              onChange={(e) =>
                                setModeOfTransaction(e.target.value)
                              }
                              className='max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md'
                            >
                              <option value='Cash'>Cash</option>
                              <option value='Transfer'>Transfer</option>
                              <option value='POS'>POS</option>
                            </select>
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

                        <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                          <label
                            htmlFor='zip'
                            className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                          >
                            Channel
                          </label>
                          <div className='mt-1 sm:mt-0 sm:col-span-2'>
                            <select
                              id='channel'
                              name='channel'
                              autoComplete='channel'
                              value={channel}
                              onChange={(e) => setChannel(e.target.value)}
                              className='max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md'
                            >
                              <option value='Socket'>Socket</option>
                              <option value='Joeson'>Joeson</option>
                            </select>
                          </div>
                        </div>

                        <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                          <label
                            htmlFor='zip'
                            className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                          >
                            Plastic ID Card
                          </label>
                          <div className='mt-1 sm:mt-0 sm:col-span-2'>
                            <select
                              id='idcard'
                              name='idcard'
                              autoComplete='idcard'
                              value={plasticIDCard}
                              onChange={(e) => setPlasticIDCard(e.target.value)}
                              className='max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md'
                            >
                              <option value='false'>No</option>
                              <option value='true'>Yes</option>
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
    </>
  );
};

export default AddEnrollee;
