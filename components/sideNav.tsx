import Link from "next/link";
import { useRouter } from 'next/router'
import { useSession, signOut } from "next-auth/react";

const SideNav = () => {
  const { data: session } = useSession();
  // console.log(session);
  const router = useRouter()
    return ( 
        <>
            {/* <!-- mobile menu bar --> */}
            <div className="bg-primary-color text-gray-100 flex justify-between md:hidden">
            {/* <!-- logo --> */}
            <a href="#" className="text-white flex items-center space-x-2 px-4">
                <svg className="w-8 h-8 fill-current " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <span className="text-2xl font-extrabold">SPI</span>
            </a>
        
            {/* <!-- mobile menu button --> */}
            <button className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-100/20 text-gray-100">
                <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
            </div>
        
            {/* <!-- sidebar --> */}
            <div className="sidebar bg-primary-color text-blue-100 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
        
            {/* <!-- logo --> */}
            <a href="#" className="text-white flex items-center space-x-2 px-4">
                <svg className="w-8 h-8 fill-current " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <span className="text-2xl font-extrabold">SPI</span>
            </a>
        
            {/* <!-- nav --> */}

            {router.pathname.includes("/admin")
                ?  
                <nav>
                    <a href="/admin" className={router.pathname=="/admin"? "navlink-active":"navlink"}>
                        <svg className="w-8 h-8 sm:w-6 sm:h-6 fill-current " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>
                        <span>Dashboard</span>
                    </a>
                    <a href="/admin/userList" className={router.pathname=="/admin/userList"? "navlink-active":"navlink"}>
                        <svg className="w-8 h-8 sm:w-6 sm:h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M2 22a8 8 0 1 1 16 0H2zm8-9c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm7.363 2.233A7.505 7.505 0 0 1 22.983 22H20c0-2.61-1-4.986-2.637-6.767zm-2.023-2.276A7.98 7.98 0 0 0 18 7a7.964 7.964 0 0 0-1.015-3.903A5 5 0 0 1 21 8a4.999 4.999 0 0 1-5.66 4.957z"/></svg>
                        <span>Users</span>
                    </a>
                    <a href="/admin/departmentList" className={router.pathname=="/admin/departmentList"? "navlink-active":"navlink"}>
                        <svg className="w-8 h-8 sm:w-6 sm:h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M20.083 10.5l1.202.721a.5.5 0 0 1 0 .858L12 17.65l-9.285-5.571a.5.5 0 0 1 0-.858l1.202-.721L12 15.35l8.083-4.85zm0 4.7l1.202.721a.5.5 0 0 1 0 .858l-8.77 5.262a1 1 0 0 1-1.03 0l-8.77-5.262a.5.5 0 0 1 0-.858l1.202-.721L12 20.05l8.083-4.85zM12.514 1.309l8.771 5.262a.5.5 0 0 1 0 .858L12 13 2.715 7.429a.5.5 0 0 1 0-.858l8.77-5.262a1 1 0 0 1 1.03 0z"/></svg>
                        <span>Departments</span>
                    </a>
                    <a href="/admin/locationList" className={router.pathname=="/admin/locationList"? "navlink-active":"navlink"}>
                        <svg className="w-8 h-8 sm:w-6 sm:h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M2 5l7-3 6 3 6.303-2.701a.5.5 0 0 1 .697.46V19l-7 3-6-3-6.303 2.701a.5.5 0 0 1-.697-.46V5zm13 14.764V7.176l-.065.028L9 4.236v12.588l.065-.028L15 19.764z"/></svg>
                        <span>Locations</span>
                    </a>

                    <a href="#" className={router.pathname==""? "navlink-active absolute bottom-4 w-full left-0 rounded":"navlink absolute bottom-4 w-full left-0 rounded"}>
                        <svg className="w-8 h-8 sm:w-6 sm:h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M5.334 4.545a9.99 9.99 0 0 1 3.542-2.048A3.993 3.993 0 0 0 12 3.999a3.993 3.993 0 0 0 3.124-1.502 9.99 9.99 0 0 1 3.542 2.048 3.993 3.993 0 0 0 .262 3.454 3.993 3.993 0 0 0 2.863 1.955 10.043 10.043 0 0 1 0 4.09c-1.16.178-2.23.86-2.863 1.955a3.993 3.993 0 0 0-.262 3.455 9.99 9.99 0 0 1-3.542 2.047A3.993 3.993 0 0 0 12 20a3.993 3.993 0 0 0-3.124 1.502 9.99 9.99 0 0 1-3.542-2.047 3.993 3.993 0 0 0-.262-3.455 3.993 3.993 0 0 0-2.863-1.954 10.043 10.043 0 0 1 0-4.091 3.993 3.993 0 0 0 2.863-1.955 3.993 3.993 0 0 0 .262-3.454zM13.5 14.597a3 3 0 1 0-3-5.196 3 3 0 0 0 3 5.196z"/></svg>
                        <span>Account Settings</span>
                    </a>
                </nav>
                :(router.pathname.includes("/customer"))?
                <nav>
                    <a href="/customer" className={router.pathname=="/customer"? "navlink-active":"navlink"}>
                        <svg className="w-8 h-8 sm:w-6 sm:h-6 fill-current " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>
                        <span>Dashboard</span>
                    </a>
                    <a href="/customer/orderRequest" className={router.pathname=="/customer/orderRequest"? "navlink-active":"navlink"}>
                        <svg className="w-8 h-8 sm:w-6 sm:h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M2 22a8 8 0 1 1 16 0H2zm8-9c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm7.363 2.233A7.505 7.505 0 0 1 22.983 22H20c0-2.61-1-4.986-2.637-6.767zm-2.023-2.276A7.98 7.98 0 0 0 18 7a7.964 7.964 0 0 0-1.015-3.903A5 5 0 0 1 21 8a4.999 4.999 0 0 1-5.66 4.957z"/></svg>
                        <span>Order Requests</span>
                    </a>
                    <a href="/customer/myItemes" className={router.pathname=="/customer/myItems"? "navlink-active":"navlink"}>
                        <svg className="w-8 h-8 sm:w-6 sm:h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M20.083 10.5l1.202.721a.5.5 0 0 1 0 .858L12 17.65l-9.285-5.571a.5.5 0 0 1 0-.858l1.202-.721L12 15.35l8.083-4.85zm0 4.7l1.202.721a.5.5 0 0 1 0 .858l-8.77 5.262a1 1 0 0 1-1.03 0l-8.77-5.262a.5.5 0 0 1 0-.858l1.202-.721L12 20.05l8.083-4.85zM12.514 1.309l8.771 5.262a.5.5 0 0 1 0 .858L12 13 2.715 7.429a.5.5 0 0 1 0-.858l8.77-5.262a1 1 0 0 1 1.03 0z"/></svg>
                        <span>My Items</span>
                    </a>
                    <a href="#" className={router.pathname==""? "navlink-active absolute bottom-4 w-full left-0 rounded":"navlink absolute bottom-4 w-full left-0 rounded"}>
                        <svg className="w-8 h-8 sm:w-6 sm:h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M5.334 4.545a9.99 9.99 0 0 1 3.542-2.048A3.993 3.993 0 0 0 12 3.999a3.993 3.993 0 0 0 3.124-1.502 9.99 9.99 0 0 1 3.542 2.048 3.993 3.993 0 0 0 .262 3.454 3.993 3.993 0 0 0 2.863 1.955 10.043 10.043 0 0 1 0 4.09c-1.16.178-2.23.86-2.863 1.955a3.993 3.993 0 0 0-.262 3.455 9.99 9.99 0 0 1-3.542 2.047A3.993 3.993 0 0 0 12 20a3.993 3.993 0 0 0-3.124 1.502 9.99 9.99 0 0 1-3.542-2.047 3.993 3.993 0 0 0-.262-3.455 3.993 3.993 0 0 0-2.863-1.954 10.043 10.043 0 0 1 0-4.091 3.993 3.993 0 0 0 2.863-1.955 3.993 3.993 0 0 0 .262-3.454zM13.5 14.597a3 3 0 1 0-3-5.196 3 3 0 0 0 3 5.196z"/></svg>
                        <span>Account Settings</span>
                    </a>
                </nav> 
                :(router.pathname.includes("/departmentHead"))?
                <nav>
                    <a href="/departmentHead" className={router.pathname=="/departmentHead"? "navlink-active":"navlink"}>
                        <svg className="w-8 h-8 sm:w-6 sm:h-6 fill-current " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>
                        <span>Dashboard</span>
                    </a>
                    <a href="/departmentHead/orderRequest" className={router.pathname=="/departmentHead/orderRequest"? "navlink-active":"navlink"}>
                        <svg className="w-8 h-8 sm:w-6 sm:h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M2 22a8 8 0 1 1 16 0H2zm8-9c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm7.363 2.233A7.505 7.505 0 0 1 22.983 22H20c0-2.61-1-4.986-2.637-6.767zm-2.023-2.276A7.98 7.98 0 0 0 18 7a7.964 7.964 0 0 0-1.015-3.903A5 5 0 0 1 21 8a4.999 4.999 0 0 1-5.66 4.957z"/></svg>
                        <span>Order Request</span>
                    </a>
                    <a href="/departmentHead/movingRequest" className={router.pathname=="/departmentHead/movingRequest"? "navlink-active":"navlink"}>
                        <svg className="w-8 h-8 sm:w-6 sm:h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M20.083 10.5l1.202.721a.5.5 0 0 1 0 .858L12 17.65l-9.285-5.571a.5.5 0 0 1 0-.858l1.202-.721L12 15.35l8.083-4.85zm0 4.7l1.202.721a.5.5 0 0 1 0 .858l-8.77 5.262a1 1 0 0 1-1.03 0l-8.77-5.262a.5.5 0 0 1 0-.858l1.202-.721L12 20.05l8.083-4.85zM12.514 1.309l8.771 5.262a.5.5 0 0 1 0 .858L12 13 2.715 7.429a.5.5 0 0 1 0-.858l8.77-5.262a1 1 0 0 1 1.03 0z"/></svg>
                        <span>Moving Request </span>
                    </a>
                    <a href="/departmentHead/purchaseHistory" className={router.pathname=="/departmentHead/purchaseHistory"? "navlink-active":"navlink"}>
                        <svg className="w-8 h-8 sm:w-6 sm:h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M2 5l7-3 6 3 6.303-2.701a.5.5 0 0 1 .697.46V19l-7 3-6-3-6.303 2.701a.5.5 0 0 1-.697-.46V5zm13 14.764V7.176l-.065.028L9 4.236v12.588l.065-.028L15 19.764z"/></svg>
                        <span>Purchase History</span>
                    </a>
                    <a href="/departmentHead/myItems" className={router.pathname=="/departmentHead/myItems"? "navlink-active":"navlink"}>
                        <svg className="w-8 h-8 sm:w-6 sm:h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M2 5l7-3 6 3 6.303-2.701a.5.5 0 0 1 .697.46V19l-7 3-6-3-6.303 2.701a.5.5 0 0 1-.697-.46V5zm13 14.764V7.176l-.065.028L9 4.236v12.588l.065-.028L15 19.764z"/></svg>
                        <span>My Items</span>
                    </a>

                    <a href="#" className={router.pathname==""? "navlink-active absolute bottom-4 w-full left-0 rounded":"navlink absolute bottom-4 w-full left-0 rounded"}>
                        <svg className="w-8 h-8 sm:w-6 sm:h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M5.334 4.545a9.99 9.99 0 0 1 3.542-2.048A3.993 3.993 0 0 0 12 3.999a3.993 3.993 0 0 0 3.124-1.502 9.99 9.99 0 0 1 3.542 2.048 3.993 3.993 0 0 0 .262 3.454 3.993 3.993 0 0 0 2.863 1.955 10.043 10.043 0 0 1 0 4.09c-1.16.178-2.23.86-2.863 1.955a3.993 3.993 0 0 0-.262 3.455 9.99 9.99 0 0 1-3.542 2.047A3.993 3.993 0 0 0 12 20a3.993 3.993 0 0 0-3.124 1.502 9.99 9.99 0 0 1-3.542-2.047 3.993 3.993 0 0 0-.262-3.455 3.993 3.993 0 0 0-2.863-1.954 10.043 10.043 0 0 1 0-4.091 3.993 3.993 0 0 0 2.863-1.955 3.993 3.993 0 0 0 .262-3.454zM13.5 14.597a3 3 0 1 0-3-5.196 3 3 0 0 0 3 5.196z"/></svg>
                        <span>Account Settings</span>
                    </a>
                </nav>
                :(router.pathname.includes("/purchase"))?
                <nav>
                    <a href="/purchase" className={router.pathname=="/purchase"? "navlink-active":"navlink"}>
                        <svg className="w-8 h-8 sm:w-6 sm:h-6 fill-current " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>
                        <span>Dashboard</span>
                    </a>
                    <a href="/purchase/orderRequest" className={router.pathname=="/purchase/orderRequest"? "navlink-active":"navlink"}>
                        <svg className="w-8 h-8 sm:w-6 sm:h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M2 22a8 8 0 1 1 16 0H2zm8-9c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm7.363 2.233A7.505 7.505 0 0 1 22.983 22H20c0-2.61-1-4.986-2.637-6.767zm-2.023-2.276A7.98 7.98 0 0 0 18 7a7.964 7.964 0 0 0-1.015-3.903A5 5 0 0 1 21 8a4.999 4.999 0 0 1-5.66 4.957z"/></svg>
                        <span>Order Request</span>
                    </a>
 
                    <a href="/purchase/purchaseHistory" className={router.pathname=="/purchase/purchaseHistory"? "navlink-active":"navlink"}>
                        <svg className="w-8 h-8 sm:w-6 sm:h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M2 5l7-3 6 3 6.303-2.701a.5.5 0 0 1 .697.46V19l-7 3-6-3-6.303 2.701a.5.5 0 0 1-.697-.46V5zm13 14.764V7.176l-.065.028L9 4.236v12.588l.065-.028L15 19.764z"/></svg>
                        <span>Purchase History</span>
                    </a>
                    <a href="/purchase/myItems" className={router.pathname=="/purchase/myItems"? "navlink-active":"navlink"}>
                        <svg className="w-8 h-8 sm:w-6 sm:h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M2 5l7-3 6 3 6.303-2.701a.5.5 0 0 1 .697.46V19l-7 3-6-3-6.303 2.701a.5.5 0 0 1-.697-.46V5zm13 14.764V7.176l-.065.028L9 4.236v12.588l.065-.028L15 19.764z"/></svg>
                        <span>My Items</span>
                    </a>

                    <a href="#" className={router.pathname==""? "navlink-active absolute bottom-4 w-full left-0 rounded":"navlink absolute bottom-4 w-full left-0 rounded"}>
                        <svg className="w-8 h-8 sm:w-6 sm:h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M5.334 4.545a9.99 9.99 0 0 1 3.542-2.048A3.993 3.993 0 0 0 12 3.999a3.993 3.993 0 0 0 3.124-1.502 9.99 9.99 0 0 1 3.542 2.048 3.993 3.993 0 0 0 .262 3.454 3.993 3.993 0 0 0 2.863 1.955 10.043 10.043 0 0 1 0 4.09c-1.16.178-2.23.86-2.863 1.955a3.993 3.993 0 0 0-.262 3.455 9.99 9.99 0 0 1-3.542 2.047A3.993 3.993 0 0 0 12 20a3.993 3.993 0 0 0-3.124 1.502 9.99 9.99 0 0 1-3.542-2.047 3.993 3.993 0 0 0-.262-3.455 3.993 3.993 0 0 0-2.863-1.954 10.043 10.043 0 0 1 0-4.091 3.993 3.993 0 0 0 2.863-1.955 3.993 3.993 0 0 0 .262-3.454zM13.5 14.597a3 3 0 1 0-3-5.196 3 3 0 0 0 3 5.196z"/></svg>
                        <span>Account Settings</span>
                    </a>
                </nav>
                :
                ". . . . . ....Hi"
                
            }
            </div>
        </>

     );
}
 

export default SideNav;
