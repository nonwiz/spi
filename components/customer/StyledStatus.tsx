import { styled } from '@nextui-org/react';

const StyledStatus = ({status}) => {
   console.log(status)
   if (status && status.toLowerCase() == ("approved")) {
     return <p className='bg-green-300 text-md w-full lg:w-[50%] px-4 text-center rounded-lg'>{status}</p>
   } else if (status && status.toLowerCase().includes("pending")) {
      return <p className='bg-yellow-300 text-md w-full lg:w-[50%] px-4 text-center rounded-lg'>{status}</p>
   }else{
      return <p className='bg-red-300 text-md w-full lg:w-[50%] px-4 text-center rounded-lg'>{status}</p>
   }
  
}
export default StyledStatus;
