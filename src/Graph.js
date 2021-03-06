import React from 'react';
import { useState, useEffect } from 'react';
import { LineChart, Line, Tooltip, XAxis, YAxis } from 'recharts';
import { useMediaQuery } from 'react-responsive'
import './Graph.css';

function Graph(){
  const [number, setNumber] = useState(7);
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 })

  useEffect(() => {
    collatz(number, 0);
  }, []);

  const collatz = n => {
    if(n === '') {
      return;
    }
  
    let sequence = [];
    const collatzHelper = (n, count) => {
      sequence.push({ name: count.toString(), uv: n });
      if(n === 1) {
        return;
      }
      const nextNum = n % 2 === 0 ? n/2 : 3*n + 1;
      collatzHelper(nextNum, ++count);
    }
    collatzHelper(n, 0);

    return sequence;
  }

  const renderGraph = () => {
    const sequence = collatz(number);
    return(
    <LineChart width={isTabletOrMobile ? 320 : 800} height={isTabletOrMobile ? 300 : 600} data={sequence}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip content={<CustomTooltip />}/>
      <Line dot={false} dataKey="uv" stroke="#8884d8" />
    </LineChart>
    )
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className='iter'>{`Iteration: ${label}`}</p>
          <p className='value'>{`Value: ${payload[0].value}`}</p>
        </div>
      );
    }
  
    return null;
  };

  const handleInput = e => {
    const re = /^[0-9\b]+$/;
    if(e.target.value === '' || re.test(e.target.value)){
      setNumber(e.target.value);
    }
  }

  return (
    <div id='container'>
      <div id='message'>
        <h1>Collatz Conjecture</h1>
        <p>The Collatz Conjecture, also referred to as the <b><i>3n+1 conjecture</i></b> is a mathematical <i>conjecture </i> 
        (meaning mathematicians suspect it to be true but haven't been able to prove it yet) that is as follows:</p>
        <li>Start with any positive integer <i>n</i>.</li>
        <li>If n is odd, then multiply it by 3 and add 1.</li>
        <li>Otherwise, divide n by 2.</li>
        <p>Mathematicians hypothesize that following these rules will produce a sequence that always converges exactly to one.</p>
        <p>Go on and try it for yourself in the input box below!</p>
      </div>
      <div id='input'>
        <input type='number' value={number} onChange={handleInput}/>
      </div>
      <div id='graph'>
        {renderGraph()}
      </div>
    </div>
  )
}

export default Graph;