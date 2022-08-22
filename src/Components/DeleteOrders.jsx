
import React, { useState, useEffect} from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
toast.configure();

const DeleteOrders = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [date , setDate] = useState('');
  const [showRecord, setRecord] = useState([]);
const submitDelOrder =(e)=>{
  e.preventDefault();
  cancelRecord();
  DelOrder();
  toast.error("Order Canceled Successfully !");
  setInterval(() => {
    window.location.reload(true)
  }, 1500);
}
 
const FetchOrder = () =>{

 axios.get("https://api.khannburger.com/orderlist.php").then((res) => {
    setRecord(res.data);
      })
      .catch((error) => {
        console.log(error);
      });


}
const DelOrder = () =>{

 showRecord.filter((items)=>items.OrderNum === orderNumber && items.DateTime === date).map((items)=>{  
 axios.get("https://api.khannburger.com/deleteRecord.php?id="+items.id)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    })
     setOrderNumber({
      orderNumber:" "
    })
    setDate({
      date:" "
    })
}
 const cancelRecord =()=>{
  let today = new Date();
  let year = today.getFullYear();
  let mes = today.getMonth()+1;
  let dia = today.getDate();
  let fecha =year+"-"+mes+"-"+dia;

  let currentTime = new Date();
  let hours = currentTime.getHours();
  hours = (hours % 12) || 12;
  let minutes = currentTime.getMinutes();
  let seconds = currentTime.getSeconds();
  let time = hours+":"+minutes+":"+seconds;

    showRecord.filter((items)=>items.OrderNum === orderNumber && items.DateTime === date).map((items)=>{
       const CustomerData = {
      Name:items.itemName,
      ID:items.itemID,
      Price:items.itemPrice,
      Quantity:items.Quantity,
      CustomerName: items.Name,
      CustomerContact: items.Contact,
      // CustomerContactTwo:inputNumberTwo,
      CustomerAddress: items.Address,
      // GST:gst,
      date:items.DateTime,
      Time:time,
      order:items.OrderNum
    };
    axios.post("https://api.khannburger.com/cancelRecord.php", CustomerData)
    .then((res) => console.log(res.data))
    .catch((error) => console.log(error));
    })
  }

  
 useEffect(() => {
    FetchOrder();
  }, []);


  return (
    <div>
      <div className="content-wrapper" style={{background:"white"}}>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Delete Order</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    {/* <a href="/">Logout</a> */}
                  </li>
                  {/* <li className="breadcrumb-item active">General Form</li> */}
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              {/* left column */}
              <div className="col-md-8">
                {/* general form elements */}
                <div className="card card-danger">
                  <div className="card-header">
                    <h2>Delete Order</h2>
                  </div>
                  {/* /.card-header */}
                  {/* form start */}
                  <form onSubmit={submitDelOrder}>
                    <div className="card-body">
                      <div className="row">
                      
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">
                              Enter Order Number*
                            </label>
                            <input
                              type="number"
                              name="Item"
                              className="form-control"
                              id="exampleInputEmail1"
                              placeholder="Enter Order Number"
                              onChange={(e)=>setOrderNumber(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">
                              Date*
                            </label>
                            <input
                              type="text"
                              name="Date"
                              className="form-control"
                              id="exampleInputEmail1"
                              placeholder="Enter Date"
                              onChange={(e)=>setDate(e.target.value)}
                              required
                            />
                          </div>
                        </div>



                      </div>
                    </div>
                    {/* /.card-body */}
                    <div className="card-footer">
                      <button type="submit" className="btn btn-outline-danger">
                      Delete Order
                      </button>
                       {/* <button type="submit" onClick={updateData}className="btn btn-outline-danger float-right">
                        Update
                      </button> */}
                    </div>
                  </form>
                </div>
                {/* /.card */}
              </div>

              {/* <div className="col-md-4">
               <div className="card card-primary card-outline">
              <div className="card-header">
                <h5 className="m-0">Featured</h5>
              </div>
              <div className="card-body">
                <h6 className="card-title">Special title treatment</h6>
                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
              </div>
            </div>
            </div> */}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DeleteOrders;












  

  









