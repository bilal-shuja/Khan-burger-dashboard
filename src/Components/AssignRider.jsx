import React,{useState,useEffect} from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

const AssignRider = () => {

const [fetchRider, setFetchRider] = useState([]);
const[riderName, setRiderName]= useState('');
const[riderID, setRiderID] = useState('');
const[riderCount, setRiderCount]= useState('');

const fetchRiderData =()=>{
axios.get('https://api.khannburger.com/fetchRiderRecord.php')
.then((res)=>{
    setFetchRider(res.data);
    console.log(res.data);
})
.catch((error)=>{
    console.log(error);
})
}

const setRiderDetails =(e)=>{
  let key = e.code;
  if(key === 'Enter'){
     fetchRider.filter((item)=> item.RiderID === riderID).map((item)=>{
            return(
                setRiderName(item.RiderName)
            )
            
        })

  }
       
}

useEffect(() => {
  fetchRiderData();
//   setRiderDetails();
}, [])

const AssignRiderForm =(e)=>{
e.preventDefault();
let today = new Date();
  let year = today.getFullYear();
  let mes = today.getMonth()+1;
  let dia = today.getDate();
  let fecha =year+"-"+mes+"-"+dia;
const RiderData = {
    RiderID:riderID,
    RiderName:riderName,
    RiderCount:riderCount,
    date:fecha

}
 axios.post("https://api.khannburger.com/insertRiderRecord.php", RiderData)
  .then((res) => console.log(res.data))
    .catch((error) => console.log(error));
    console.log(RiderData);

toast.info("Order Assigned!");
setRiderName('');
setRiderID('');
setRiderCount('');

}
return (
<div  className="content-wrapper" style={{background:"white"}}>
<section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1>Assign Rider</h1>
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
              <h2>Assign Rider Form</h2>
            </div>
            {/* .card-header  */}
              {/* form start */}
            <form onSubmit={AssignRiderForm}>
              <div className="card-body">
                <div className="row">
                    <div className="col-lg-4">
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Enter Rider Unique ID*</label>
                      {/* <button
                              type="button"
                              onClick={setRiderDetails}
                              className="btn btn-outline-secondary btn-sm"
                              style={{
                                borderRadius: "30%",
                                marginLeft: "5px",
                                fontSize: "12px",
                              }}
                            >
                              Add
                            </button> */}
                      <input type="number" onKeyPress={(e)=>setRiderDetails(e)} className="form-control" id="exampleInputEmail1" placeholder="Enter Rider ID" value={riderID}  onChange={(e)=>setRiderID(e.target.value)} required/>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Rider Name*</label>
                      <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Enter Rider Name" value={riderName} onChange={(e)=>setRiderName(e.target.value)} required/>
                    </div>
                  </div>
                  <div className="col-lg-4">
                               
                    <div className="form-group">
                       <label htmlFor="exampleInputEmail1">Enter Riders Order No*</label>
                      <input type="number" className="form-control" id="exampleInputEmail1" placeholder="Enter Rider Orders" value={riderCount}  onChange={(e)=>setRiderCount(e.target.value)} required/>
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
    )
}

export default AssignRider
