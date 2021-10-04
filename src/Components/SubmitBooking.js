import React from 'react'
import { FormControl } from 'react-bootstrap'
import { Button, Form, FormGroup,Input,Label,Output } from 'reactstrap'

function SubmitBooking(dateObj, startObj, endObj, clinicObj, serviceObj) {
    console.log(clinicObj)
    return (
        <div>
        <h6>{clinicObj}</h6>
        

        <Button varient="success" type="submit" block>Confirm Booking</Button>
        
        </div>
    )
}

export default SubmitBooking
