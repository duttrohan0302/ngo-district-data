import React from 'react'
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import NavBar from '../Components/NavBar';
import Alert from '../Components/Alert';


const DefaultLayout = ({children}) => {
    return (
        <div id="wrapper">
            <div className="container-fluid p-0 min-vh-100">
                <NavBar/>
                <div id="page-wrapper">
                    <Alert />
                    {children}
                </div>
            </div>
        </div>
    )
}


const DefaultLayoutRoute = ({component: Component, ...rest}) => ( 

      <Route {...rest} render={matchProps => (  
        <DefaultLayout>
            <Component {...matchProps} />  
        </DefaultLayout>
      )} />  

)

DefaultLayout.propTypes = {
    children: PropTypes.element.isRequired,
};

export default DefaultLayoutRoute;

