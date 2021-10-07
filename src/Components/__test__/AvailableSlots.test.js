import React from 'react'
import { cleanup, render, screen, } from '@testing-library/react'
import { fireEvent } from '@testing-library/dom';
import AvailableSlots from '../AvailableSlots';
import "@testing-library/jest-dom/extend-expect"

afterEach(cleanup)

const MockParent = () => {
    const showSlots = true
    const multSlots = {
        "2021-10-01": [
            { startTime: 'T09:00:00', endTime: 'T09:30:00' },
            { startTime: 'T10:00:00', endTime: 'T10:30:00' },
            { startTime: 'T11:00:00', endTime: 'T11:30:00' },
            { startTime: 'T12:00:00', endTime: 'T12:30:00' }
        ],
        "2021-10-02": [
            { startTime: 'T09:00:00', endTime: 'T09:30:00' },
            { startTime: 'T10:00:00', endTime: 'T10:30:00' },
            { startTime: 'T11:00:00', endTime: 'T11:30:00' },
            { startTime: 'T12:00:00', endTime: 'T12:30:00' }
        ],
        "2021-10-03": [
            { startTime: 'T09:00:00', endTime: 'T09:30:00' },
            { startTime: 'T10:00:00', endTime: 'T10:30:00' },
            { startTime: 'T11:00:00', endTime: 'T11:30:00' },
            { startTime: 'T12:00:00', endTime: 'T12:30:00' }
        ],
        "2021-10-04": [
            { startTime: 'T09:00:00', endTime: 'T09:30:00' },
            { startTime: 'T10:00:00', endTime: 'T10:30:00' },
            { startTime: 'T11:00:00', endTime: 'T11:30:00' },
            { startTime: 'T12:00:00', endTime: 'T12:30:00' }
        ],
        "2021-10-05": [
            { startTime: 'T09:00:00', endTime: 'T09:30:00' },
            { startTime: 'T10:00:00', endTime: 'T10:30:00' },
            { startTime: 'T11:00:00', endTime: 'T11:30:00' },
            { startTime: 'T12:00:00', endTime: 'T12:30:00' }
        ]
    }

    const clinic = {
        id: 'clinic102',
        value: 'Belfast',
        label: 'Belfast',
        address: '36-40 Ann Street'
    }

    const service = {
        id: 'ser101',
        value: 'Hydrafacial Skin Health',
        label: 'Hydrafacial Skin Health'
    }
    return <AvailableSlots display={showSlots} items={multSlots} clinicSelect={clinic} serviceSelect={service} />
}

test('should render Book Now buttons', () => {
    render(<MockParent />)
    let bookButton = screen.getAllByText('Book Now')
    expect(bookButton[0]).toHaveTextContent('Book Now')
})

test('should render Booking Confirmation page', async () => {
    render(<MockParent />)
    let bookButton = screen.getAllByText('Book Now')
    expect(bookButton[0]).toHaveTextContent('Book Now')
    fireEvent.click(bookButton[0])
    let newDisplay = await screen.findByText('Your Booking')
    expect(newDisplay).toHaveTextContent('Your Booking')
})
