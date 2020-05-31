import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col} from 'react-bootstrap'

import SliderWithInputFormControl from './rangeslider'

function Inputs() {

    const [ data, setData ] = useState([])



    useEffect(() => {
        fetch('/inputs')
        .then(res => res.json())
        .then(setData)
    }, [])


    return(
        <Form >
            {data.map((item,i) => (
                <Form.Group key={i} as={Row} >
                <Form.Label column sm={4}>{item.label}</Form.Label>
                <Col sm={8}>
                {(function() {
                    switch (item.type) {
                        case "radio":
                        return (
                            <>
                            {Object.keys(item.input).map((element) =>
                                <Form.Check key={element} inline label={element} type="radio" name={item.name} />
                            )}
                            </>
                        );
                        case "range":
                        // return <Form.Control type="range" min={item.input.min} max={item.input.max} step={item.input.step} />;
                        return <SliderWithInputFormControl min={item.input.min} max={item.input.max} step={item.input.step} />;
                        case "select":
                        return (
                            <Form.Control as="select" >
                                {Object.keys(item.input).map((element) => 
                                    <option key={element}>{element}</option>
                                )}
                            </Form.Control>
                        );
                        default: 
                        return <Form.Control type="text" placeholder={item.label} />;
                    }
                })()}
                </Col>
                </Form.Group>
            ))}
            <Button variant="primary" type="submit">
            Submit
            </Button>
        </Form>
    )

}

export default Inputs