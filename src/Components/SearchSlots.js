import React from 'react'
import { useState, useEffect } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap"
import AvailableSlots from './AvailableSlots';
import Select from 'react-select'
import fetchSlots from './Fetchslots';
import 'bootstrap/dist/css/bootstrap.min.css'

const SearchSlots = () => {
    const [clinic, setClinic] = useState("select your item");
    const [service, setService] = useState("select your item");
    const [clinicList, setClinicList] = useState([]);
    const [serviceList, setServiceList] = useState([]);

    const [startDate, setstartDate] = useState("")
    const [endDate, setendDate] = useState("")
    const [multSlots, setMultSlots] = useState([]);
    const [showSlots, setShowSlots] = useState(false);


    useEffect(() => {
        let unmounted = false;
        const getTasks = () => {

            fetchClinics();
            fetchServices();      
        }
        if (!unmounted) {
            getTasks();
        }
        return () => {
            unmounted = true;
        };
    }, [])

    const fetchClinics = () => {
        fetch('https://19be91bf2h.execute-api.eu-west-1.amazonaws.com/akpovesoa/clinics', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'x-api-key': 'G3SmBiCujc79kJYnqFUCaqGGd0aI68K9A8CXX4N1',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                const newLin = data.map((val) => {
                    var opt = { id: "", value: "", label: "", address: "" }
                    opt.value = val.city
                    opt.label = val.city
                    opt.id = val.clinicId
                    opt.address = val.streetAddress
                    return opt
                })
                setClinicList(newLin)
            })
            .catch(error => console.log('Error while fetching:', error))
    }

    const fetchServices = () => {
        fetch('https://19be91bf2h.execute-api.eu-west-1.amazonaws.com/akpovesoa/services', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'x-api-key': 'G3SmBiCujc79kJYnqFUCaqGGd0aI68K9A8CXX4N1',
            },
        }).then((response) => response.json())
            .then((data) => {
                const newLin = data.map((val) => {
                    var opt = { id: "", value: "", label: "" }
                    opt.value = val.name
                    opt.label = val.name
                    opt.id = val.serviceId
                    return opt
                })
                setServiceList(newLin)
            })
            .catch(error => console.log('Error while fetching:', error))
    }

//fetching all available dates for duration selected
    const fetchMult = () => {
        var dayjs = require('dayjs')
        var start = dayjs(startDate)
        var stop = dayjs(endDate)
        const days = stop.diff(start, 'days')
        var datesArray = []
        for (var dur = 0; dur <= days; dur++) {
            let newDate = dayjs(startDate).add(dur, 'day')
            let final = newDate.format('YYYY-MM-DD')
            datesArray.push(final)
        }
        fetchSlots(datesArray, clinic, service).then(data => {
            setMultSlots(data)
        })
    }

    const putClinic = (e) => {
        setClinic(e)
    }

    const putService = (e) => {
        setService(e)
    }

    const submitItems = (e) => {
        e.preventDefault()
        setShowSlots(true)
        fetchMult();
    }

    return (
        <Container >
            <Container className="div-filter" >
                <Row >
                    <Col md={{ span: 3, offset: 3 }}>
                        <h3>Filters</h3>
                    </Col>
                </Row>
                <Form data-testid="form" className="filters-form w-50 p-3 " onSubmit={submitItems}>
                    <Row>
                        <Col lg={true}>
                            <FormGroup>
                                <div className="clinic-service-div filter-above">
                                    <label htmlFor="clinic">Clinic</label>
                                    <Select data-testid="clinic" options={clinicList} name="clinic" inputId="clinic" onChange={putClinic} />
                                </div>
                            </FormGroup>
                        </Col>
                        <Col lg={true}>
                            <FormGroup>
                                <div className="clinic-service-div filter-above">
                                    <label htmlFor="service">Service</label>
                                    <Select name="service" data-testid="service" options={serviceList} onChange={putService} inputId="service" />
                                </div>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="date-box" lg={true}>
                            <FormGroup>
                                <div className="filter-above">
                                    <label htmlFor="start">Start time</label><br />
                                    <input className="date" id="start" type="date" value={startDate} onChange={(e) => setstartDate(e.target.value)} min="1997-01-01" max="2030-12-31" placeholder="dd-mm-yyyy" required />
                                </div>
                            </FormGroup>
                        </Col>
                        <Col className="date-box" lg={true}>
                            <FormGroup>
                                <div className="filter-above">
                                    <label htmlFor="end">End time</label> <br />
                                    <input className="date" id="end" type="date" value={endDate} onChange={(e) => setendDate(e.target.value)} min={startDate} max="2030-12-31"
                                        placeholder="dd-mm-yyyy"
                                        required />
                                </div>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Button id="save" type="submit" className="filter-above search-button" >
                        Search
                    </Button>
                </Form>
            </Container>
            <AvailableSlots display={showSlots} items={multSlots} clinicSelect={clinic} serviceSelect={service} />
        </Container>
    )
}

export default SearchSlots





