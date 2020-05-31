import React from 'react';
import './App.css';

import Inputs from './components/inputs'

import { Container, Row, Col } from 'react-bootstrap'

function App() {

  // const [ prediction, setPrediction ] = useState(0)

  return (
    <div className="App">
      <Container>
        <Row>
          <Col md={6} style={{padding:"2rem 2rem"}}>
            <h4 className="form-title">Model Inputs</h4>
            <Inputs />
          </Col>
          <Col md={6} style={{padding:"2rem 2rem"}}>
                <h4 className="form-title">Prediction</h4>
                <h4 className="form-title">Why ?</h4>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
