import React, { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { Row, Col, Container, Card, CardText, Button } from "reactstrap"
import { Modal } from 'react-bootstrap';
import sortObject from './OrderDates';
import axios from 'axios'

function AvailableSlots({ display, items, clinicSelect, serviceSelect }) {

    const [show, setShow] = useState(false);
    const [dateSelect, setdateSelect] = useState("")
    const [start, setstart] = useState("")
    const [end, setend] = useState("")
    const [isMounted, setIsMounted] = useState(false);
    var newObject = sortObject(items)
    let keys = Object.keys(newObject)


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
    }
    return (
        <div>
            <div className="text-center ">
                {display ? <p className="p-2 bg-light border rounded-3 available-booking" data-testid='available'>Available Bookings</p> : <p className="p-2 bg-light border rounded" role="paragraph">Please select dates</p>}
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
                    <Modal className="modal-box modal-fullscreen-sm-down" show={show} onHide={handleClose} centered >
                        <Modal.Header closeButton className="confirm-header-footer">
                            <Modal.Title>
                                <h5>Your Booking</h5>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="popup-result">
                            <h6>Service: <p>{serviceSelect.value}</p></h6>
                            <h6>Clinic: <p>{clinicSelect.value}</p></h6>
                            <h6>Address: <p>{clinicSelect.address}</p></h6>
                            <h6>Date: <p>{dateSelect}</p></h6>
                            <h6>From: <p>{start}</p></h6>
                            <h6>To: <p>{end}</p></h6>
                        </Modal.Body>
                        <Modal.Footer className="confirm-header-footer" >
                            <Button color="success" onClick={sendBooking}>Confirm Booking</Button>
                        </Modal.Footer>
                    </Modal>
            </Container>
        </div>
    )
}

export default React.memo(AvailableSlots)
