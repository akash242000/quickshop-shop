
import React from 'react'
import  { useState } from 'react';

export default function MainSlider() {

  const [selectedValue, setSelectedValue] = useState(3);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  console.log(selectedValue)

  return (
    <div>
      <select name="" id="" onChange={handleChange} defaultValue={selectedValue}>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
      </select>
    </div>
  )
}
