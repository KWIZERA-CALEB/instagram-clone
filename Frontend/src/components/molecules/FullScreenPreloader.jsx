import { useEffect, useState } from 'react'

const FullScreenPreloader = () => {
    const [showPreloader, setShowPreloader] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setShowPreloader(false)
        }, 5000)
    }, [])
  return (
    <>
      {showPreloader && 
        <div className='preloader-bar-container'>
            <div className='preloader-bar'></div>
        </div>
      }
      <div className='w-full h-[100vh] z-50 bg-[#000] flex justify-center items-center'>
            Twika
      </div>
    </>
  )
}

export default FullScreenPreloader
