import React from 'react'
import "../style/ruleBox.css"

function RuleBox({image,rule}) {
  return (
    <div className='w-52 mx-auto my-2'>
      <div className='box rounded-2xl row'>
        <div className="col-4 p-0 flex items-center justify-center rounded-s-xl relative">
            <img className='ruleImg ml-2 rounded-lg relative' src={image} alt="" />
        </div>
        <div className="col-8 rounded-e-xl">
            <h3 className='text-black p-2 text-sm tracking-wider'>{rule}</h3>
        </div>
      </div>
    </div>
  )
}

export default RuleBox
