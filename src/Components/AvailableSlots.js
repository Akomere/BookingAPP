import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { Row, Col, Container, Card, CardText, Button } from "reactstrap"
import { Modal } from 'react-bootstrap';
import sortObject from './OrderDates';
import axios from 'axios'

function AvailableSlots({ display, items, clinicSelect, serviceSelect }) {
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

    const handleShow = (dateClick, startTimeClick, endTimeClick) => {

        setShow(true)
        setdateSelect(dateClick)
        setstart(startTimeClick)
        setend(endTimeClick)
    }

    const handleClose = () => {
        setShow(false)
    }

    const sendBooking = () => {

        const starting = `T${start}:00`
        const ending = `T${end}:00`

        const data = {
            "clinicId": clinicSelect.id,
            "serviceId": serviceSelect.id,
            "date": dateSelect,
            "startTime": starting,
            "endTime": ending
        }

        axios.post("https://19be91bf2h.execute-api.eu-west-1.amazonaws.com/akpovesoa/booking/create", data, {
            headers: {
                'x-api-key': 'G3SmBiCujc79kJYnqFUCaqGGd0aI68K9A8CXX4N1'
            }
        }).then((data) => {
            console.log(data)
            return window.location.href = "/RequestSuccess"

        }).catch((error) => {
            console.log(error)
            return window.location.href = "/RequestFail"
        })
        console.log("POST")
        console.log("close the modal")
        console.log("rerout to new page shwoing booking complete")
    }

    return (

        <div>
            <div className="text-center ">
                {display ? <p className="p-2 bg-light border rounded-3 available-booking" data-testid='available' >Available Bookings</p> : <p className="p-2 bg-light border rounded" role="paragraph">please select date</p>}
            </div>
            <Container >
                {keys.map((date) => (
                    <Row key={uuidv4()}>
                        <h5 className="list-title">{date}</h5>
                        {newObject[date].map((time) => (
                            <Col key={uuidv4()} xs={6} md={6} lg={2}>
                                <Card body className="booking-text">
                                    <CardText >{time.startTime.slice(1, 6)}-{time.endTime.slice(1, 6)}</CardText>
                                    <Button className="btn-light" onClick={() => handleShow(date, time.startTime.slice(1, 6), time.endTime.slice(1, 6))} data-testid="submitid" >Book Now</Button>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                ))}

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Your Booking
                        </Modal.Title>
                    </Modal.Header>


                    <Modal.Body className="popup-result">
                        <h5>Service: <p>{serviceSelect.value}</p></h5>
                        <h5>Clinic: <p>{clinicSelect.value}</p></h5>
                        <h5>address: <p>{clinicSelect.address}</p></h5>
                        <h5>Date: <p>{dateSelect}</p></h5>
                        <h5>From: <p>{start}</p></h5>
                        <h5>To: <p>{end}</p></h5>

                        <Button onClick={sendBooking}>Confirm Booking</Button>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={handleClose}>Cancel Booking</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>

    )
}

export default AvailableSlots
