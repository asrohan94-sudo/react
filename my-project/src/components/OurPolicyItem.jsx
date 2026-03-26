import React from 'react'

const OurPolicyItem = ({image,text1,text2}) => {
  return (
      <div className='flex flex-col items-center justify-center gap-1 my-4'>
          <img src={image} alt="" className='w-12  m-2' />
          <p className='font-semibold'>{text1}</p>
          <p className='text-gray-400  text-center '>{text2}</p>
          
      
    </div>
  )
}

export default OurPolicyItem