import React from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import RangeSlider from 'react-bootstrap-range-slider'

const SliderWithInputFormControl = ({min, max, step, value, onChange}) => {
  
    return (
        <>
        <Row>
          <Col xs="8">
            <RangeSlider
              min={min} max={max} step={step}
              value={Number(value)}
              onChange={onChange}
            />        
          </Col>
          <Col xs="4">
            <Form.Control value={value} onChange={onChange}/>
          </Col>
        </Row>
        </>
    );
  
  };

  export default SliderWithInputFormControl