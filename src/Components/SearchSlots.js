import React from 'react'
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Container, Row, Col, Form, FormGroup } from "reactstrap"
import AvailableSlots from './AvailableSlots';
import fetchSlots from './Fetchslots';
import 'bootstrap/dist/css/bootstrap.min.css'
import cleaner from './OrderDates';
import axios from 'axios'
import moment from 'moment';
import dayjs from 'dayjs';
import { placeholder } from '@babel/types';



const SearchSlots = () => {

    const [clinic, setClinic] = useState("select your item");
    const [service, setService] = useState("select your item");
    const [clinicList, setClinicList] = useState([]);
    const [serviceList, setServiceList] = useState([]);
    const [startDate, setstartDate] = useState("")
    const [endDate, setendDate] = useState("")
    const [slots, setSlots] = useState([]);
    const [multSlots, setMultSlots] = useState([]);
    const [showSlots, setShowSlots] = useState(false);
    var timeArray = []


    useEffect(() => {

        const getTasks = () => {

            fetchClinics();
            fetchServices();
            //fetchSlots();
        }
        getTasks();

    }, [])


    console.log(slots)

    const fetchClinics = () => {

        fetch('https://19be91bf2h.execute-api.eu-west-1.amazonaws.com/akpovesoa/clinics', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'x-api-key': 'G3SmBiCujc79kJYnqFUCaqGGd0aI68K9A8CXX4N1',
            },
        })
            .then((response) => response.json())
            .then((data) => setClinicList(data))
            .catch(error => console.log('Error while fetching:', error))

    }

    const fetchServices = () => {

        fetch('https://19be91bf2h.execute-api.eu-west-1.amazonaws.com/akpovesoa/services', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'x-api-key': 'G3SmBiCujc79kJYnqFUCaqGGd0aI68K9A8CXX4N1',
            },
        })
            .then((response) => response.json())
            .then((data) => setServiceList(data))
            .catch(error => console.log('Error while fetching:', error))

    }

    const fetchMult = () => {
        var dayjs = require('dayjs')
        var datesArray = []
        for (var dur = 1; dur < 6; dur++) {
            let newDate = dayjs(startDate).add(dur, 'day')
            let final = newDate.format('YYYY-MM-DD')
            //console.log(datesArray)
            datesArray.push(final)
        }
        fetchSlots(datesArray, clinic, service).then(data => {
            // console.log(data)
            setMultSlots(data)
            // console.log(multSlots)
        })
        // console.log(multSlots)
    }

    const putClinic = (e) => {
        setClinic(e.target.value)
        // console.log(clinic)
    }

    const putService = (e) => {
        setService(e.target.value)
        // console.log(service)
    }

    const submitItems = (e) => {
        e.preventDefault()
        // console.log("fetching data")

        //fetch data from api using the states
        setShowSlots(true)
        fetchMult();
    }

    return (
        <Container >

            <div>
                <h1>Filters</h1>
                <Form className="mainCont" onSubmit={submitItems}>

                    <Row>
                        <Col>
                            <FormGroup>
                                <select data-testid="clinic" value={clinic} onChange={putClinic} required>
                                    <option value="select your item">Select Clinic</option>
                                    {clinicList.map((val) => {
                                        return <option data-testid="clinic-option" key={val.clinicId} value={val.city}>{val.city}</option>
                                    })}
                                </select>
                            </FormGroup>

                        </Col>
                        <Col>
                            <FormGroup>

                                <select data-testid="service" value={service} onChange={putService} required>
                                    <option value="select your item">Select Service</option>
                                    {serviceList.map((val) => {
                                        return <option data-testid="service-option" key={val.serviceId} value={val.name}>{val.name}</option>
                                    })}

                                </select>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label htmlFor="start">Start time</label>
                            <input id="start" type="date" value={startDate} onChange={(e) => setstartDate(e.target.value)} min="1997-01-01" max="2030-12-31" placeholder="dd-mm-yyyy" required />

                            <label htmlFor="end">End time</label>
                            <input id="end" type="date" value={endDate} onChange={(e) => setendDate(e.target.value)} min={startDate} max="2030-12-31"
                                placeholder="dd-mm-yyyy"
                                required />
                            {console.log(startDate)}

                        </Col>

                    </Row>
                    <label htmlFor="save">Save your task</label>
                    <input id="save" type="submit" value="Save your task" className="btn btn-block" placeholder="save" />

                </Form>
            </div>
            <AvailableSlots display={showSlots} items={multSlots} clinicSelect={clinic} serviceSelect={service} />


        </Container>
    )
}

export default SearchSlots





