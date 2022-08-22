import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { AsyncStorage } from 'AsyncStorage';
import {Link } from 'react-router-dom';



 

const DinInTableRecord = () => {
  const [showRecord, setRecord] = useState([]);
  const [date, setDate] = useState(null);
  const [contact, setContact] = useState(null);
  const [finalTotalAmount, setFinalTotalAmount] = useState([]);
  const [orderNum, setOrderNum] = useState("");

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

  const TotalPrice = (e) => {
    if (!date) {
      const totalPrice = showRecord.reduce(function (
        accumulator,
        currentValue
      ) 
      {
        return accumulator+ +currentValue.itemPrice;
      },
      0);
      setFinalTotalAmount(totalPrice);
    } 
    else if (date) {
      const totalPrice = showRecord
        .filter((item) => item.DateTime === date)
        .reduce(function (accumulator, currentValue) {
          return accumulator+ +currentValue.itemPrice;
        }, 0);
      setFinalTotalAmount(totalPrice);
    }
    else{
      const totalPrice = showRecord.reduce(function (
        accumulator,
        currentValue
      ) {
        return accumulator+ +currentValue.itemPrice;
      },
      0);
      setFinalTotalAmount(totalPrice);

    }
    
  };

  const fetchOrder = () => {
    axios
      .get("https://api.khannburger.com/DinInRecord.php")
      .then((res) => {
        setRecord(res.data);
        // console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const cancelRecord = (props) => {
    let today = new Date();
    let year = today.getFullYear();
    let mes = today.getMonth() + 1;
    let dia = today.getDate();
    let fecha = year + "-" + mes + "-" + dia;

    let currentTime = new Date();
    let hours = currentTime.getHours();
    hours = hours % 12 || 12;
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();
    let time = hours + ":" + minutes + ":" + seconds;

    showRecord
      .filter((items) => items.id === props.id)
      .map((items) => {
        const CustomerData = {
          Name: items.itemName,
          ID: items.itemID,
          Price: items.itemPrice,
          Quantity: items.Quantity,
          CustomerName: items.Name,
          CustomerContact: items.Contact,
          // CustomerContactTwo:inputNumberTwo,
          CustomerAddress: items.Address,
          // GST:gst,
          date: items.DateTime,
          Time: time,
          order: items.OrderNum,
        };
        axios
          .post("https://api.khannburger.com/cancelRecord.php", CustomerData)
          .then((res) => console.log(res.data))
          .catch((error) => console.log(error));
      });
  };

  useEffect(() => {
    TotalPrice();
    fetchOrder();
    SetLocalLogin();
  
  }, []);

  const DisplayRecord = () => {
    if (date !== null || contact !== null) {
      if (date !== null && contact === null) {
        return showRecord
          .filter((item) => item.DateTime === date)
          .map((items) => {
            const delRecord = () => {
              axios
                .get(
                  "https://api.khannburger.com/deleteRecord.php?id=" + items.id
                )
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
            };
            return (
              <tr>
                <td>{items.id}</td>
                <td>{items.itemName}</td>
                <td>{items.itemID}</td>
                <td>{items.itemPrice}</td>
                <td>{items.Quantity}</td>
                <td>{items.Name}</td>
                <td>{items.Contact}</td>
                {/* <td>{items.ContactTwo}</td> */}
                {/* <td>{items.Address}</td> */}
                {/* <td>{items.GST}</td> */}
                <td>{items.DateTime}</td>
                <td>{items.Time}</td>
                <td>{items.OrderNum}</td>
                {admin === 'Admin'?   
                <td>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => {
                      delRecord();
                      cancelRecord(items);
                    }}
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </td> : null}
              
               {admin === 'Admin'?
                <td>
                <Link to={{pathname:`/UpdateIndRecord/`,itemData:{id:items.id}}}>
                <button  className="btn btn-outline-success"><i className="fas fa-pen-alt"></i></button>
                </Link>
                </td>:null}

              </tr>
            );
          });
      } else if (date === null && contact !== null) {
        return showRecord
          .filter((item) => item.Contact === contact)
          .map((items) => {
            const delRecord = () => {
              axios
                .get(
                  "https://api.khannburger.com/deleteRecord.php?id=" + items.id
                )
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
            };
            return (
              <tr>
                <td>{items.id}</td>
                <td>{items.itemName}</td>
                <td>{items.itemID}</td>
                <td>{items.itemPrice}</td>
                <td>{items.Quantity}</td>
                <td>{items.Name}</td>
                <td>{items.Contact}</td>
                {/* <td>{items.ContactTwo}</td> */}
                {/* <td>{items.Address}</td> */}
                {/* <td>{items.GST}</td> */}
                <td>{items.DateTime}</td>
                <td>{items.Time}</td>
                <td>{items.OrderNum}</td>

                 {admin === 'Admin'?   <td>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => {
                      delRecord();
                      cancelRecord(items);
                    }}
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </td>: null}

                 {admin === 'Admin'?          
                <td>
                <Link to={{pathname:`/UpdateIndRecord/`,itemData:{id:items.id}}}>
                <button  className="btn btn-outline-success"><i className="fas fa-pen-alt"></i></button>
                </Link>
                </td>:null}

              </tr>
            );
          });
      } else {
        return showRecord
          .filter((item) => item.DateTime === date && item.Contact === contact)
          .map((items) => {
            const delRecord = () => {
              axios
                .get(
                  "https://api.khannburger.com/deleteRecord.php?id=" + items.id
                )
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
            };
            <tr>
              <td>{items.id}</td>
              <td>{items.itemName}</td>
              <td>{items.itemID}</td>
              <td>{items.itemPrice}</td>
              <td>{items.Quantity}</td>
              <td>{items.Name}</td>
              <td>{items.Contact}</td>
              {/* <td>{items.ContactTwo}</td> */}
              {/* <td>{items.Address}</td> */}
              {/* <td>{items.GST}</td> */}
              <td>{items.DateTime}</td>
              <td>{items.Time}</td>
              <td>{items.OrderNum}</td>

            {admin === 'Admin'?   <td>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => {
                      delRecord();
                      cancelRecord(items);
                    }}
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </td>: null}

                 {admin === 'Admin'?        
                 <td>
                <Link to={{pathname:`/UpdateIndRecord/`,itemData:{id:items.id}}}>
                <button  className="btn btn-outline-success"><i className="fas fa-pen-alt"></i></button>
                </Link>
                </td>:null}
            </tr>;
          });
      }
    }
    else if (orderNum) {
      return (
        // showRecord.sort((a, b) => new Date(...a.DateTime.split('/').reverse()) - new Date(...b.DateTime.split('/').reverse())),
        showRecord
          .sort(
            (a, b) =>
              new Date(...b.DateTime.split("/").reverse()) -
              new Date(...a.DateTime.split("/").reverse())
          )
          .filter((items) => items.OrderNum === orderNum)
          .map((items) => {
            const delRecord = () => {
              axios
                .get(
                  "https://api.khannburger.com/deleteRecord.php?id=" + items.id
                )
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
            };
            return (
              <tr>
                <td>{items.id}</td>
                <td>{items.itemName}</td>
                <td>{items.itemID}</td>
                <td>{items.itemPrice}</td>
                <td>{items.Quantity}</td>
                <td>{items.Name}</td>
                <td>{items.Contact}</td>
                {/* <td>{items.ContactTwo}</td> */}
                {/* <td>{items.Address}</td> */}
                {/* <td>{items.GST}</td> */}
                <td>{items.DateTime}</td>
                <td>{items.Time}</td>
                <td>{items.OrderNum}</td>

               {admin === 'Admin'?   
               <td>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => {
                      delRecord();
                      cancelRecord(items);
                    }}
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </td>: null}

                 {admin === 'Admin'?    
                <td>
                <Link to={{pathname:`/UpdateIndRecord/`,itemData:{id:items.id}}}>
                <button  className="btn btn-outline-success"><i className="fas fa-pen-alt"></i></button>
                </Link>
                </td>:null}
              </tr>
            );
          })
      );
    } 
    else {
      return (
        // showRecord.sort((a, b) => new Date(...a.DateTime.split('/').reverse()) - new Date(...b.DateTime.split('/').reverse())),
        showRecord
          .sort(
            (a, b) =>
              new Date(...b.DateTime.split("/").reverse()) -
              new Date(...a.DateTime.split("/").reverse())
          )
          .map((items) => {
            const delRecord = () => {
              axios
                .get(
                  "https://api.khannburger.com/deleteRecord.php?id=" + items.id
                )
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
            };
            return (
              <tr>
                <td>{items.id}</td>
                <td>{items.itemName}</td>
                <td>{items.itemID}</td>
                <td>{items.itemPrice}</td>
                <td>{items.Quantity}</td>
                <td>{items.Name}</td>
                <td>{items.Contact}</td>
                {/* <td>{items.ContactTwo}</td> */}
                {/* <td>{items.Address}</td> */}
                {/* <td>{items.GST}</td> */}
                <td>{items.DateTime}</td>
                <td>{items.Time}</td>
                <td>{items.OrderNum}</td>

                 {admin === 'Admin'?   <td>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => {
                      delRecord();
                      cancelRecord(items);
                    }}
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </td>: null}

               {admin === 'Admin'?
                <td>
                <Link to={{pathname:`/UpdateIndRecord/`,itemData:{id:items.id}}}>
                <button className="btn btn-outline-success"><i className="fas fa-pen-alt"></i></button>
                </Link>
                </td>:null}

              </tr>
            );
          })
      );
    }
  };

  return (
    <div>
      <div className="content-wrapper"  style={{background:"white"}}>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-lg-12">
                <h1>Din-In Sales Table</h1>
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

        {/*  <!-- Main content --> */}

        <section className="d-flex content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="card ">
                  <div className="card-header">
                    <h3 className="card-title bg-cover">Din-In Sales Record</h3>
                    <br />
                  </div>
                  <div className="card-body">
                  
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label
                          htmlFor=""
                          style={{
                            fontFamily: "Lucida Console  Courier New monospace",
                         
                        
                          }}
                        >
                          Search with Date:
                        </label>
                        <input
                        className="form-control form-control-sm"
                          type="text"
                          placeholder=""
                          value={date}
                          onChange={(e) => {
                            setDate(e.target.value);
                          }}
                          style={{borderRadius:"10px"}}
                         
                        />
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="form-group ">
                        <label
                          htmlFor=""
                          style={{
                            fontFamily: "Lucida Console  Courier New monospace",
                           
                          }}
                        >
                          Search with Contact Number:
                        </label>
                        <input
                        className="form-control form-control-sm"
                          type="text"
                          placeholder=""
                          value={contact}
                          onChange={(e) => {
                            setContact(e.target.value);
                          }}
                           style={{borderRadius:"10px"}}
                        />
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="form-group ">
                        <label
                          htmlFor=""
                          style={{
                            fontFamily: "Lucida Console  Courier New monospace",
                           
                          }}
                        >
                          Order Number:
                        </label>
                        <input
                        className="form-control form-control-sm"
                          type="text"
                          placeholder=""
                          value={orderNum}
                          onChange={(e) => {
                            setOrderNum(e.target.value);
                          }}
                            style={{borderRadius:"10px"}}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                  {/* /.card-header */}
                  <div className="card-body">
                    <table
                      id="example1"
                      className="table table-bordered table-striped table-responsive">
                      <thead>
                      
                        <tr>
                          <th>#</th>
                          <th>Item Name</th>
                          <th>Item (ID)</th>
                          <th>Item Price</th>
                          <th>Quantity</th>
                          <th>Name</th>
                          <th>Contact</th>
                          {/* <th>Contact#2</th> */}
                          {/* <th>Address</th> */}
                          {/* <th>GST</th> */}
                          <th>Date</th>
                          <th>Time</th>
                          <th>Order#</th>
                          {admin === 'Admin' ? <th>Delete</th>: null}
                          {admin === 'Admin' ?<th>Update Individual Food Items</th>:null}
                         
                        </tr>
                      </thead>
                      <tbody>
                        {showRecord == null ? (
                          <div>no record</div>
                        ) : (
                          DisplayRecord()
                        )}
                      </tbody>
                      <tfoot>
                        <tr>
                          <th>
                            <button
                              type="button"
                              className="btn btn-outline-info"
                              onClick={() => TotalPrice()}
                            >
                            
                              Total Amount
                            </button>
                          </th>
                          <td>{finalTotalAmount}</td>
                        </tr>
                      </tfoot>
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



export default DinInTableRecord;
