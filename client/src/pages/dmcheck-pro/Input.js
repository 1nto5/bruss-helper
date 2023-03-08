import React, { useState } from 'react'

const Input = (props) => {
  
    const [input, setInput] = useState("")

    const handleChange = (e) => {
      setInput(e)
    };
  
    const handleSubmit = (e) => {
        if (e.keyCode === 13) {
          e.preventDefault()
          setInput("")
          props.onSubmit(input)
        }
      }  
    

  return (

    <div className="input-all">
        <input
          className='input-all--input'
          type="text"
          value={input}
          onChange={(event) => handleChange(event.target.value)}
          onKeyDown={handleSubmit}
          placeholder={props.placeholder}
          autoFocus
        />
    </div>

  )
}
export default Input
