import React, { useState, useEffect } from 'react'
import './App.css';

import { Container, Row, Col } from 'react-bootstrap'

import Inputs from './components/inputs'
import Prediction from './components/prediction'
import Explain from './components/explain'

function App() {

  const [ data, setData ] = useState([])
  const [ params, setParams ] = useState('the model')
  const [ prediction, setPrediction ] = useState()
  const [ explain, setExplain ] = useState({})


  useEffect(() => {
      fetch('/inputs')
      .then(res => res.json())
      .then(variables => {
          for(let i=0;i<=variables.length-1;i++) {
              variables[i]["value"] = (variables[i].type === "numeric") ? Math.round((variables[i].input.min+variables[i].input.max)/4) : Object.keys(variables[i].input)[1]
          } return(variables)
      }).then(setData)

      fetch('/parameters')
        .then(res => res.json())
        .then(setParams)
  }, [])


  const handleSubmit = (e) => {
      e.preventDefault()
      
      let inputs = {}
      for(let i=0;i<=data.length-1;i++) {
          inputs[data[i].name] = data[i].value
      }

      fetch('/predict', {
          method: 'post',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(inputs)
      }).then(res => res.json())
      .then(setPrediction)

      fetch('/explain', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(inputs)
      }).then(res => res.json())
      .then(setExplain)
  }

  const handleChange = (i, e) => {
      const value = e.target ? e.target.value : e.value
      let variables = [...data]
      variables[i]["value"] = value
      setData(variables)
      handleSubmit(e)
  }
  

  return (
    <div className="App">
      <Container>
        <Row>
          <Col md={6} style={{padding:"2rem 2rem"}}>
            <h4 className="form-title">Model Inputs</h4>
            <Inputs data={data} handleChange={handleChange}  handleSubmit={handleSubmit} />
          </Col>
          <Col md={6} style={{padding:"2rem 2rem"}}>
                <h4 className="form-title">Prediction</h4>
                <Prediction prediction={prediction} params={params}/>
                <h4 className="form-title">Why ?</h4>
                <Explain explain={explain} params={params}/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
