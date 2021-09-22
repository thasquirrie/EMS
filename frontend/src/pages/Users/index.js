import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Row, Col, Card, CardBody, CardTitle } from 'reactstrap';
// import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
// import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
// import { MDBBtn, MDBDataTable } from 'mdbreact';
//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { Link } from 'react-router-dom';
import './datatables.scss';
import { usersList } from '../../actions/userActions';
import Pagination from '../../components/Pagination';
import { PlusIcon } from '@heroicons/react/outline';
import { SearchIcon } from '@heroicons/react/solid';

let PageSize = 3;

const Users = ({ history }) => {
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);

  const { loading, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  useEffect(() => {
    // if (userInfo.user.role === 'user') {
    //   console.log(userInfo.user.role);
    // } else
    if (
      userInfo &&
      (userInfo.user.role === 'admin' || userInfo.user.role === 'super-admin')
    ) {
      dispatch(usersList());
    } else {
      history.push('/dashboard');
    }
  }, [dispatch, userInfo, history]);

  const search = useCallback(
    (rows) => {
      const columns = rows[0] && Object.keys(rows[0]);
      return rows.filter((row) => {
        // console.log(row.firstName.toLowerCase().indexOf(query) > -1);
        // console.log(query);
        // return (
        //   row.firstName.toLowerCase().indexOf(query.toString().toLowerCase()) >
        //     -1 ||
        //   row.lastName.toLowerCase().indexOf(query.toString().toLowerCase()) >
        //     -1 ||
        //   row.middleName.toLowerCase().indexOf(query.toString().toLowerCase()) >
        //     -1
        //   row.email.toLowerCase().indexOf(query.toString().toLowerCase()) >
        //     -1 ||
        //   row.status.toLowerCase().indexOf(query.toString().toLowerCase()) >
        //     -1 ||
        //   (row.nin &&
        //     row.nin
        //       .toString()
        //       .toLowerCase()
        //       .indexOf(query.toString().toLowerCase()) > -1) ||
        //   row.trackingID.toLowerCase().indexOf(query.toLowerCase()) > -1
        // );
        return columns.some((column) => {
          return (
            row[column] &&
            row[column].toString().toLowerCase().indexOf(query.toLowerCase()) >
              -1
          );
        });
      });
    },
    [query]
  );

  let countOnPage = [];

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    if (users) {
      countOnPage = search(users).slice(firstPageIndex, lastPageIndex);
      return search(users).slice(firstPageIndex, lastPageIndex);
    }
  }, [currentPage, users, search]);

  const deleteHandler = (id) => {
    console.log(id);
  };

  // console.log({ currentTableData });

  return (
    <React.Fragment>
      {loading ? (
        <p>Still loading</p>
      ) : (
        <div className='page-content'>
          <Breadcrumbs title='Users' breadcrumbItem='Users' />

          <Row>
            <Col className='col-12'>
              <Card>
                <CardBody>
                  <div className='flex justify-between items-center align-middle'>
                    <CardTitle>Users </CardTitle>
                    <div>
                      <div className='mt-1 relative rounded-md shadow-sm'>
                        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                          <SearchIcon
                            className='h-5 w-5 text-gray-400'
                            aria-hidden='true'
                          />
                        </div>
                        <input
                          type='text'
                          name='text'
                          id='text'
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          className='focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md'
                          placeholder='Search'
                        />
                      </div>
                    </div>
                    <Link
                      to={'/add-user'}
                      className='inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    >
                      <PlusIcon
                        className='-ml-1 mr-3 h-5 w-5'
                        aria-hidden='true'
                      />
                      Add User
                    </Link>
                  </div>
                  <div className='flex flex-col mt-3'>
                    <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                      <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
                        <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
                          <table className='min-w-full divide-y divide-gray-200'>
                            <thead className='bg-gray-50'>
                              <tr>
                                <th
                                  scope='col'
                                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                                >
                                  Name
                                </th>
                                <th
                                  scope='col'
                                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                                >
                                  NIN
                                </th>
                                <th
                                  scope='col'
                                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                                >
                                  Role
                                </th>
                                <th
                                  scope='col'
                                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                                >
                                  Phone
                                </th>
                                <th
                                  scope='col'
                                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                                >
                                  Approved
                                </th>
                                <th scope='col' className='relative px-6 py-3'>
                                  <span className='sr-only'>Edit</span>
                                </th>
                              </tr>
                            </thead>
                            <tbody className='bg-white divide-y divide-gray-200'>
                              {currentTableData.map((user) => (
                                <tr key={user.id}>
                                  <td className='px-6 py-4 whitespace-nowrap'>
                                    <div className='flex items-center'>
                                      {/* <div className='flex-shrink-0 h-10 w-10'>
                                      <img
                                        className='h-10 w-10 rounded-full'
                                        src={user.image}
                                        alt=''
                                      />
                                    </div> */}
                                      <div className='ml-4'>
                                        <div className='text-sm font-medium text-gray-900'>
                                          {user.firstName} {user.middleName}{' '}
                                          {user.lastName}
                                        </div>
                                        <div className='text-sm text-gray-500'>
                                          {user.email}
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className='px-6 py-4 whitespace-nowrap'>
                                    <div className='text-sm text-gray-900'>
                                      {user.nin}
                                    </div>
                                    <div className='text-sm text-gray-500'>
                                      {user.phone}
                                    </div>
                                  </td>
                                  <td className='px-6 py-4 whitespace-nowrap'>
                                    <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-yellow-800'>
                                      {user.role}
                                    </span>
                                  </td>
                                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                    {user.phone}
                                  </td>
                                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                    {user.approved ? 'Yes' : 'No'}
                                  </td>
                                  <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                                    <Link
                                      to={`/users/${user.id}`}
                                      className='text-indigo-600 hover:text-indigo-900'
                                    >
                                      Edit
                                    </Link>
                                    {'   '}
                                    <button
                                      type='button'
                                      onClick={() => deleteHandler(user.id)}
                                      className='text-red-600 hover:text-red-900'
                                    >
                                      Delete
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          {users.length === 0 && (
                            <p className='text-lg text-center m-3 p-3'>
                              No Users registered yet.{' '}
                              <Link className='border-b-2' to='/add-user'>
                                Click here to add an user.
                              </Link>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* {console.log(
                      <Pagination
                        currentPage={currentPage}
                        totalCount={users.length}
                        pageSize={PageSize}
                        onPageChange={(page) => setCurrentPage(page)}
                      />
                    )} */}
                  </div>
                  <Pagination
                    currentPage={currentPage}
                    totalCount={search(users).length}
                    pageSize={PageSize}
                    onPageChange={(page) => setCurrentPage(page)}
                    countOnPage={countOnPage.length}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </React.Fragment>
  );
  // const Users = () => {
  // return (
  //   <React.Fragment>
  //     <div className="page-content">
  //       <Breadcrumbs title="Users" breadcrumbItem="Users" />
  //       <Row>
  //         <Col className="col-12">
  //           <Card>
  //             <CardBody>
  //               <CardTitle className="h4">Users </CardTitle>
  //               {/* <p className="card-title-desc">
  //                 This is an experimental awesome solution for responsive tables
  //                 with complex data.
  //               </p> */}
  //               <div className="table-rep-plugin">
  //                 <div
  //                   className="table-responsive mb-0"
  //                   data-pattern="priority-columns"
  //                 >
  //                   <Table
  //                     id="ems-users"
  //                     className="table table-striped table-bordered"
  //                   >
  //                     <Thead>
  //                       <Tr>
  //                         <Th>Name</Th>
  //                         <Th data-priority="1">NIN</Th>
  //                         <Th data-priority="3">Email</Th>
  //                         <Th data-priority="1">Phone</Th>
  //                         <Th data-priority="3">Center</Th>
  //                         <Th data-priority="3">Role</Th>
  //                         <Th data-priority="6">Date Registered</Th>
  //                         <Th data-priority="6">Approved</Th>
  //                         <Th data-priority="6"></Th>
  //                       </Tr>
  //                     </Thead>
  //                     <Tbody>
  //                       {users.map((user, index) => (
  //                         <Tr>
  //                           <Th>{user.name}</Th>
  //                           <Td>{user.nin}</Td>
  //                           <Td>{user.email}</Td>
  //                           <Td>{user.phone}</Td>
  //                           <Td>{user.center}</Td>
  //                           <Td>{user.role}</Td>
  //                           <Td>{user.date}</Td>
  //                           <Td>{user.approved}</Td>
  //                           <Td>
  //                             {" "}
  //                             <Link to={"#"}>
  //                               <button
  //                                 variant="primary"
  //                                 className="btn btn-rounded btn-primary"
  //                               >
  //                                 <i className="fas fa-edit"></i> View
  //                               </button>
  //                             </Link>
  //                           </Td>
  //                         </Tr>
  //                       ))}
  //                     </Tbody>
  //                   </Table>
  //                 </div>
  //               </div>
  //             </CardBody>
  //           </Card>
  //         </Col>
  //       </Row>
  //     </div>
  //   </React.Fragment>
  // );
};

export default Users;
