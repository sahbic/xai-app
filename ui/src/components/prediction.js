import React from 'react'

function Prediction({ prediction, params }) {

    function getStyle() {
        if (params.higherisbetter) {
            if (prediction >= params.threshold) {
                return("good-prediction")
            }
            else {
                return("bad-prediction")
            }
        }
        else {
            if (prediction > params.threshold) {
                return("bad-prediction")
            }
            else {
                return("good-prediction")
            }
        }
    }

    return(
        <>
            <p style={{paddingLeft: "20px"}}>The probability of <b>{params.probability}</b> is</p>
            <div className="prediction-module">
                {prediction ? <p className={getStyle()}>{Math.round(prediction * 100)} %</p> : <p className="no-prediction">00 %</p> }
            </div>
        </>
    )
}

export default Prediction