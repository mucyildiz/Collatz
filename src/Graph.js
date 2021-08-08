import React from 'react';
import { useState, useEffect } from 'react';
import { LineChart, Line, Tooltip, XAxis, YAxis } from 'recharts';
import './Graph.css';

function Graph(){
  const [number, setNumber] = useState(7);

  useEffect(() => {
    getCollatzSequence(number, 0);
  }, []);

  const getCollatzSequence = (n) => {
    const data = [];
    data.push({ name: 0, uv: n });
    let i = n;
    let count = 0;
    while (i > 1) {
      count++;
      if (i % 2 === 0) {
        i = i / 2;
      } else {
        i = i * 3 + 1;
      }
      data.push({name: count.toString(), uv: i});
    }
    return data;
  }

  const renderGraph = () => {
    const sequence = getCollatzSequence(number);
    return(
    <LineChart width={800} height={500} data={sequence}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Line dot={false} dataKey="uv" stroke="#8884d8" />
    </LineChart>
    )
  }

  const handleInput = e => {
    const re = /^[0-9\b]+$/;
    if(e.target.value === '' || re.test(e.target.value)){
      setNumber(e.target.value);
    }
  }

  return (
    <div id='container'>
      <div id='graph'>
        {renderGraph()}
      </div>
      <div id='input'>
        <input type='number' value={number} onChange={handleInput}/>
      </div>
      <div id='message'>
        Remember the number must be greater than 0.
      </div>
    </div>
  )
}

export default Graph;