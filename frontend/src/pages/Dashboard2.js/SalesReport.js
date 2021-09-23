import React, { useEffect } from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import ReactApexChart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import { centersList } from '../../actions/centerActions';

const series = [
  {
    name: 'Series A',
    data: [24, 66, 42, 88, 62, 24, 45, 12, 36, 10],
  },
  // {
  //   name: "Series B",
  //   data: [74, 16, 42, 48, 22, 54, 4, 32, 36, 20],
  // },
];

const options = {
  chart: {
    sparkline: {
      enabled: !0,
    },
    toolbar: {
      show: !1,
    },
  },
  dataLabels: {
    enabled: !1,
  },
  stroke: {
    curve: 'smooth',
    width: 3,
  },
  colors: ['#3b5de7', '#3cf311'],
};

const Breadcrumb = (props) => {
  const dispatch = useDispatch();
  const centerList = useSelector((state) => state.centerList);

  const { centers } = centerList;

  useEffect(() => {
    if (props.user) {
      if (centers) {
        if (centers.length === 0) {
          dispatch(centersList());
        }
      }
    }
    // else {
    //   props.history.push('/');
    // }
  });

  console.log(centers);

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <h4 className='card-title mb-4'>Centers</h4>
          <Row>
            <Col sm={7}>
              <div>
                <p className='mb-2'>01 Jan - 31 Jan, 2021</p>
                <h4 className='text-lg'>{centers ? centers.length : 0}</h4>

                <p className='mt-4 mb-0'>
                  <span className='badge badge-soft-success me-2'>
                    {' '}
                    0.6%
                    <i className='mdi mdi-arrow-up'></i>{' '}
                  </span>{' '}
                  From previous period
                </p>
              </div>
            </Col>
            <Col sm={4}>
              <div className='mt-4 mt-sm-0'>
                <ReactApexChart
                  options={options}
                  series={series}
                  type='line'
                  height='100'
                  className='apex-charts'
                />
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};
export default Breadcrumb;
