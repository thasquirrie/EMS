import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, CardBody, CardTitle } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { enrolleesList } from '../../actions/enrolleeActions';
import { Link } from 'react-router-dom';
// import { useTable } from 'react-table';
import Pagination from '../../components/Pagination';
import { PlusIcon } from '@heroicons/react/outline';
import Search from '../../components/Search';
import { SearchIcon } from '@heroicons/react/solid';

/* This example requires Tailwind CSS v2.0+ */

const PageSize = 2;

export default function Enrollees() {
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  // console.log({ userInfo });

  const enrolleeList = useSelector((state) => state.enrolleeList);

  const { loading, error, enrollees } = enrolleeList;

  // console.log('List:', enrolleeList);

  useEffect(() => {
    dispatch(enrolleesList());
  }, [dispatch]);

  const search = useCallback(
    (rows) => {
      const columns = rows[0] && Object.keys(rows[0]);
      // console.log({ columns });
      return rows.filter((row) => {
        // console.log(row.firstName.toLowerCase().indexOf(query) > -1);
        // console.log(query);
        // return (
        //   row.firstName.toLowerCase().indexOf(query.toString().toLowerCase()) >
        //     -1 ||
        //   row.lastName.toLowerCase().indexOf(query.toString().toLowerCase()) >
        //     -1 ||
        //   row.middleName.toLowerCase().indexOf(query.toString().toLowerCase()) >
        //     -1 ||
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
          // console.log('Wow', row[column]);
          // console.log({ column });
          return (
            (row[column] &&
              row[column]
                .toString()
                .toLowerCase()
                .indexOf(query.toLowerCase()) > -1) ||
            (row[column] === 'center' &&
              row[column].centerName &&
              row[column]
                .toString()
                .centerName.toLowerCase()
                .indexOf(query.toLowerCase()) > -1)
          );
        });
      });
    },
    [query]
  );

  // console.log(enrollees);

  // if (enrollees) {
  // }

  // console.log({ loading, error, enrollees });

  let countOnPage = [];
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    if (enrollees) {
      // console.log('Search:', search(enrollees));
      countOnPage = search(enrollees).slice(firstPageIndex, lastPageIndex);
      return search(enrollees).slice(firstPageIndex, lastPageIndex);
    }
  }, [currentPage, enrollees, search]);

  // console.log({ currentTableData });
  // console.log({ countOnPage });

  return (
    <React.Fragment>
      {loading ? (
        <p>Loader</p>
      ) : (
        <div className='page-content'>
          <Breadcrumbs
            title={
              userInfo.user.center
                ? userInfo.user.center.centerName
                : 'Enrollees'
            }
            breadcrumbItem='Enrollees'
          />

          <Row>
            <Col className='col-12'>
              <Card>
                <CardBody>
                  <div className='flex justify-between items-center'>
                    <CardTitle>Enrollees </CardTitle>
                    {/* <Search /> */}
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
                      to='/add-enrollee'
                      className='inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    >
                      <PlusIcon
                        className='-ml-1 mr-3 h-5 w-5'
                        aria-hidden='true'
                      />
                      Add Enrollee
                    </Link>
                  </div>
                  <div className='flex flex-col mt-4'>
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
                                  Tracking ID
                                </th>
                                <th
                                  scope='col'
                                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                                >
                                  Status
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
                                  BVN
                                </th>
                                <th
                                  scope='col'
                                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                                >
                                  Center Name
                                </th>
                                <th scope='col' className='relative px-6 py-3'>
                                  <span className='sr-only'>Edit</span>
                                </th>
                              </tr>
                            </thead>
                            <tbody className='bg-white divide-y divide-gray-200'>
                              {enrollees.length !== 0
                                ? currentTableData.map((enrollee) => (
                                    <tr key={enrollee.id}>
                                      <td className='px-6 py-4 whitespace-nowrap'>
                                        <div className='flex items-center'>
                                          {/* <div className='flex-shrink-0 h-10 w-10'>
                                      <img
                                        className='h-10 w-10 rounded-full'
                                        src={enrollee.image}
                                        alt=''
                                      />
                                    </div> */}
                                          <div className='ml-4'>
                                            <div className='text-sm font-medium text-gray-900'>
                                              {enrollee.firstName}{' '}
                                              {enrollee.middleName}{' '}
                                              {enrollee.lastName}
                                            </div>
                                            <div className='text-sm text-gray-500'>
                                              {enrollee.email}
                                            </div>
                                          </div>
                                        </div>
                                      </td>
                                      <td className='px-6 py-4 whitespace-nowrap'>
                                        <div className='text-sm text-gray-900'>
                                          {enrollee.trackingID}
                                        </div>
                                        <div className='text-sm text-gray-500'>
                                          {enrollee.associatedTrackingID}
                                        </div>
                                      </td>
                                      <td className='px-6 py-4 whitespace-nowrap'>
                                        <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-yellow-800'>
                                          {enrollee.status}
                                        </span>
                                      </td>
                                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                        {enrollee.phone}
                                      </td>
                                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                        {enrollee.bvn}
                                      </td>
                                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                        {enrollee.center
                                          ? enrollee.center.centerName
                                          : ''}
                                      </td>
                                      <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                                        <Link
                                          to={`/enrollees/${enrollee.id}`}
                                          className='text-indigo-600 hover:text-indigo-900'
                                        >
                                          Edit
                                        </Link>
                                      </td>
                                    </tr>
                                  ))
                                : // <p className='text-lg text-center m-3 p-3'>
                                  //   No Enrollees registered.
                                  // </p>
                                  ''}
                            </tbody>
                          </table>
                          {enrollees.length === 0 && (
                            <p className='text-lg text-center m-3 p-3'>
                              No Enrollees registered yet.{' '}
                              <Link className='border-b-2' to='/add-enrollee'>
                                Click here to add an enrollee.
                              </Link>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* {console.log(
                    <Pagination
                      currentPage={currentPage}
                      totalCount={search(enrollees).length}
                      pageSize={PageSize}
                      onPageChange={(page) => setCurrentPage(page)}
                      // countOnPage={}
                    />
                  )} */}
                  <Pagination
                    currentPage={currentPage}
                    totalCount={search(enrollees).length}
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
}
