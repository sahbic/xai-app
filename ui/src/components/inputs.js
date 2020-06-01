import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col} from 'react-bootstrap'

import SliderWithInputFormControl from './rangeslider'

function Inputs() {

    const [ data, setData ] = useState([])
    const [ prediction, setPrediction ] = useState(0)


    useEffect(() => {
        fetch('/inputs')
        .then(res => res.json())
        .then(variables => {
            for(let i=0;i<=variables.length-1;i++) {
                variables[i]["value"] = (variables[i].type === "numeric") ? variables[i].input.min : Object.keys(variables[i].input)[0]
            } return(variables)
        }).then(setData)
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault()
        
        let inputs = {}
        for(let i=0;i<=data.length-1;i++) {
            inputs[data[i].name] = data[i].value
        }
        console.log(inputs)
        fetch('/predict', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(inputs)
        }).then(res => res.json())
        .then(setPrediction)
        console.log(prediction)
    }

    const handleChange = (i, e) => {
        const value = e.target ? e.target.value : e.value
        let variables = [...data]
        variables[i]["value"] = value
        setData(variables)
      }


    return(
        <Form onSubmit={handleSubmit}>
            {data.map((item,i) => (
                <Form.Group key={i} as={Row} >
                <Form.Label column sm={4}>{item.label}</Form.Label>
                <Col sm={8}>
                {(function() {
                    switch (item.type) {
                        // case "radio":
                        // return (
                        //     <>
                        //     {Object.keys(item.input).map((element) =>
                        //         <Form.Check key={element} inline label={element} type="radio" name={item.name} />
                        //     )}
                        //     </>
                        // );
                        case "numeric":
                        // return <Form.Control type="range" min={item.input.min} max={item.input.max} step={item.input.step} />;
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
            <Button variant="primary" type="submit">Submit</Button>
        </Form>
    )

}

export default Inputs