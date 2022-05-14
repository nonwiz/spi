import { styled } from '@nextui-org/react';

const StyledStatus = ({status}) => {

   if (status && status.toLowerCase() == ("purchased")) {
     return <p className='bg-sky-300 text-md w-full lg:w-[95%] xl:w-[60%] px-4 text-center rounded-lg'>{status}</p>
   }  else if (status && status.toLowerCase().includes("approved")) {
      return <p className='bg-green-300 text-md w-full lg:w-[95%] xl:w-[60%] px-4 text-center rounded-lg'>{status}</p>
   } else if (status && status.toLowerCase().includes("pending")) {
      return <p className='bg-yellow-300 text-md w-full lg:w-[95%] xl:w-[60%] px-4 text-center rounded-lg'>{status}</p>
   }
    else{
      return <p className='bg-red-300 text-md w-full lg:w-[90%] xl:w-[60%] px-4 text-center rounded-lg'>{status}</p>
   }
  
}
export default StyledStatus;
