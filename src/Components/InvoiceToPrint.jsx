import React, { Component } from "react";
import logo from './KBR.jpeg';


class InvoiceToPrint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemData: []
    }
  }

  componentDidMount() {
    const itemArr = this.props.ItemOrder;
    this.setState({ itemData: itemArr });
  }
 
// Total = () =>{
//   const itemArr = this.props.ItemOrder;
//   var sum = itemArr.itemPrice.reduce(function(a, b){
//         return a + b;
//     }, 0);
//     console.log(sum)
// }


  render() {
    const date = new Date();
    const customName = this.props.CustomName;
    const customNumber = this.props.CustomNumber;
    const customAddress = this.props.CustomAddress;
    const totalProdPrice = this.props.TotalPrice;
    const totalArrPrice = this.props.TotalAmountfromArr;
    const DeliveryCharges = this.props.DeliveryCharges;
    // const GstCharges = this.props.GstCharges;
    const uniqID = this.props.uniqID;
    const orderNum = this.props.orderNum;
    const ridersNote = this.props.ridersNote;
    // const Quantity = this.props.Quantity;
    
   
    return (

      <>
        <div>
          <div className="row" style={{marginLeft:"14px"}}>
            <div className="col-4">
                <img src={logo} alt="" style={{height:"90px", borderRadius:"50px",marginLeft:"-0.8em"}}/> 
            <h5  style={{fontWeight:"Bold"}}>System No:{uniqID}</h5>
               <h5  style={{fontWeight:"Bold"}} className="d-flex justify-content-left">Order No:{orderNum}</h5>
              <h4  style={{fontWeight:"Bold"}}>
                {/* <i className="fas fa-globe" /> */}
                <br />
                Khan Burger Delivery
                <div className="row" style={{marginLeft:"2px"}}>
                  <th style={{fontSize:"20px"}}>Ph#(0301-4999983) </th>
                  <th style={{fontSize:"20px"}}>Ptcl#(042-36633762-63-4) </th>
                  <th style={{fontSize:"20px"}}>Zarrar Shaheed Road,Guldusht Town Lahore </th>
                </div>
                <br />
                {/* <small className="me-right">Date: {date.toDateString()}</small>  */}
                 <small className="me-right" style={{fontWeight:"Bold"}}>Date/Time: {date.toLocaleString()}</small>
              </h4>
            </div>
            {/* /.col */}
            

          </div>

          <div className="row" style={{marginLeft:"14px"}}>
          <div className="col-4">
            
                <div>
                  <p className="lead">
                    <b style={{fontWeight:"Bold",/*fontFamily:"Cambria"*/}}>Name: {customName}</b><br/>
                    <b style={{fontWeight:"Bold"}}>Contact: {customNumber}</b>
                  </p>
                  <p className="lead">
                    {" "}
                    <b style={{fontWeight:"Bold"}}>Address: {customAddress}</b>
                  </p>
                      <p className="lead">
                    {" "}
                    <b style={{fontWeight:"Bold"}}>Riders Note:</b> <b style={{textDecorationLine: 'underline'}}>*{ridersNote}*</b>
                  </p>
                </div>
            
            </div>
          
          </div>
          {/* Table row */}
          <div className="row" style={{marginLeft:"10px"}}>
            <div className="col-5 table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    {/* <th>item ID#</th> */}
                    <th style={{fontSize:"20px"}}>Product</th>
                    <th style={{fontSize:"20px"}}>Qty</th>
                    <th style={{fontSize:"20px"}}>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.itemData.map((item, index) => (
                    <tr key={item.id}>
                      {/* <td>{item.itemID}</td> */}
                      <td style={{fontWeight:"Bold", fontSize:"20px"}}>{item.itemName}</td>
                      <td style={{fontWeight:"Bold",fontSize:"20px"}}>{item.Quantity}</td>
                      <td style={{fontWeight:"Bold",fontSize:"20px"}}>{item.itemPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
          <div className="row" style={{marginLeft:"14px"}}>
            
            
      
            {/* /.col */}
            <div className="col-6">
              <div className="table-responsive">
                <table className="table">
                  <tbody>
                    <tr>
                  
                      <th style={{ width: "70%" ,fontSize:"20px"}}>Subtotal:</th>
                      <td style={{fontWeight:"Bold",fontSize:"20px"}}>{totalArrPrice}</td>
                    </tr>

                    {/* <tr>
                    <th>GST TAX#:</th>
                    <td style={{fontWeight:"Bold"}}>{GstCharges}</td>
                    </tr> */}
                    
                    <tr>
                      <th  style={{fontSize:"20px"}}>Delivery Charges:</th>
                      <td style={{fontWeight:"Bold",fontSize:"20px"}}>{DeliveryCharges}</td>
                    </tr>
                    <tr>
                      <th  style={{fontSize:"20px"}}>Total:</th>
                        {totalProdPrice == null?<td>0</td>:<td style={{fontWeight:"Bold",fontSize:"20px"}}>{(totalArrPrice)+ +(DeliveryCharges)}</td>}
                    </tr>
                  </tbody>
                </table>
                <div className="col-12">
                <th style={{fontSize:"20px"}}>Thank you for Ordering from KBR </th><br/>
                  <th style={{fontSize:"20px"}}>Developed by Alphanites Pvt ltd.(03320424661)</th>
              </div>
                {/* <h2>Developed By US-SOFTS</h2> */}
              </div>
            </div>
            {/* /.col */}

          </div>
        </div>
      </>

     
    );
  }
}


export default InvoiceToPrint;
