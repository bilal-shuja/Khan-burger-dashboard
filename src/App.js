import Header from "./Components/Header.jsx";
import SignUp from './Components/SignUp.jsx';
import SideBar from "./Components/SideBar.jsx";
import ItemForm from "./Components/ItemForm.jsx";
import FoodItems from './Components/FoodItems.jsx'
import OrderForm from "./Components/OrderForm.jsx";
import UpdateItemForm from './Components/UpdateItemForm';
import RiderForm from './Components/RiderForm.jsx';
import RegisterRiders from './Components/RegisterRiders';
import UpdateRiders from './Components/UpdateRiders.jsx';
import AssignRider from './Components/AssignRider.jsx';
import RiderTable from './Components/RiderTable.jsx';
import DeliveryTable from './Components/RecordFunction.jsx';
import DinInTable from './Components/DinInTableRecord.jsx';
import TakeAwayTable from './Components/TakeAwayTableRecord.jsx';
import CancelOrderTable from './Components/CancelOrderTable.jsx';
import DeleteOrders from './Components/DeleteOrders.jsx';
import Footer from "./Components/Footer.jsx";
import UpdateIndRecord from './Components/UpdateIndRecord.jsx';
import UpdateCompRecord from './Components/UpdateCompRecord.jsx';
import Khanburgerlogo from './Components/khanburgerlogo.jpg';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React,{useState,useEffect} from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AsyncStorage } from 'AsyncStorage';
import axios from 'axios';
import "./App.css";

const App = () => {
const [login, setLogin] = useState(1);
// const [getUsers, setGetUsers] = useState([]);

const [inputs, setInputs] = useState({
  User:'',
  Password:''
})

// const registerUsers = ()=>{
//   axios.get(`https://api.khannburger.com/getRegisterUsers.php?Username=`+inputs.User)
//   .then((res)=>{
//   setGetUsers(res.data);
//   console.log(res.data);
//   }).catch((error)=>{
//     console.log(error);
//   })
// }
// console.log(getUsers)


const SetLocalLogin= async ()=>{
  try{
    let userLogin = await AsyncStorage.getItem('login');
    let parsed = JSON.parse(userLogin);
    if(parsed !== null){
      setLogin(parsed);
    }
  }catch{
      return null;
  }
}
useEffect(()=>{
SetLocalLogin();
// registerUsers();
},[])

const inputHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
const SignIN = (e) => {
  e.preventDefault();
    if(inputs.User==="Employee" && inputs.Password==="emp@1122"){
      AsyncStorage.setItem('login',JSON.stringify(2));
      setLogin(2);
          AsyncStorage.setItem('email',JSON.stringify(inputs.User));
      AsyncStorage.setItem('password',JSON.stringify(inputs.Password));
    }
    else if(inputs.User === 'Admin' && inputs.Password ==='myadmin11'){
        AsyncStorage.setItem('login',JSON.stringify(2));
      setLogin(2);
      AsyncStorage.setItem('email',JSON.stringify(inputs.User));
      AsyncStorage.setItem('password',JSON.stringify(inputs.Password));
    }
    else{
      toast.warn("Incorrect Credentials");

    }
    setInputs({
      User:'',
      Password:''
    });
}

if( login === 1){
  return( 
 <>
   <div className="hold-transition login-page ">
   {/* <div  className="d-flex justify-content-center"> */}
   <div className="login-box">
        <div className="login-logo">
          <a href="#">
          <a href="/"><b>Khan</b>Burger</a>
            {/* <img src={Khanburgerlogo} className="img-fluid rounded-circle d-block mx-auto" alt="" style={{width:"5em"}}/> */}
          </a>
        </div>
        {/* /.login-logo */}
        <div className="card">
          <div className="card-body ">
            <p className="login-box-msg">Please Sign In</p>
            <form action="POST" method="post" onSubmit={SignIN}>
              <div className="input-group mb-3">
                <input
                  name="User"
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  onChange={inputHandler}
                  value={inputs.User}
                  // onKeyUp={()=>{registerUsers()}}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  name="Password"
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={inputHandler}
                  value={inputs.Password}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                 <button type="submit" className="btn btn-primary btn-block">
                    Sign In
                  </button>
                </div>

              </div>
            </form>

            <div className="social-auth-links text-center mb-3">
              <p>- OR -</p>
              {/* <a href="#" className="btn btn-block btn-primary">
                <i className="fab fa-facebook mr-2" /> Sign in using Facebook
              </a>
              <a href="#" className="btn btn-block btn-danger">
                <i className="fab fa-google-plus mr-2" /> Sign in using Google+
              </a> */}
            </div>
            {/* /.social-auth-links */}
            <p className="mb-1">
              <a href="/Login" onClick={()=>{alert("سروس فراہم کنندہ سے رابطہ کریں۔")}}>I forgot my password</a>
            </p>
            <p className="mb-0">
              <a  className="text-center" style={{cursor:"pointer"}}
              onClick={()=>{setLogin(3)}}
              >
                Register a new membership
              </a>
            </p>
          </div>
          {/* /.login-card-body */}
        </div>
      </div>
      
  {/* </div> */}
  <footer className="w-100 bg-transparent text-center" style={{marginTop:"8em"}}>
          <p>©2022   <strong><a href="https://ussofts.netlify.app/">Alphanites Pvt ltd</a> </strong>. All Rights Reserved | Terms and Condition</p>        
        </footer>  
</div>
        
</>

  )

}

else if(login === 2){
 return (
    <div className="wrapper">
      <Router   basename={'/#'} >
        <Header />
        <SideBar />
        <Switch>
        <Route path={`${process.env.PUBLIC_URL}/`}  exact component={OrderForm} />
        <Route path={`${process.env.PUBLIC_URL}/ItemForm`}  component={ItemForm}/>
        <Route path={`${process.env.PUBLIC_URL}/DeleteOrders`}  component={DeleteOrders}/>
        <Route path={`${process.env.PUBLIC_URL}/CancelOrderTable`}  component={CancelOrderTable}/>
        <Route path={`${process.env.PUBLIC_URL}/FoodItems`}  component={FoodItems}/>
        <Route path={`${process.env.PUBLIC_URL}/UpdateItemForm`}  component={UpdateItemForm}/>
        <Route path={`${process.env.PUBLIC_URL}/DeliveryTable`} component={DeliveryTable}/>
        <Route path={`${process.env.PUBLIC_URL}/DinInTable`} component={DinInTable}/>
        <Route path={`${process.env.PUBLIC_URL}/TakeAwayTable`} component={TakeAwayTable}/>
        <Route path={`${process.env.PUBLIC_URL}/UpdateIndRecord`} component={UpdateIndRecord}/>
        <Route path={`${process.env.PUBLIC_URL}/UpdateCompRecord`} component={UpdateCompRecord}/>

        
        <Route path={`${process.env.PUBLIC_URL}/RiderForm`}component={RiderForm}/>
        <Route path={`${process.env.PUBLIC_URL}/RegisterRiders`}component={RegisterRiders}/>
        <Route path={`${process.env.PUBLIC_URL}/UpdateRiders`}component={UpdateRiders}/>
        <Route path={`${process.env.PUBLIC_URL}/AssignRider`} component={AssignRider}/>
        <Route path={`${process.env.PUBLIC_URL}/RiderTable`} component={RiderTable}/>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

else if(login === 3){
  return (
  
    <SignUp/>
    
  )
}
 
}

export default App;
