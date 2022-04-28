import { styled } from '@nextui-org/react';

const StyledStatus = ({status}) => {

   if (status && status.includes("Pending (1/3)")) {
     return <p className='bg-green-300 text-md w-[50%] text-center rounded-lg'>Approved</p>
   } else if (status && status.toLowerCase().includes("pending")) {
      return <p className='bg-yellow-300 text-md w-[50%] text-center rounded-lg'>{status}</p>
   }else{
      return <p className='bg-red-300 text-md w-[50%] text-center rounded-lg'>{status}</p>
   }
  
}
export default StyledStatus;
