import React,{ useState, useEffect } from 'react';
import axios from "axios";



const CancelOrderTable = () => {
    const [showRecord, setRecord] = useState([]);
    const [orderNo, setOrderNo] = useState(null);


     const fetchOrder = () => {
    axios.get("https://api.khannburger.com/cancelRecordList.php").then((res) => {
    setRecord(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

useEffect(() => {
    fetchOrder();
  }, []);

  

  const DisplayRecord= ()=>{
  if(orderNo){
       return(
  showRecord.filter((item)=>item.OrderNum === orderNo).map((item) => {
    return (
      <tr>
       <td>{item.itemName}</td>
        <td>{item.itemID}</td>
        <td>{item.itemPrice}</td>
        <td>{item.Quantity}</td>
        <td>{item.Name}</td>
        <td>{item.Contact}</td>
        {/* <td>{items.ContactTwo}</td> */}
        <td>{item.Address}</td>
        {/* <td>{items.GST}</td> */}
        <td>{item.DateTime}</td>
        <td>{item.Time}</td>
        <td>{item.OrderNum}</td>

      </tr>
    );
  }))

  }

  else{
    return(
  showRecord.map((item) => {
    return (
      <tr>
       <td>{item.itemName}</td>
        <td>{item.itemID}</td>
        <td>{item.itemPrice}</td>
        <td>{item.Quantity}</td>
        <td>{item.Name}</td>
        <td>{item.Contact}</td>
        {/* <td>{items.ContactTwo}</td> */}
        <td>{item.Address}</td>
        {/* <td>{items.GST}</td> */}
        <td>{item.DateTime}</td>
        <td>{item.Time}</td>
        <td>{item.OrderNum}</td>

      </tr>
    );
  }))


  }
  
  } 
  




    return (
        <>
            <div className="content-wrapper"  style={{background:"white"}}>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-lg-12">
                <h1>Cancel Order Table</h1>
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
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">
                   Cancel Order Record
                    </h3>
                  </div>
                    
                    
                   

                  {/* /.card-header */}
                  <div className="card-body">
                  <div className="row">

                    <div className="col-md-4">
                    <div className="form-group">
                    <label htmlFor="" style={{fontFamily:"Lucida Console  Courier New monospace"}}>Search with Order No:</label>
                    <input type="text"  className="form-control form-control-sm" placeholder=""  value={orderNo} onChange={(e)=>{setOrderNo(e.target.value)}}style={{borderRadius:"7px"}}/>
                    </div> 
                      </div>
                    </div>
                    <table
                      id="example1"
                      className="table table-bordered table-striped table-responsive"
                    >
                      <thead>
                        <tr>
                          {/* <th>#</th> */}
                          <th>Item Name</th>
                          <th>Item (ID)</th>
                          <th>Item Price</th>
                          <th>Quantity</th>
                          <th>Name</th>
                          <th>Contact</th>
                          {/* <th>Contact#2</th> */}
                          <th>Address</th>
                          {/* <th>GST</th> */}
                          <th>Date</th>
                          <th>Time</th>
                          <th>Order#</th>
                          {/* <th>Action</th> */}
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
                         {/* <th><button type="button" className="btn btn-outline-info"onClick={TotalPrice}>Total Amount</button></th>
                         <td>{finalTotalAmount}</td> */}
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
        </>
    )
}

export default CancelOrderTable
