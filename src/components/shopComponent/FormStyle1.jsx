import React from 'react'

const FormStyle1 = ({className}) => {
  return (
    <form className={className}>
      <p className="head">Log in</p>
      <div className="form-input">
        <input type="text" placeholder="Enter your name" />
        <input type="password" placeholder="Enter your password"/>
        <div className="checkbox">
          <input id="remember-user" type="checkbox"/>
          <label for="remember-user">Remember me</label>
        </div>
        <input type="submit" value="Submit"/>
        <p>Forget your password?<span> Click here</span></p>
      </div>
    </form> 
  )
}

export default FormStyle1