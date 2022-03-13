import Link from 'next/link'
const ReqItem = ({name, email,department, requestDescription, requestStatus, requestId}) => {
    return (
<>

      <div class="flex items-center pl-5 l">
            <div class="flex-shrink-0 h-10 w-10">
              <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEylgd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60" alt="" />
            </div>

            <div class="ml-4">
                <p class="text-lg font-medium text-gray-900">{name}</p>
                <span class="text-lg text-gray-500">khazifire@example.com</span>
            </div>
      </div>

      <div class="px-6 py-2 lg:py-4 whitespace-nowrap text-lg text-gray-500 hidden lg:block l">
              <span className="mt-0 lg:hidden font-semibold">Request Description</span>
              <p class="text-lg text-gray-900 ">{department}</p>
            </div>
            <div class="px-6 py-2 lg:py-4 whitespace-wrap text-lg lg:col-span-2 l">
                <span className="mt-0 lg:hidden font-semibold">Request Description</span>
                <p class="text-lg text-gray-900 ">{requestDescription}</p>

      </div>

      <div class="px-6 lg:py-4 mt-2 lg:mt-0 l  ">
                <span className="mt-0 lg:hidden font-semibold">Request Status: </span>
                <span class="px-2 inline-flex text-sm leading-5 font-semibold rounded-full bg-green-100 text-green-800"> {requestStatus} </span>

        </div>

      <div class="px-6 lg:py-4  mt-4 mb-6 lg:my-0 text-center l">
              <Link href={`/order-request/${requestId}`} >
                <a href="#" class="text-indigo-600 hover:text-indigo-900 text-sm font-medium ">Learn More</a>
              </Link>
              
      </div>


     
      </>
    );
  };
  
  export default ReqItem;