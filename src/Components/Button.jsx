import React from 'react'
import '../Styles/Button.css'

const Button = ({ onClick, value }) => {
  return (
    <button className='button' onClick={onClick}>{value}</button>
  )
}

export default Button
