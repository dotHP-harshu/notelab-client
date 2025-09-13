import React from 'react'
import { LuLoaderCircle } from 'react-icons/lu'

function Loader({size}) {
  return (
    <div className='w-fit h-fit'>
      <LuLoaderCircle size={size || 40} className='text-primary-color animate-spin'/>
    </div>
  )
}

export default Loader
