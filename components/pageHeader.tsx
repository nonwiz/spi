import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from 'next/router'
import { Popover, Button, Text } from "@nextui-org/react";

const PageHeader = ({ page_name }:any) => {
  const { data: session } = useSession();

  const router = useRouter()
  const id = router.query.id;
    let currentPage;


    switch (router.pathname) {
        case "/":
            currentPage ="Home"
            break;

        case "/admin":
            currentPage ="Admin"
            break;
        case "/admin/customerList":
            currentPage ="Users List"
            break;
        case "/admin/departmentList":
            currentPage ="Department List"
            break;
        case "/admin/locationList":
            currentPage ="Location List"
            break;
        

        case "/customer":
            currentPage ="Home"
            break;
        case "/customer/orderRequest":
            currentPage ="Order Requests"
            break;
        case "/customer/myItemes":
            currentPage ="My Items"
            break;
       

        case "/departmentHead":
            currentPage ="Home"
            break;
        case "/departmentHead/orderRequest":
            currentPage ="Order Requests"
            break;
        case "/departmentHead/movingRequest":
            currentPage = "Moving Requests"
            break;
        case "/departmentHead/purchaseHistory":
            currentPage ="Purchase History"
            break;
        case "/departmentHead/myItems":
            currentPage ="My Items"
            break;
        

        case "/purchase":
            currentPage ="Home"
            break;
        case "/purchase/orderRequest":
            currentPage ="Order Requests"
            break;
        case "/purchase/purchaseHistory":
            currentPage ="Purchase History"
            break;

        case "/purchase/myItems":
            currentPage ="My Items"
            break;

        case "/inventory":
            currentPage ="Home"
            break;
        case "/inventory/locationList":
            currentPage ="Location List"
            break;
 
        case "/purchase/purchaseHistory":
            currentPage ="Purchase History"
            break;

        case "/purchase/myItems":
            currentPage ="My Items"
            break;
            
        default:
            currentPage ="Account Setting"
            break;
    }
  return ( 
    <div className="bg-gray-100  text-gray-700 rounded-lg px-5 py-2 flex justify-between items-center mb-4">
        {   
           (router.pathname =="/inventory/locationList/[id]")?
            <div className="text-xl flex flex-row gap-2">
                <Link href="/inventory/locationList"><a className="text-primary-color hover:shadow-sm"> {"<"} Go back</a></Link>
                <h1 className='font-normal hidden md:block'>Inventory / Location Details</h1>
                     
            </div>:
           <h1 className="text-xl font-bold">Dashboard / <span className='font-normal'> {currentPage}</span></h1>
         
        }

      
                <a className="inline-flex items-center px-4" href="#">
                    <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span className="ml-2 text-sm font-medium hidden sm:block">{(session)?session.user.name:"user"}</span>
                </a>
            
                {/* <Text onClick={()=>signOut()} css={{ p: "$10" }}>Sign Out</Text> */}
           
   
    </div>
 );
}

export default PageHeader;
