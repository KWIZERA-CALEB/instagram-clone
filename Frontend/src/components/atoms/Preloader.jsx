import { useEffect, useState } from 'react'

const Preloader = () => {
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
    </>
  )
}

export default Preloader
