import React, { useState, useEffect } from 'react'

import { FlexibleXYPlot, XAxis, YAxis, HorizontalBarSeries, Hint } from  "react-vis"

function Explain({ explain, params }) {

    const [ values, setValues ] = useState([])

    const [ value, setValue ] = useState()

    useEffect(() => {
        var posshap= []
        var negshap = []
        for (let i=0; i < explain.length; i++) {
            var dictval = {}
            dictval.x = explain[i]["value"].toFixed(4)
            dictval.y = explain[i]["label"]
            var dictzero = {}
            dictzero.x = 0
            dictzero.y = explain[i]["label"]
            if (explain[i]["value"] > 0) {
            posshap.push(dictval)
            negshap.push(dictzero)
            } else {
            posshap.push(dictzero)
            negshap.push(dictval)
            }
        }
        setValues([posshap, negshap])
    }, [explain])

    const _forgetValue = () => {
        setValue(null)
      }

    const _rememberValue = value => {
    setValue(value)
    }



    return(
        <FlexibleXYPlot height={350} stackBy="x" yType="ordinal" margin={{'left':120, 'right':5, 'top':0,'bottom':50}}>
            <XAxis style={{strokeWidth: 1}}/>
            <YAxis style={{strokeWidth: 0}}/>
            <HorizontalBarSeries onValueMouseOver={_rememberValue} onValueMouseOut={_forgetValue} data={params.higherisbetter ? values[1] : values[0]} color="red" />
            <HorizontalBarSeries onValueMouseOver={_rememberValue} onValueMouseOut={_forgetValue} data={params.higherisbetter ? values[0] : values[1]} />
            {value ? <Hint value={value} /> : null}
        </FlexibleXYPlot>

    )
}

export default Explain