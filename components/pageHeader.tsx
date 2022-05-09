import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from 'next/router'
import departmentList from "pages/admin/departmentList";


const PageHeader = ({ page_name }:any) => {
  const { data: session } = useSession();

  const router = useRouter()
  let path = router.pathname

    const currentPage ={
        admin: {
            "/admin": "Admin",
            "/admin/userList":"Users / List",
            "/admin/departmentList":"Department / List",
            "/admin/locationList":"Location / List",
            "/admin/eventLogList":"Recent Activity / Logs"
        },
        customer:{
            "/customer":"Home",
            "/customer/orderRequest":"Order Requests",
            "/customer/myItemes":"My Items"
        },
        department:{
            "/departmentHead":"Home",
            "/departmentHead/orderRequest":"Order Requests",
            "/departmentHead/movingRequest":"Moving Requests",
            "/departmentHead/purchaseHistory":"Purchase History",
            "/departmentHead/myItems":"My Items",
        },
        purchase:{
            "/purchase":"Home",
            "/purchase/orderRequest":"Order Requests",
            "/purchase/purchaseHistory":"Purchase History",
            "/purchase/myItems":"My Items",
        },
        inventory:{
            "/inventory":"Home",
            "/inventory/locationList":"Location List",
            "/purchase/purchaseHistory":"Purchase History",
            "/purchase/myItems":"My Items"
        }
    }

    /**Retrieves path from currentPage based on role
     * @param none
     * @returns currentPage.role.['pathname']   
     */
    function getCurrentPage(){
        if(router.pathname.includes("admin")){
            return currentPage.admin[path]
        }
        if(router.pathname.includes("department")){
            return currentPage.department[path]
        }
        if(router.pathname.includes("purchase")){
            return currentPage.purchase[path]
        }
        if(router.pathname.includes("inventory")){
            return currentPage.inventory[path]
        }
        if(router.pathname.includes("customer")){
            return currentPage.customer[path]
        }
    }



  return ( 
    <div className="bg-gray-100  text-gray-700 rounded-lg px-5 py-2 flex justify-between items-center mb-4">
        {   
           (router.pathname =="/inventory/locationList/[id]")?
            <div className="text-xl flex flex-row gap-2">
                <Link href="/inventory/locationList"><a className="text-primary-color hover:shadow-sm"> {"<"} Go back</a></Link>
                <h1 className='font-normal hidden md:block'>Inventory / Location Details</h1>
                     
            </div>:
           <h1 className="text-xl font-bold">Dashboard / <span className='font-normal'> {getCurrentPage()}</span></h1>
          
         
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
