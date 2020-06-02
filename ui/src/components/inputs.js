import React from 'react'
import { Form, Row, Col} from 'react-bootstrap'

import SliderWithInputFormControl from './rangeslider'

function Inputs({ data, handleChange, handleSubmit }) {

    return(
        <Form onSubmit={handleSubmit}>
            {data.map((item,i) => (
                <Form.Group key={i} as={Row} >
                <Form.Label column sm={4}>{item.label}</Form.Label>
                <Col sm={8}>
                {(function() {
                    switch (item.type) {
                        case "numeric":
                        return <SliderWithInputFormControl min={item.input.min} max={item.input.max} step={item.input.step} value={item.value} onChange={e => handleChange(i,e)} />;
                        case "categorical":
                        return (
                            <Form.Control as="select" name={item.name}  value={item.value} onChange={e => handleChange(i,e)}>
                                {Object.keys(item.input).map((element) => 
                                    <option key={element}>{element}</option>
                                )}
                            </Form.Control>                        
                        )
                        default: 
                        return <Form.Control type="text" placeholder={item.label} />;
                    }
                })()}
                </Col>
                </Form.Group>
            ))}
        </Form>
    )

}

export default Inputs