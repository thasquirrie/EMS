import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

//i18n
import { withTranslation } from 'react-i18next';
import SidebarContent from './SidebarContent';

// import avatar2 from "../../assets/images/users/avatar-2.jpg"
import thasquirrie from '../../assets/images/users/thasquirrie.jpeg';
import user from '../../assets/images/users/default.jpg';

const Sidebar = (props) => {
  console.log(props);

  // const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { loading, userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      console.log({ userInfo });
      props.history.push('/login');
    }
  }, [userInfo, props]);

  return (
    <React.Fragment>
      {loading ? (
        <p>We are loading</p>
      ) : (
        <div className='vertical-menu'>
          <div className='h-100'>
            <div className='user-wid text-center py-4'>
              <div className='user-img'>
                <img
                  src={user}
                  alt=''
                  className='avatar-md mx-auto rounded-circle'
                />
              </div>

              <div className='mt-3'>
                <Link to='#' className='text-dark fw-medium font-size-16'>
                  {/* {userInfo.user.firstName} {userInfo.user.lastName} */}
                </Link>
                <p className='text-body mt-1 mb-0 font-size-13'>
                  {userInfo && userInfo.user.role.toUpperCase()}{' '}
                </p>
              </div>
            </div>
            <div data-simplebar className='h-100'>
              {props.type !== 'condensed' ? (
                <SidebarContent user={userInfo} />
              ) : (
                <SidebarContent />
              )}
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

Sidebar.propTypes = {
  type: PropTypes.string,
};

const mapStatetoProps = (state) => {
  return {
    layout: state.Layout,
  };
};
export default connect(
  mapStatetoProps,
  {}
)(withRouter(withTranslation()(Sidebar)));
