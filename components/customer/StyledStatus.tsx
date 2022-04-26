import { styled } from '@nextui-org/react';

const StyledStatus = ({status}) => {

   if (status.toLowerCase() =="approved") {
     return <div><p className='bg-green-300 text-md w-[50%] text-center rounded-lg'>{status}</p></div>
   } else if (status.toLowerCase() =="pending") {
      return <p className='bg-yellow-300 text-md w-[50%] text-center rounded-lg'>{status}</p>
   }else{
      return <p className='bg-red-300 text-md w-[50%] text-center rounded-lg'>{status}</p>
   }
  
}
export default StyledStatus;
