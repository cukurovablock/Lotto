import React from 'react'
import "../style/ruleBox.css"

function RuleBox({image,rule}) {
  return (
    <div className='w-52 mx-auto my-2'>
      <div className='box rounded-2xl row'>
        <div className="col-3 p-0 flex items-center justify-center bg-ruleBox2 rounded-s-xl">
            <img className='ruleImg ml-2 rounded-lg' src={image} alt="" />
        </div>
        <div className="col-9 bg-ruleBox rounded-e-xl">
            <h3 className='text-black p-2 text-mb tracking-wider'>{rule}</h3>
        </div>
      </div>
    </div>
  )
}

export default RuleBox
