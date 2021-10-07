import React from 'react'
import { useState, useEffect } from "react";
import ReactDom from 'react-dom'
import fetchSlots from '../Fetchslots';
import SearchSlots from '../SearchSlots';
import AvailableSlots from '../AvailableSlots'
import { cleanup, findByTestId, findByTitle, getByTestId, getByText, render, screen, waitFor } from '@testing-library/react'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { act } from 'react-dom/test-utils';
import { fireEvent, getQueriesForElement, userEvent } from '@testing-library/dom';
import selectEvent from 'react-select-event';
import "@testing-library/jest-dom/extend-expect"

afterEach(cleanup)

const server = setupServer(
    rest.get("https://19be91bf2h.execute-api.eu-west-1.amazonaws.com/akpovesoa/clinics/*", (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([
                {
                    "startTime": "T09:00:00",
                    "endTime": "T09:30:00"
                },
                {
                    "startTime": "T10:00:00",
                    "endTime": "T10:30:00"
                },
                {
                    "startTime": "T11:00:00",
                    "endTime": "T11:30:00"
                },
                {
                    "startTime": "T12:00:00",
                    "endTime": "T12:30:00"
                },
                {
                    "startTime": "T13:00:00",
                    "endTime": "T13:30:00"
                },
                {
                    "startTime": "T16:00:00",
                    "endTime": "T16:30:00"
                }
            ])
        )
    }
    ),

    rest.get("https://19be91bf2h.execute-api.eu-west-1.amazonaws.com/akpovesoa/clinics", (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([
                {
                    "clinicId": "clinic100",
                    "city": "London",
                    "country": "United Kingdom",
                    "streetAddress": "56, Haughton Rd",
                    "geoLocation": {
                        "lat": "51.555991",
                        "lon": "-0.225792"
                    }
                },
                {
                    "clinicId": "clinic102",
                    "city": "Belfast",
                    "country": "Northern Ireland",
                    "streetAddress": "36-40 Ann Street",
                    "geoLocation": {
                        "lat": "54.607621",
                        "lon": "-5.952800"
                    }
                },
                {
                    "clinicId": "clinic103",
                    "city": "Dublin",
                    "country": "Ireland",
                    "streetAddress": "Main St, Malahide (opposite the Garda station)",
                    "geoLocation": {
                        "lat": "53.329117",
                        "lon": "-6.225330"
                    }
                },
                {
                    "clinicId": "clinic104",
                    "city": "Waterford",
                    "country": "Ireland",
                    "streetAddress": "31 Barronstrand Street",
                    "geoLocation": {
                        "lat": "52.342243",
                        "lon": "-6.469092"
                    }
                },
                {
                    "clinicId": "clinic105",
                    "city": "Dublin",
                    "country": "Ireland",
                    "streetAddress": "40 O’Connell Street",
                    "geoLocation": {
                        "lat": "53.337100",
                        "lon": "-6.285903"
                    }
                }
            ])
        )
    }
    ),

    rest.get("https://19be91bf2h.execute-api.eu-west-1.amazonaws.com/akpovesoa/services", (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([
                {
                    "serviceId": "ser100",
                    "name": "Blow dry",
                    "price": 25.5,
                    "durationInMinutes": 30
                },
                {
                    "serviceId": "ser101",
                    "name": "Hydrafacial Skin Health",
                    "price": 150,
                    "durationInMinutes": 60
                },
                {
                    "serviceId": "ser102",
                    "name": "Derma Pen",
                    "price": 200,
                    "durationInMinutes": 150
                },
                {
                    "serviceId": "ser103",
                    "name": "JetPeel 3V",
                    "price": 150,
                    "durationInMinutes": 45
                },
                {
                    "serviceId": "ser104",
                    "name": "Obagi Blue Radiance Peel",
                    "price": 120,
                    "durationInMinutes": 30
                }
            ])
        )
    }
    )
);

beforeAll(() => server.listen())
afterAll(() => server.close())

afterEach(() => server.resetHandlers())


it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDom.render(<SearchSlots />, div)
})

// test select clinic
test('select clinic feature', async () => {

    render(<SearchSlots />)
    await act(() => selectEvent.select(screen.getByLabelText('clinic'), ['London']))
    let options = screen.getByTestId('form')
    expect(options).toHaveFormValues({ clinic: 'London' })
});


// test select service

//test select starting date
test('select start date feature', async () => {

    render(<SearchSlots />)
    const starting = screen.getByLabelText('Start time')
    fireEvent.change(starting, { target: { value: '2021-09-27' } })
    expect(starting.value).toBe('2021-09-27')
});

//test select end date
test('select start date feature', async () => {

    render(<SearchSlots />)
    const ending = screen.getByLabelText('End time')
    fireEvent.change(ending, { target: { value: '2021-10-27' } })
    expect(ending.value).toBe('2021-10-27')
});


//test available slots rendered
test('Display available slots', async () => {

    render(<SearchSlots />)
    // await screen.findByRole("paragraph")

    const starting = await screen.findByLabelText('Start time')
    const ending = await screen.findByLabelText('End time')
    const button = await screen.findByText('Search');

    fireEvent.change(starting, { target: { value: '2021-09-26' } })
    fireEvent.change(ending, { target: { value: '2021-10-27' } })

    fireEvent.click(button)

    const available = await screen.findByText('Available Bookings')

    expect(available).toHaveTextContent("Available Bookings")
});

