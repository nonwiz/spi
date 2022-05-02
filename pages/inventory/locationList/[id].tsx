import { useRouter } from 'next/router'
import { useInventory } from "lib/fetcher";
import { Collapse, Loading, Text } from "@nextui-org/react";

const LocationDetails =() =>{
    const router = useRouter()
    const id = router.query.id;
    const { data, isLoading } = useInventory();

    if (isLoading) {
        return <Loading>Loading</Loading>;
    }
    const loc = data.locations.filter(location => location.id == id )[0]
    console.log("hehhehe", loc)

// id is the id of the location passed to this page

    return (
        <div className='border-2 rounded-md'>

            <Collapse.Group>
            {loc.items.map((item) =>(
                
    
                <Collapse title={item.name} key={item.id}>
                        <p>{item.description}</p>
                        <p>{item.price}</p>
                </Collapse>
              

            ))}
            </Collapse.Group>
        

        </div>
    );
}
export default LocationDetails;