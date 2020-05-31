import React, { useState } from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import RangeSlider from 'react-bootstrap-range-slider'

const SliderWithInputFormControl = ({min, max, step}) => {

    const [ value, setValue ] = useState(min);
  
    return (
        <>
        <Row>
          <Col xs="8">
            <RangeSlider
              min={min} max={max} step={step}
              value={value}
              onChange={e => setValue(Number(e.target.value))}
            />        
          </Col>
          <Col xs="4">
            <Form.Control value={value} onChange={e => setValue(Number(e.target.value))}/>
          </Col>
        </Row>
        </>
    );
  
  };

  export default SliderWithInputFormControl