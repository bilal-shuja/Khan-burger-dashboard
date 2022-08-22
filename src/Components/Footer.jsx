import React from 'react'

const Footer = () => {
    return (
        <div>
             <footer className="main-footer" style={{marginTop:"15em"}}>
            {/* To the right */}
            <div className="float-right d-none d-sm-inline">
            </div>
            {/* Default to the left */}
            <strong>Copyright © 2020-Onwards <a href="https://ussofts.netlify.app/">Alphanites Pvt ltd</a>.</strong> All rights reserved.
            </footer>
        </div>
    )
}

export default Footer
