import React, { useState, useEffect } from "react";
import axios from "axios";
import {Link } from 'react-router-dom';
import { AsyncStorage } from 'AsyncStorage';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FoodItems = () => {
  const [APIData, setAPIData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    axios.get(`https://api.khannburger.com/list.php`).then((response) => {
      setAPIData(response.data);
    });
  }, []);



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


  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = APIData.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(APIData);
    }
  };

  // const selectItem =()=>{
  //   alert("This button is working broooooo");
  // }

 
  return (
    <>
      <div className="content-wrapper" style={{background:"white"}}>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-lg-12">
                <h1>Food Items Table</h1>
              </div>
              <div className="col-lg-12">
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
        <section className="d-flex content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Food Items Table</h3>
                  </div>

                  

                  {/* /.card-header */}
                  <div className="card-body">
                  <div className="row">
                    <div className="col-md-4">
                    <div className="form-group">
                      <label
                        htmlFor=""
                        style={{
                          fontFamily: "Lucida Console  Courier New monospace",
                          fontSize: "16px",
                        }}
                      >
                        Search with Item Name:
                      </label>
                      <input
                        type="text"
                       className="form-control form-control-sm"
                       placeholder="Search..."
                        onChange={(e) => searchItems(e.target.value)}
                    
                        style={{ borderRadius: "7px" }}
                      />
                    </div>
                    </div>
                  </div>

                    <table
                      id="example1"
                      className="table table-bordered table-striped table-sm"
                    >
                      <thead>
                        <tr>
                          {/* <th>#</th> */}
                          <th>#</th>
                          <th>Item (ID)</th>
                          <th>Item Name</th>
                          <th>Item Price</th>  
                          <th>Edit</th>
                            <th>Delete</th>
                          {/* <th>Select ID</th> */}
                        </tr>
                      </thead>

                      <tbody>
                      {searchInput.length > 1? filteredResults.sort((a,b)=> {return a.uid - b.uid}).map((item) => {
                        
                const DelRecord=()=>{
                
                    axios.get(`https://api.khannburger.com/deleteFoodItems.php?id=`+item.itemID)
                  .then((res) => {
                                console.log(res);
                              })
                              .catch((error) => {
                                console.log(error);
                              });
                            toast.error("Deleted Successfully!");
                            setTimeout(() => {
                              window.location.reload();
                            }, 2000);

                }
              return (
                <tr>
                  {/* <td>{items.id}</td> */}
                  <td>{item.uid}</td>
                  <td>{item.itemID}</td>
                  <td>{item.itemName}</td>
                  <td>{item.itemPrice}</td>

                 
                  <td>
                  <Link to={{pathname:`/UpdateItemForm/`,ID:{id: item.itemID}}}>
                  <button className="btn btn-outline-success"><i class="fas fa-edit"></i></button>
                  </Link>
                  </td>
                     
                    <td>
                    <button
                    className="btn btn-outline-danger"
                    onClick={
                      DelRecord
                      // cancelRecord();
                    }
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                  </td>

                  {/* <td><button className="btn btn-outline-info"><i class="fa fa-check" aria-hidden="true"></i></button></td> */}
                </tr>
              );
            })
          : APIData.sort((a,b)=> {return a.uid - b.uid}).map((item) => {
              const DelRecord=()=>{
                
                    axios.get(`https://api.khannburger.com/deleteFoodItems.php?id=`+item.itemID)
                  .then((res) => {
                                console.log(res);
                              })
                              .catch((error) => {
                                console.log(error);
                              });
                            toast.error("Deleted Successfully!");
                            setTimeout(() => {
                              window.location.reload();
                            }, 2000);

                }
              return (
                <tr>
                  {/* <td>{items.id}</td> */}
                   <td>{item.uid}</td>
                  <td>{item.itemID}</td>
                  <td>{item.itemName}</td>
                  <td>{item.itemPrice}</td>
                 
                  <td>
                   <Link to={{pathname:`/UpdateItemForm/`,ID:{id: item.itemID}}}>
                     <button className="btn btn-outline-success"><i class="fas fa-edit"></i></button>
                    </Link>
                  </td>
                  
                  <td>
                  <button
                    className="btn btn-outline-danger"
                    onClick={
                       DelRecord
                      // cancelRecord();
                    }
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                  </td>
                   {/* <td>
                   <button  className="btn btn-outline-info"><i className="fa fa-check" aria-hidden="true"></i></button>
                   </td> */}
                </tr>
              );
            })}
                      </tbody>

                      {/* <tfoot>
                        <tr>
                         <th><button type="button" className="btn btn-outline-info"onClick={TotalPrice}>Total Amount</button></th>
                         <td>{finalTotalAmount}</td>
                        </tr>
                      </tfoot> */}
                    </table>
                  </div>
                  {/* /.card-body */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default FoodItems;
