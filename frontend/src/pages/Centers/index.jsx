import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, CardBody, CardTitle } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { centersList } from '../../actions/centerActions';
import { Link } from 'react-router-dom';
// import { useTable } from 'react-table';
import Pagination from '../../components/Pagination';
import { PlusIcon } from '@heroicons/react/outline';
import { SearchIcon } from '@heroicons/react/solid';

/* This example requires Tailwind CSS v2.0+ */
// const people = [
//   {
//     name: 'Jane Cooper',
//     title: 'Regional Paradigm Technician',
//     department: 'Optimization',
//     role: 'Admin',
//     email: 'jane.cooper@example.com',
//     image:
//       'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
//   },
//   {
//     name: 'Jane Cooper',
//     title: 'Regional Paradigm Technician',
//     department: 'Optimization',
//     role: 'Admin',
//     email: 'jane.cooper@example.com',
//     image:
//       'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
//   },
//   {
//     name: 'Jane Cooper',
//     title: 'Regional Paradigm Technician',
//     department: 'Optimization',
//     role: 'Admin',
//     email: 'jane.cooper@example.com',
//     image:
//       'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
//   },
//   {
//     name: 'Jane Cooper',
//     title: 'Regional Paradigm Technician',
//     department: 'Optimization',
//     role: 'Admin',
//     email: 'jane.cooper@example.com',
//     image:
//       'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
//   },
//   {
//     name: 'Jane Cooper',
//     title: 'Regional Paradigm Technician',
//     department: 'Optimization',
//     role: 'Admin',
//     email: 'jane.cooper@example.com',
//     image:
//       'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
//   },
//   {
//     name: 'Jane Cooper',
//     title: 'Regional Paradigm Technician',
//     department: 'Optimization',
//     role: 'Admin',
//     email: 'jane.cooper@example.com',
//     image:
//       'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
//   },
//   // More people...
// ];

const PageSize = 2;

export default function Enrollees() {
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const centerList = useSelector((state) => state.centerList);

  const { loading, error, centers } = centerList;

  console.log(centers);

  useEffect(() => {
    dispatch(centersList());
  }, [dispatch]);

  console.log(error);

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

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    if (centers) {
      return search(centers).slice(firstPageIndex, lastPageIndex);
    }
  }, [currentPage, centers, search]);

  return (
    <React.Fragment>
      {loading ? (
        <p>Loader</p>
      ) : (
        <div className='page-content'>
          <Breadcrumbs title='Centers' breadcrumbItem='Centers' />

          <Row>
            <Col className='col-12'>
              <Card>
                <CardBody>
                  <div className='flex justify-between items-center'>
                    <CardTitle>Centers </CardTitle>
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
                      to='/add-center'
                      className='inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    >
                      <PlusIcon
                        className='-ml-1 mr-3 h-5 w-5'
                        aria-hidden='true'
                      />
                      Add Center
                    </Link>
                  </div>
                  <div className='flex flex-col mt-2'>
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
                                  Email
                                </th>
                                <th
                                  scope='col'
                                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                                >
                                  Address
                                </th>
                                <th
                                  scope='col'
                                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                                >
                                  City
                                </th>
                                <th
                                  scope='col'
                                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                                >
                                  State
                                </th>

                                <th
                                  scope='col'
                                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                                >
                                  LGA
                                </th>
                                <th scope='col' className='relative px-6 py-3'>
                                  <span className='sr-only'>Edit</span>
                                </th>
                              </tr>
                            </thead>
                            <tbody className='bg-white divide-y divide-gray-200'>
                              {currentTableData.map((center) => (
                                <tr key={center.id}>
                                  <td className='px-6 py-4 whitespace-nowrap'>
                                    <div className='flex items-center'>
                                      {/* <div className='flex-shrink-0 h-10 w-10'>
                                      <img
                                        className='h-10 w-10 rounded-full'
                                        src={center.image}
                                        alt=''
                                      />
                                    </div> */}
                                      <div className='ml-4'>
                                        <div className='text-sm font-medium text-gray-900'>
                                          {center.centerName}{' '}
                                        </div>
                                        <div className='text-sm text-gray-500'>
                                          {center.centerEmail}
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className='px-6 py-4 whitespace-nowrap'>
                                    <div className='text-sm text-gray-900'>
                                      {/* {center.address} */}
                                    </div>
                                    <div className='text-sm text-gray-500'>
                                      {center.centerEmail}
                                    </div>
                                  </td>
                                  <td className='px-6 py-4 whitespace-nowrap'>
                                    <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-yellow-800'>
                                      {center.centerAddress}
                                    </span>
                                  </td>
                                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                    {center.centerCity}
                                  </td>
                                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                    {center.centerState}
                                  </td>
                                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                    {center.centerLga}
                                  </td>
                                  <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                                    <Link
                                      to={`/centers/${center.id}`}
                                      className='text-indigo-600 hover:text-indigo-900'
                                    >
                                      Edit
                                    </Link>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          {centers.length === 0 && (
                            <p className='text-lg text-center m-3 p-3'>
                              No Center registered yet.{' '}
                              <Link className='border-b-2' to='/add-enrollee'>
                                Click here to add an enrollee.
                              </Link>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Pagination
                    currentPage={currentPage}
                    totalCount={centers.length}
                    pageSize={PageSize}
                    onPageChange={(page) => setCurrentPage(page)}
                    countOnPage={currentTableData.length}
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
