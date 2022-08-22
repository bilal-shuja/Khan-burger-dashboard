import React,{useState, useEffect} from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AsyncStorage } from 'AsyncStorage';
import showPass from './show.png';
import hidePass from './hide.png';
import axios from 'axios';
import '../App.css';


const SignUp = () => {
  const [UserName, setUserName] = useState('');
  const[Cnic , setCnic] = useState('');
  const[ReCnic , setReCnic] = useState('');

  const [isReveal , setIsReveal] = useState(false);
    const [isReveal2 , setIsReveal2] = useState(false);

 

const submitUsers = (e)=>{
    e.preventDefault();

    if(Cnic !== ReCnic){
      toast.error(`CNIC doesn't match !`);
    setUserName("");
    setCnic("");
    setReCnic("");

    }
    else{

    const Users = {
      UserName,
      Cnic,
      ReCnic
    }
    axios.post('https://api.khannburger.com/registerUsers.php',Users)
    .then((res)=>{
      console.log(res.data);
    setUserName("");
    setCnic("");
    setReCnic("");
    })
    .catch((error)=>{
      console.log(error);
    })
   
    toast.info('Credentials Saved !');
    console.log(Users);
   
    }

}
useEffect(()=>{

},[])
const backToLoginPage =()=>{
   AsyncStorage.setItem('login',JSON.stringify(1));
   window.location.reload(true);
}
    return (
        <>
      <section className="vh-100" style={{backgroundColor: '#eee'}}>
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-12 col-xl-11">
        <div className="card text-black" style={{borderRadius: 25}}>
          <div className="card-body p-md-5">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                <form className="mx-1 mx-md-4" action="POST" onSubmit={submitUsers}>
                 
                  
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw" />
                    <div className="form-outline flex-fill mb-0">
                      {/* <label className="form-label" htmlFor="form3Example1c">Your Name</label> */}
                      <input type="text" id="form3Example1c" placeholder="Enter Username" className="form-control" value={UserName} onChange={(e)=>{setUserName(e.target.value)}} />
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw" />
                    <div className="form-outline flex-fill mb-0">
                      {/* <label className="form-label" htmlFor="form3Example4c">Password</label> */}
                    <input type={isReveal? "text":"password"} id="form3Example4c"  placeholder="Enter CNIC"  className="form-control" value={Cnic} onChange={(e)=>{setCnic(e.target.value)}} />
                       <i className="fas fa-eye errspan"  onClick={() => setIsReveal(prevState => !prevState)}></i>
                    </div>

                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-key fa-lg me-3 fa-fw" />
                    <div className="form-outline flex-fill mb-0">
                  
                      {/* <label className="form-label" htmlFor="form3Example4cd">Repeat your password</label> */}
                    <input type={isReveal2? "text":"password"} id="form3Example4cd"  placeholder="Retype CINC" className="form-control" value={ReCnic} onChange={(e)=>{setReCnic(e.target.value)}}/>
                    <i className="fas fa-eye errspan" onClick={() => setIsReveal2(prevState => !prevState)}></i>
                    </div>
                  </div>

                  <div className="ml-3 col-lg-12">
                    <button type="submit" className="btn btn-outline-primary btn-block">Register</button>
                  </div>
                  
                </form>
                <p className="mt-5" onClick={()=>{backToLoginPage()}} style={{cursor:"pointer" , color:"blue"}}>I already have a membership</p>
              </div>
              <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" className="img-fluid" alt="Sample image" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>



        </>
    )
}

export default SignUp
