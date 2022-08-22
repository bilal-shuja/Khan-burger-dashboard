import { React, useRef } from "react";
import Record from "./Record";
import ReactToPrint from "react-to-print";

const RecordFunction = () => {
  let componentRef = useRef();

  return (
    <div >
    <div className="row">
    <div className="col-md-12">
      <div className="gy-4">
      <div className="d-flex justify-content-end ">
      <ReactToPrint
          trigger={() => (
            <button
              type="print"
              rel="noopener"
              target="_blank"
              className="btn btn-success"
            >
              <i className="fas fa-print" /> Print
            </button>
          )}
          content={() => componentRef}
        />
      </div>
    </div>
    </div>
    </div>
      <Record ref={(el) => (componentRef = el)} />
  </div>

  );
};

export default RecordFunction;
