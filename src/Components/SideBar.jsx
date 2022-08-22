import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import { AsyncStorage } from 'AsyncStorage';
import restaurent from './khanburgerlogo.jpg';

const SideBar = () => {
    const [admin, setAdmin] = useState('');

  const SetLocalLogin= async ()=>{
  try{
    let userLogin = await AsyncStorage.getItem('email');
    let parsed = JSON.parse(userLogin);
    if(parsed !== null){
      setAdmin(parsed);
    }
  }catch{
      return null;
  }
}
useEffect(()=>{
  SetLocalLogin();

})

    return (
        <div>
          <aside className="main-sidebar sidebar-dark-primary elevation-4">
  {/* Brand Logo */}
  <a href="#" className="brand-link">
    {/* <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} /> */}
    <h2 className="brand-text font-weight-light">Khan Burger</h2>
  </a>
  {/* Sidebar */}
  <div className="sidebar">
    {/* Sidebar user panel (optional) */}
    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
      <div className="image">
       <img src={restaurent} className="img-circle elevation-2 mt-1" alt="UserImage" />
      </div>
      <div className="info">
        <a href="#" className="d-block"><h3>KBR Panel</h3></a>
      </div>
    </div>
    {/* SidebarSearch Form */}

    {/* <div className="form-inline">
      <div className="input-group" data-widget="sidebar-search">
        <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
        <div className="input-group-append">
          <button className="btn btn-sidebar">
            <i className="fas fa-search fa-fw" />
          </button>
        </div>
      </div>
    </div> */}
    
    {/* Sidebar Menu */}
    <nav className="mt-2">
      <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
        {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
        <li className="nav-item menu-open">
          <a href="#/" className="nav-link bg-olive">
            <i className="nav-icon fas fa-user-circle" />
            <p>
              Sales Panel
              <i className="right fas fa-angle-left"></i>
            </p>
          </a>
          <ul className="nav nav-treeview">
           <li className="nav-item">
              <Link to={`${process.env.PUBLIC_URL}/`} className="nav-link">
                <i className="fas fa-shopping-cart nav-icon" />
                <p>Order Form</p>
              </Link>
            </li>
            
             <li className="nav-item">
              <Link to={`${process.env.PUBLIC_URL}/DeliveryTable`} className="nav-link">
                <i className="fas fa-clipboard-list nav-icon" />
                <p>Delivery Record Table</p>
              </Link>
            </li>

             <li className="nav-item">
              <Link to={`${process.env.PUBLIC_URL}/DinInTable`} className="nav-link">
                <i className="fas fa-clipboard-list nav-icon" />
                <p>Dine-In Record Table</p>
              </Link>
            </li>

            <li className="nav-item">
              <Link to={`${process.env.PUBLIC_URL}/TakeAwayTable`} className="nav-link">
                <i className="fas fa-clipboard-list nav-icon" />
                <p>Take Away Record Table</p>
              </Link>
            </li>


            {admin === 'Admin'? <li className="nav-item">
              <Link to={`${process.env.PUBLIC_URL}/DeleteOrders`} className="nav-link">
                <i className="fas fa-window-close nav-icon" />
                <p>Delete Orders</p>
              </Link>
            </li>: null}
            

            <li className="nav-item">
              <Link to={`${process.env.PUBLIC_URL}/CancelOrderTable`} className="nav-link">
                <i className="fa fa-ban nav-icon" aria-hidden="true" />
                <p>Cancel Order Table</p>
              </Link>
            </li>
            
            <li className="nav-item">
              <Link to={`${process.env.PUBLIC_URL}/ItemForm`}  className="nav-link">
                <i className="fas fa-utensils nav-icon" />
                <p>Item Form</p>
              </Link>
            </li>

            <li className="nav-item">
              <Link to={`${process.env.PUBLIC_URL}/FoodItems`}  className="nav-link">
                <i className="fas  fa-hamburger nav-icon" />
                <p>Food Items</p>
              </Link>
            </li>

             {admin === 'Admin'?
            <li className="nav-item">
              <Link to={`${process.env.PUBLIC_URL}/UpdateCompRecord`}  className="nav-link">
              <i class="fas fa-pen-alt nav-icon"></i>
                <p>Update Customer Record</p>
              </Link>
            </li>:null}
           


          </ul>
        </li>
      </ul>


      <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
       <li className="nav-item menu-open">
         <Link to="#" className="nav-link bg-olive">
            <i className="nav-icon fas fa-biking" />
            <p>
              Rider Panel
              <i className="right fas fa-angle-left" />
            </p>
          </Link>
      
       <li className="nav-item">
              <Link to={`${process.env.PUBLIC_URL}/RiderForm`} className="nav-link">
                <i className="fas fa-window-maximize nav-icon" />
                <p>Rider Form</p>
              </Link>
            </li>

            <li className="nav-item">
              <Link to={`${process.env.PUBLIC_URL}/RegisterRiders`} className="nav-link">
              <i class="fas fa-address-card nav-icon"/>
                <p>Registered Riders</p>
              </Link>
            </li>

            <li className="nav-item">
              <Link to={`${process.env.PUBLIC_URL}/AssignRider`} className="nav-link">
                <i className="fas fa-male nav-icon" />
                <p>Assign Rider</p>
              </Link>
            </li>
             <li className="nav-item">
              <Link to={`${process.env.PUBLIC_URL}/RiderTable`} className="nav-link">
                <i className="fas fa-clipboard-list nav-icon" />
                <p>Rider Table</p>
              </Link>
            </li>
            </li>
      </ul>
    </nav>
    {/* /.sidebar-menu */}
  </div>
  {/* /.sidebar */}
</aside>
</div>
    )
}

export default SideBar
