import { useRouter } from 'next/router'
import { useInventory } from "lib/fetcher";
import { Collapse, Loading, Text } from "@nextui-org/react";
import { EmptyState } from '@/components/EmptyState';
import DateConvert from '@/components/dateConvert';
import inventory from 'pages/api/inventory';
import { getDefaultSettings } from 'http2';
import LoadingIcon from '@/components/loadingIcon';

const LocationDetails =() =>{
    const router = useRouter()
    const id = router.query.id;
    const { data, isLoading } = useInventory();

    if (isLoading) return  <LoadingIcon />
    
    const loc = data.locations.filter(location => location.id == id )[0]

    const zones = {
        Information_Technology: "IT",
        Administration: "AD",
        Science: "SB",
        Solomon_hall:"Solomon"
      }

    function convertDate(date){
        return new Date(date).toLocaleString('en-us',{dateStyle: 'medium'})
    }

    return (
        <>
        <div className="my-8 flex flex-row gap-6 w-full">
            <button className="primary-btn"> Create Moving Request</button> 
            <button className="primary-btn"> Add Items</button> 
            <button className="primary-btn"> Add User</button> 
        </div>

        <div className='flex flex-col lg:flex-row gap-8 lg:gap-24'>
            <div className='flex flex-col gap-6 lg:w-2/3'>
                <fieldset className='border-2 rounded-md'>
                        <legend className='ml-2 pl-2 pr-4 text-lg'>Description</legend>
                        <div className='mx-4 mb-4 text-lg flex flex-col gap-1'>
                            <div className='flex flex-row gap-8'>
                                <p> <span className='font-semibold'>Zone:</span> {loc?.zone}</p>
                                <p><span className='font-semibold'>Room Number:</span> {zones[loc?.zone]? `${zones[loc?.zone]}${loc?.room_number}`: loc?.room_number}</p>
                                {(loc?.floor>1)? <p><span className='font-semibold'>Floor:</span> {loc?.floor}</p>:""}
                            </div>
                            <p><span className='font-semibold'>Description:</span> {loc?.description? loc.description: "not provided"}</p>
                

                        </div>
                </fieldset>

                <fieldset className='border-2 rounded-md'>
                        <legend className='ml-2 pl-2 pr-4 text-lg'>Responsible Person(s) </legend>
                        <button type="button" className="flex py-1 px-4 text-sm rounded-lg border text-gray-700 border-gray-700 gap-x-2.5 hover">Assign Responsible Person</button>
                        <div className='flex flex-col gap-2 mx-4 my-4'>
                        {loc?.users.map((user, num) =>(
                            <div className='flex flex-row gap-8'>
                                <p className='w-1/2'><span className='font-semibold'>Name: </span>{user.name} </p>
                                <p><span className='font-semibold'>Email: </span>{user.email}</p>
                            </div>
                        
                        ))}
                            <div>
                                
                            </div>
                        </div>
                </fieldset>

            </div>
            
            <div className='w-full'>
            {(loc?.items.length >0)
                ?
                    <fieldset className='border-2 rounded-md' >
                        <legend className='ml-2 pl-2 pr-4 text-lg'>Items ({loc.items.length}):</legend>
                        <Collapse.Group >
                            {loc?.items.map((item, num) =>(
                                <div>
                                    
                                <Collapse  key={item.id} title={`${num+1}. ${item.name} ---- Exp: ${convertDate(item.depreciation)}` } className="text-lg font-normal">
                                        <div  className='text-lg '>
                                            <p>- Details: {item.description}</p>
                                            <p>- Price: {item.price}</p>
                                            <p>- Order Date: {convertDate(item.order_date)}</p>
                                            <p>- Depreciation Date: {convertDate(item.depreciation)}</p>
                                            <p>- Quantity: {item.quantity} {item.quantity_unit}</p>
                                        </div>
                                </Collapse>
                                </div>
                                
                            ))}
                        </Collapse.Group>
                    </fieldset>
                    :
                    <EmptyState msg={"this location does not have any items"} /> }
            </div>
          
        </div>
                
        </>
       
    );
}
export default LocationDetails;