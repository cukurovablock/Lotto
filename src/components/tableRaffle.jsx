import React from 'react'
import img from "../images/image.png"
import img1 from "../images/image1.png"
import img2 from "../images/image2.png"
import TableItem from './tableItem'

function TableRaffle() {


  const raffles = [
    {
            order:1,
            raffleName:["Bayram's 100 ETH Raffle",img],
            dailyChange:"%12",
            participants:1648,
            remainingTime:"12 Days",
            award:"100 ETH",
            winnerNumber:2,
            revealDate:"24.12.2023",
    },
    {
        order:2,
        raffleName:["Azat's 100 ETH Raffle",img1],
        dailyChange:"%18",
        participants:168,
        remainingTime:"3 Days",
        award:"100 ETH",
        winnerNumber:1,
        revealDate:"20.12.2023",
},
{
    order:3,
    raffleName:["Samet's 100 ETH Raffle",img2],
    dailyChange:"%3",
    participants:1958,
    remainingTime:"2 Days",
    award:"100 ETH",
    winnerNumber:1,
    revealDate:"12.12.2023",
},
{
    order:4,
    raffleName:["Emre's 100 ETH Raffle",img],
    dailyChange:"%6",
    participants:898,
    remainingTime:"5 Days",
    award:"100 ETH",
    winnerNumber:4,
    revealDate:"14.12.2023",
},
{
    order:5,
    raffleName:["Çolak's 100 ETH Raffle",img1],
    dailyChange:"%4",
    participants:328,
    remainingTime:"7 Days",
    award:"100 ETH",
    winnerNumber:1,
    revealDate:"18.12.2023",
}
  ]  

  return (
    <div id='raffleTable' className='w-full p-4'>
        <h1 className="text-white text-3xl text-center m-4 underline-offset-0">
            RAFFLE TABLE
        </h1>
        <div>
        <table className='w-full'>
            <tr>
                <th className='text-xl text-white font-medium text-center  bg-purpleOne p-3'>Order</th>
                <th className='text-xl text-white font-medium text-center bg-purpleOne p-3'>Raffle Name</th>
                <th className='text-xl text-white font-medium text-center bg-purpleOne p-3'>Daily Change</th>
                <th className='text-xl text-white font-medium text-center bg-purpleOne p-3'>Participants</th>
                <th className='text-xl text-white font-medium text-center bg-purpleOne p-3'>Remaining Time</th>
                <th className='text-xl text-white font-medium text-center bg-purpleOne p-3'>Award</th>
                <th className='text-xl text-white font-medium text-center bg-purpleOne p-3'>Winner Number</th>
                <th className='text-xl text-white font-medium text-center bg-purpleOne p-3'>Reveal Date</th>
            </tr>
            {raffles.map((raffle, index) => (
                <TableItem
                order={raffle.order} 
                raffleName={raffle.raffleName}
                dailyChange={raffle.dailyChange}
                participants={raffle.participants}
                remainingTime={raffle.remainingTime}
                award={raffle.award}
                winnerNumber={raffle.winnerNumber}
                revealDate={raffle.revealDate}
                />
                ))}
            </table>
        </div>
    </div>
  )
}

export default TableRaffle
