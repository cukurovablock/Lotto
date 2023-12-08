import React from 'react'

function TableItem({order,raffleName,dailyChange,participants,remainingTime,award,winnerNumber,revealDate}) {
  return (
        <tr className='bg-tableItemBg'>
            <td className='text-center text-white '>{order}</td>
            <td className='flex items-center justify-center'>
                <div className='flex justify-center items-center'>
                  <img className='rounded-full w-24 flex items-center justify-center' src={raffleName[1]} alt="" />
                  <h2 className='text-center text-white ml-3'>{raffleName[0]}</h2>
                </div>
            </td>
            <td className='text-center text-white '>{dailyChange}</td>
            <td className='text-center text-white '>{participants}</td>
            <td className='text-center text-white '>{remainingTime}</td>
            <td className='text-center text-white '>{award}</td>
            <td className='text-center text-white '>{winnerNumber}</td>
            <td className='text-center text-white '>{revealDate}</td>
        </tr>
  )
}

export default TableItem
