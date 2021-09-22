import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// import { logoutUser } from "../../store/actions"

const Logout = (props) => {
  useEffect(() => {
    // props.logoutUser(props.history);
    localStorage.removeItem('userInfo');
    // localStorage.setItem('info', 'loggedout');
    props.history.push('/');
  });

  return <></>;
};

// Logout.propTypes = {
//   history: PropTypes.object,
//   logoutUser: PropTypes.func,
// };

export default Logout;

// export default withRouter(connect(null, { logoutUser })(Logout))
