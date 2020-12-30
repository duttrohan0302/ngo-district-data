import React,{ useState } from 'react';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link }from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  Form,
  Button,
  FormGroup,
  Input
} from 'reactstrap';

import { logout } from '../Actions/authActions'

import {history} from '../Helpers'

const NavBar = ({isAuthenticated,user,logout}) => {

  const {pathname} = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const onSubmit = async (e) => {
    e.preventDefault();
      history.push(`/district/${e.target.district.value}`)

  }
  console.log(user)
  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/" className={pathname==='/' ? 'text-white' : 'text-secondary'} style={{}}>Village Data</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/allDistricts" className={pathname==='/allDistricts' ? 'text-white' : ''}>All Villages</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/dashboard"  className={pathname==='/dashboard' ? 'text-white' : ''}>Dashboard</NavLink>
            </NavItem>
            {
              isAuthenticated && user &&
              <span className="text-center">Hi {user.name}!</span>
            }
          </Nav>
          
          <Form inline className="ml-auto" onSubmit={onSubmit}>
            <FormGroup className="mr-5">
              <Input 
                type="text" 
                name="district" 
                placeholder="Enter Village Name" 
                className="mr-2"/>
              <Button color="info" className="mt-auto">Search</Button>
            </FormGroup>
          </Form>
          <NavbarText>
            {
              isAuthenticated ?
              <Button onClick={logout} color="danger">
                <i className="fa fa-sign-out" aria-hidden="true"></i>
                  Logout
              </Button>
              :
              <Link to="/login">
                <Button color="secondary">
                  <i className="fa fa-sign-in" aria-hidden="true"></i>
                    Login
                </Button>
              </Link>
            }
            
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

NavBar.propTypes = {
  auth: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
  logout: PropTypes.func
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps,{logout})(NavBar);

