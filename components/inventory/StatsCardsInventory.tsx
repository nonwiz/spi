import { useState } from 'react'
import Link from 'next/link'
import { useInfo, useInventory } from 'lib/fetcher';
// import SearchBox from "@/components/admin/SearchBox";
// import ChangeRoleModal from "./ChangeRoleModal";
// import UpdateLocationModal from './UpdateLocationModal';
// import UpdateDepartmentModal from './UpdateDepartmentModal';

const StatsCardsInventory = ( {items} ) => {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [type, setType] = useState("none");
  const {data, isLoading } = useInventory()
  
  if (isLoading) return "...";

  const supply = data.items.length
  const electronic = data.items.filter(item => item.isAsset).length
  const office = data.items.filter(item => {
    let od = new Date(item.order_date);
    let dp;
    let today = new Date();
    if (item.depreciation) {
      dp = new Date(item.depreciation)
    } else {
      dp = new Date();
      dp.setFullYear(od.getFullYear() + 10)
    }
    return dp > today;
  }).length


    return ( 
      <>
      
        <div className="flex flex-wrap justify-center md:justify-start md:flex-row lg:flex-nowrap gap-6">

          <div className="flex flex-wrap lg:flex-row justify-between p-4 w-full lg:w-1/4  rounded-lg gap-y-3 text-black-700 border-2 border-gray-200">
              <div>
                <div className="flex items-center gap-2 ">
                    <div className="p-2 bg-gray-100 rounded-2xl ">
                        <svg className="w-12 h-12 fill-gray-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M20.083 10.5l1.202.721a.5.5 0 0 1 0 .858L12 17.65l-9.285-5.571a.5.5 0 0 1 0-.858l1.202-.721L12 15.35l8.083-4.85zm0 4.7l1.202.721a.5.5 0 0 1 0 .858l-8.77 5.262a1 1 0 0 1-1.03 0l-8.77-5.262a.5.5 0 0 1 0-.858l1.202-.721L12 20.05l8.083-4.85zM12.514 1.309l8.771 5.262a.5.5 0 0 1 0 .858L12 13 2.715 7.429a.5.5 0 0 1 0-.858l8.77-5.262a1 1 0 0 1 1.03 0z"/></svg>
                    </div>
                  <p className="text-5xl font-semibold text-gray-700">{supply}</p>
                </div>
                <span className="p-2 text-base tracking-wide text-gray-500 font-medium">Total Items</span>
              </div>

              <div className="flex items-center gap-6 text-blue-700">
                {/* <button  className="flex py-3 px-4 text-sm rounded-lg border text-gray-700 border-gray-700 gap-x-2.5 hover:shadow-lg hover:shadow-gray-700/20">Add New</button> */}
                <Link href="/purchase/orderRequest">
                  <button className="flex py-3 px-4 text-sm rounded-lg border border-primary-color gap-x-2.5 bg-primary-color text-white hover:shadow-lg hover:shadow-blue-700/20">View All</button>
                </Link>              
                </div>
          </div>

          <div className="flex flex-wrap lg:flex-row justify-between p-4 w-full lg:w-1/4  rounded-lg gap-y-3 text-black-700 border-2 border-gray-200">
              <div>
                <div className="flex items-center gap-2 ">
                    <div className="p-2 bg-gray-100 rounded-2xl ">
                      <svg className="w-12 h-12 fill-gray-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M2 5l7-3 6 3 6.303-2.701a.5.5 0 0 1 .697.46V19l-7 3-6-3-6.303 2.701a.5.5 0 0 1-.697-.46V5zm13 14.764V7.176l-.065.028L9 4.236v12.588l.065-.028L15 19.764z"/></svg>

                    </div>
                  <p className="text-5xl font-semibold text-gray-700">{electronic}</p>
                </div>
                <span className="p-2 text-base tracking-wide text-gray-500 font-medium">Total Assets </span>
              </div>

              <div className="flex items-center gap-6 text-blue-700">
                {/* <button  className="flex py-3 px-4 text-sm rounded-lg border text-gray-700 border-gray-700 gap-x-2.5 hover:shadow-lg hover:shadow-gray-700/20">Add New</button> */}
                <Link href="purchase/purchaseHistory">
                  <button className="flex py-3 px-4 text-sm rounded-lg border border-primary-color gap-x-2.5 bg-primary-color text-white hover:shadow-lg hover:shadow-blue-700/20">View All</button>
                </Link>              
                </div>
          </div>

          <div className="flex flex-wrap lg:flex-row justify-between p-4 w-full lg:w-1/4  rounded-lg gap-y-3 text-black-700 border-2 border-gray-200">
              <div>
                <div className="flex items-center gap-2 ">
                    <div className="p-2 bg-gray-100 rounded-2xl ">
                      <svg className="w-12 h-12 fill-gray-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M2 5l7-3 6 3 6.303-2.701a.5.5 0 0 1 .697.46V19l-7 3-6-3-6.303 2.701a.5.5 0 0 1-.697-.46V5zm13 14.764V7.176l-.065.028L9 4.236v12.588l.065-.028L15 19.764z"/></svg>

                    </div>
                  <p className="text-5xl font-semibold text-gray-700">{office}</p>
                </div>
                <span className="p-2 text-base tracking-wide text-gray-500 font-medium">Depreciated Assets</span>
              </div>

              <div className="flex items-center gap-6 text-blue-700">
                {/* <button  className="flex py-3 px-4 text-sm rounded-lg border text-gray-700 border-gray-700 gap-x-2.5 hover:shadow-lg hover:shadow-gray-700/20">Add New</button> */}
                <Link href="purchase/purchaseHistory">
                  <button className="flex py-3 px-4 text-sm rounded-lg border border-primary-color gap-x-2.5 bg-primary-color text-white hover:shadow-lg hover:shadow-blue-700/20">View All</button>
                </Link>              
                </div>
          </div>
        </div>
      </>
     );
}
 
export default StatsCardsInventory;