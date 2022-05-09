import { getFieldsValues, fetcher } from "lib/fetcher";
import { useSWRConfig } from "swr";
import { Input, Text  } from '@nextui-org/react';
import { getLocationOrigin } from "next/dist/shared/lib/utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const UpdateProfile= ({locations, departments}: {locations: string[], departments:object[]}) => {
  const { mutate } = useSWRConfig();
  const router = useRouter()
  const allBuilding = Array.from(new Set(locations?.map(item => item?.building)))
  const [building, setBuilding] = useState(allBuilding[0])
  const [locationOptions, setLocation] = useState(locations)

  const handleUpdateProfile = async event => {
    event.preventDefault();
    const formData = getFieldsValues(event, ["name", "department", "location"])
    console.log({formData})
    fetcher("/api/customer/update", formData).then(d => {
      console.log(d)
      mutate("/api/customer")
    })
    
    router.push('/customer')
  }

  useEffect(() => {
    console.log("change building")
    const filterLocations = locations?.filter(loc => loc?.building == building)
    setLocation(filterLocations);
  }, [building])

  return (
        <>
           

              <div className="min-h-screen flex flex-col items-center justify-center px-4 py-6 bg-primary-color">
                <form onSubmit={handleUpdateProfile} className=" rounded-lg shadow-md bg-white px-4 py-6 sm:px-8 sm:py-8 space-y-6 w-60 md:w-96">
                    <div className="flex gap-6 items-center">
                        <div className="flex justify-center items-center">
                            <svg className="w-8 h-8 fill-primary-color " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            </svg>
                            <span className="text-xl font-extrabold mt-0 text-primary-color">SPI |</span>
                        </div>
                        <h1 className="text-xl text-center font-bold p-0 -m-4">Profile Creation</h1> 
                    </div>
                   
                    <div className="flex justify-center mt- flex-col">
                  
                        <label htmlFor="email" className="text-gray-500 text-sm mt-2 ">Full Name</label>
                        <Input required bordered color="primary" 
                            placeholder="Dan Muhindo Kazimoto"
                            className="mt-2 w-full"
                            name="name"
                            aria-label="user full name"
                        />
                        

                        <label htmlFor="department" className="mt-4 mb-2 text-gray-500 text-sm">Department </label>
                        <select  required id="department" name="department" className=" form-select appearance-none block w-full p-2.5 px-5 text-base font-normal text-gray-700 border-2 rounded-2xl transition ease-in-out m-0
                        focus:text-gray-700 focus:bg-white focus:border-primary-color focus:outline-none" aria-label="department selection" aria-labelledby="department selection">
                            <option value="">Select department</option>
                            {departments?.map((department, num) => <option key={num} value={department.id} >{department.name}</option>)}
                        </select>

                        <label htmlFor="location" className="mt-4 mb-2 text-gray-500 text-sm">Location</label>
                        <div className="flex flex-row gap-4">

                        <select  required className=" form-select appearance-none block w-full p-2.5 px-5 text-base font-normal text-gray-700 border-2 rounded-2xl transition ease-in-out m-0
                        focus:text-gray-700 focus:bg-white focus:border-primary-color focus:outline-none" aria-label="location selection" aria-labelledby="location selection" onChange={e => setBuilding(e.target.value)}>
                          <option>Select Building </option>
                            {allBuilding?.map((building, num) => 
                                <option key={num} value={building} >{building}</option>)}
                    
                        </select>

                        <select   name="location" className=" form-select appearance-none block w-1/2 p-2.5 px-5 text-base font-normal text-gray-700 border-2 rounded-2xl transition ease-in-out m-0
                        focus:text-gray-700 focus:bg-white focus:border-primary-color focus:outline-none" aria-label="department selection">
                          <option> Select Room </option>
                            {locationOptions?.map((location, num) => 
                                <option key={num} value={location.id} >{location.room_number}</option>)}
                        </select>
                        </div>
                        <button type="submit" className="primary-btn m-0 w-full mt-12">Save and Continue</button>
                    </div>
                </form>
            </div>
  </>
)}

export default UpdateProfile;
