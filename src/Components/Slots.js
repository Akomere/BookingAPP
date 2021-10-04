import { Button } from 'reactstrap';
import { Col } from "reactstrap"
import 'bootstrap/dist/css/bootstrap.min.css'

const Slots = (timeSlot) => {

    // console.log(timeSlot)
    
    return (
        <Col sm={true}>
            <Button color="secondary">{timeSlot.startTime} - {timeSlot.endTime}</Button>
            
        </Col>
    )
}

export default Slots




