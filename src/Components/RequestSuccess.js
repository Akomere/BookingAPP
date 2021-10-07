
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



function RequestSuccess() {
  return (

    <div className="result-page">
      <img className="response-image " src="./images/check.png" alt="booked" />
      <h3>Booking successful!</h3>  <br />
      <a href="/">Return to Home</a>
    </div>
  )
}

export default RequestSuccess
