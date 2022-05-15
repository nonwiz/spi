import DateConvert from "../dateConvert";

const formatDate = (date) =>{
  return new Date(date).toLocaleString('en-us',{dateStyle: 'medium', timeStyle: 'short'})
}

const EventLog = ({logs} ) => {

    return ( 
      <div className='rounded-lg border-2 border-gray-200 p-4 flex flex-col gap-4'>

      {logs?.map((log, num) => 
        <div className="flex flex-row items-baseline gap-2 ">
  
          <div className={(log?.operation=="Update")?"bg-yellow-400 w-3 h-3 rounded-full":log?.operation=="Remove"?
            "bg-red-400  w-[80%] rounded-full":"bg-green-400 w-3 h-3 rounded-full"}></div>
          
          <div>
            <p>Date: {formatDate(log.timestamp)} | {log?.operation}</p>
            <p>User: {log?.user}</p>
            <p className="">{log?.model}: {log?.message}</p>
          </div>
        </div>
          
          )}

       
      </div>
     );
}
 
export default EventLog;