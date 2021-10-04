import React from 'react'
import Slots from './Slots'
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import {Row, Col, Container, Card, CardText, Button} from "reactstrap"
import { Modal} from 'react-bootstrap';
import SubmitBooking from './SubmitBooking';
import sortObject from './OrderDates';

function AvailableSlots({ display, items, clinicSelect, serviceSelect}) {
    // const myArray = items.timeSlot.timeslot

    const [show, setShow] = useState(false);
    const [dateSelect, setdateSelect] = useState("")
    const [start, setstart] = useState("")
    const [end, setend] = useState("")
    

    // console.log("items below")
    // console.log(items)
    var newObject = sortObject(items)
    
    // console.log(cleaner(items))
    let keys = Object.keys(newObject)
    // console.log(keys)

    const handleShow = (dateClick, startTimeClick, endTimeClick)=>{

        setShow(true)
        setdateSelect(dateClick)
        setstart(startTimeClick)
        setend(endTimeClick)
    }
 
    const handleClose = ()=>{
        setShow(false)    
    }

    const sendBooking = ()=>{
        console.log("POST")
        console.log("close the modal")
        console.log("rerout to new page shwoing booking complete")
    }

    return (
        <Container>
            {display ? <p data-testid ='available'>Available Bookings</p> : <p role= "paragraph">please select date</p>}
            {keys.map((date) => (
                <Row key={uuidv4()}>
                    <h5 >{date}</h5>
                    {newObject[date].map((time) => (
                        <Col key={uuidv4()} xs={6} md={6} lg={2}>
                            <Card body className="text-center">
                                <CardText>{time.startTime.slice(1, 6)}-{time.endTime.slice(1, 6)}</CardText>
                                <Button onClick={()=> handleShow(date, time.startTime.slice(1, 6), time.endTime.slice(1, 6))} data-testid="submitid" >Book Now</Button>
                            </Card>
                        </Col>
                    ))}

                </Row>
            ))}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>
                    Confirm Booking
                </Modal.Title>
                </Modal.Header>
                

                <Modal.Body>
                    <h5>{clinicSelect}</h5>
                    <h5>{serviceSelect}</h5>
                    <h5>{start}</h5>
                    <h5>{end}</h5>
                    <h5>{dateSelect}</h5>
                    <Button onClick={sendBooking}>Send</Button> 
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={handleClose}>Cancel Booking</Button>
                </Modal.Footer>
            </Modal>

        </Container>
        
    )
}

export default AvailableSlots
