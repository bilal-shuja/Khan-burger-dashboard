import React, { useState, useEffect } from "react";
import axios from "axios";
import { AsyncStorage } from 'AsyncStorage';

import {Link } from 'react-router-dom';


const RegisterRiders = () => {


const [showRecord, setRecord] = useState([]);
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

useEffect(() => {
  SetLocalLogin();
}, [])
 

  const fetchRiderRecord = () => {
    axios.get("https://api.khannburger.com/fetchRiderRecord.php").then((res) => {
    setRecord(res.data);
    // console.log(res.data);  
      })
      .catch((error) => {
        console.log(error);
      });
  };


  useEffect(() => {
    
    fetchRiderRecord();
  }, []);



  const DisplayRecord = () => {
   
    return(
 
     showRecord.map((items) => {
    // const delRecord = () => {
    //   axios
    //     .get(
    //       "http://localhost:9000/khan-burger/deleteRecord.php?id=" + items.id
    //     )
    //     .then((res) => {
    //       console.log(res);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    //   toast.warn("Deleted Successfully!");
    //   setTimeout(() => {
    //     window.location.reload();
    //   }, 2000);
    // };
    return (
      <tr>
        {/* <td>{items.id}</td> */}
        <td>{items.RiderID}</td>
        <td>{items.RiderName}</td>
        <td>{items.RiderNumber}</td>
       {admin === 'Admin'?
        <td>
            <Link to={{pathname:`/UpdateRiders/`,Id:{id: items.RiderID}}}>
                <button className="btn btn-outline-primary"><i class="fas fa-edit"></i></button>
            </Link>
        </td>:null}
      </tr>
    );
  })
  )
  


}

  return (
    <div>
      <div className="content-wrapper" style={{background:"white"}}>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Registered Riders</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    {/* <a href="/">Logout</a> */}
                  </li>
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>

        {/*  <!-- Main content --> */}

        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">
                   Registered Riders Record
                    </h3>
                    
                  </div>
                 

                  {/* /.card-header */}
                  <div className="card-body">

                   {/* <div className="row">
                    <div className="col-md-4">
                    <div className="form-group">
                    <label htmlFor="" style={{fontFamily:"Lucida Console  Courier New monospace"}}>Search with Rider ID:</label>
                    <input type="text"  className="form-control form-control-sm" placeholder=""  value={riderID} onChange={(e)=>{setRiderID(e.target.value)}}style={{borderRadius:"7px"}}/>
                    </div> 
                    </div>

                     <div className="col-md-4">
                    <div className="form-group">
                    <label htmlFor="" style={{fontFamily:"Lucida Console  Courier New monospace"}}>Search with Date:</label>
                    <input type="text"  className="form-control form-control-sm" placeholder=""  value={date} onChange={(e)=>{setDate(e.target.value)}}style={{borderRadius:"7px"}}/>
                    </div>
                    </div>

                    <div className="col-md-4">
                     <div className="form-group">
                    <label htmlFor="" style={{fontFamily:"Lucida Console  Courier New monospace", color:"orange"}}>Search with Order:</label>
                    <input type="text" className="form-control form-control-sm" placeholder=""  value={orderNo} onChange={(e)=>{setOrderNo(e.target.value)}}style={{borderRadius:"7px"}}/>
                    </div>
                    </div>


                    </div> */}

                    <table
                      id="example1"
                      className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          {/* <th>#</th> */}
                          <th>Rider (ID)</th>
                          <th>Rider Name</th>
                          <th>Rider  Contact Numbers</th>
                          {/* <th>Date</th> */}
                           {admin === 'Admin'?<th>Action</th>:null}
                        </tr>
                      </thead>
                      <tbody>
                        {showRecord == null ? (
                          <div>no record</div>
                        ) : (
                          DisplayRecord()
                        )}
                      </tbody>
                     
                    </table>
                  </div>
                  {/* /.card-body */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RegisterRiders;

