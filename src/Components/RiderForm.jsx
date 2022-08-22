import {React,useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";


const RiderForm = () => {

const[riderName, setRiderName] =useState("");
const[riderNumber, setRiderNumber] =useState("");
const[riderID,setRiderID] = useState("");

const submitRiderForm =(e)=>{
     e.preventDefault();
    const RiderData ={
        riderName:riderName,
        riderNumber:riderNumber,
        riderID:riderID
    }
    axios.post("https://api.khannburger.com/RiderForm.php",RiderData)
    .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
    toast.info("Rider Registered!");
    setRiderName("");
    setRiderNumber("");
    setRiderID("");
}




  return (
    <>
      <div className="content-wrapper" style={{background:"white"}}>
  <section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1>Rider Form</h1>
        </div>
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item">
             {/* <h1 classname="logout" onclick="{Login}"><i classname="fas fa-unlock" /></h1> */}
            </li>
          </ol>
        </div>
      </div>
    </div>
    {/* .container-fluid  */}
  </section>
  <section className="content">
    <div className="container-fluid">
      <div className="row">
         {/* left column  */}
        <div className="col-md-10">
           {/* general form elements  */}
          <div className="card card-info">
            <div className="card-header">
              <h2>Rider Form</h2>
            </div>
            {/* .card-header  */}
              {/* form start */}
            <form onSubmit={submitRiderForm}>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-4">
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Rider Name*</label>
                      <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Enter Rider Name" value={riderName}  onChange={(e) => setRiderName(e.target.value)} required/>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword1">Rider Number*</label>
                      <input type="number" className="form-control" id="exampleInputPassword1" placeholder="Enter Rider Number" value={riderNumber}  onChange={(e) => setRiderNumber(e.target.value)} required/>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Rider Unique ID*</label>
                      <input type="number" className="form-control" id="exampleInputEmail1" placeholder="Enter Rider ID" value={riderID}  onChange={(e) => setRiderID(e.target.value)} required/>
                    </div>
                  </div>
                </div>
              </div>
              {/* card-footer */}
              <div className="card-footer">
                <button type="submit" className="btn btn-outline-info">Submit</button>
              </div>
            </form>
          </div>
        </div> 
      </div>
    </div>
  </section>
</div>

    </>
  );
};

export default RiderForm;
