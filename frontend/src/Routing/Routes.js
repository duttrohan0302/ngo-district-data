import React from 'react';
import { Switch } from 'react-router-dom';
import HomePage from '../Components/HomePage';
import Districts from '../Components/Districts';
import DashBoard from '../Components/DashBoard';
import { connect } from 'react-redux';

import DefaultLayoutRoute from './DefaultLayout';
import ParticularDistrict from '../Components/ParticularDistrict';
import Login from '../Components/Auth/Login';


const Routes =  ()  => {
  return (
      <Switch>
        <DefaultLayoutRoute exact path="/" component={HomePage} />
        <DefaultLayoutRoute exact path="/allDistricts" component={Districts} />
        <DefaultLayoutRoute exact path="/dashboard" component={DashBoard} />
        <DefaultLayoutRoute exact path="/district/:name" component={ParticularDistrict} />
        <DefaultLayoutRoute exact path="/login" component={Login} />
      </Switch>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Routes);

