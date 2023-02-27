import React, { useState } from 'react'

const Login = (props) => {
  
  const [persNumb, setPersNumb] = useState("")

  const handleChange = (e) => {
    setPersNumb(e)
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!persNumb || persNumb.length > 4 || persNumb[0] === '0') {
      setPersNumb("")
      props.errorUserLogin()
      return
    }
    props.userLogin(persNumb)
  }
  
  const handleClickNumber = (calcNum) => {
    setPersNumb(persNumb + calcNum.toString())
  }

  const handleClickClear = () => {
    setPersNumb("")
  }

  const handleClickBack = () => {
    setPersNumb(persNumb.slice(0, -1))
  }

  return (
    <div className="login">
      <form className='login--input-form' onSubmit={handleSubmit}>
        <input
          className='input-form--input'
          type="text"
          value={persNumb}
          onChange={(event) => handleChange(event.target.value)}
          placeholder="numer personalny"
          autoFocus
        />
      <button className='login--button' type="submit">zaloguj</button>
      <div className='login--calc'>
        <div>
          <button className='calc--button' type="button" onClick={() => handleClickNumber(1)}>1</button>
          <button className='calc--button' type="button" onClick={() => handleClickNumber(2)}>2</button>
          <button className='calc--button' type="button" onClick={() => handleClickNumber(3)}>3</button>
        </div>
        <div>
          <button className='calc--button' type="button" onClick={() => handleClickNumber(4)}>4</button>
          <button className='calc--button' type="button" onClick={() => handleClickNumber(5)}>5</button>
          <button className='calc--button' type="button" onClick={() => handleClickNumber(6)}>6</button>
        </div>
        <div>
          <button className='calc--button' type="button" onClick={() => handleClickNumber(7)}>7</button>
          <button className='calc--button' type="button" onClick={() => handleClickNumber(8)}>8</button>
          <button className='calc--button' type="button" onClick={() => handleClickNumber(9)}>9</button>
        </div>
        <div>
          <button className='calc--button' type="button" onClick={() => handleClickClear()}>C</button>
          <button className='calc--button' type="button" onClick={() => handleClickNumber(0)}>0</button>
          <button className='calc--button' type="button" onClick={() => handleClickBack(0)}>{"<"}</button>
        </div>
      </div>
      </form>
    </div>

  )
}
export default Login
