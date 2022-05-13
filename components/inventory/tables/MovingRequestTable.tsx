import { Table, Tooltip } from "@nextui-org/react";
import { useRouter } from 'next/router'
import {  fetcher, createLog } from "lib/fetcher"

import { useSWRConfig } from "swr";


const MovingRequestTable = ({movingRequests}) => {
  const router = useRouter()
  const { mutate } = useSWRConfig();


 

  const handleApproveRelocate= async relocate => {
    fetcher("/api/customer/relocate/approve", {relocate_id: relocate.id}).then(d => {
        mutate("/api/inventory")
    })
    createLog("LocationMoveRequest", `Moving ${relocate.item?.name} from ${relocate.previous_location} to ${relocate.target_location.short_code}`, "Update")
  }

  const handleRejectRelocate= async relocate => {
    fetcher("/api/customer/relocate/reject", {relocate_id: relocate.id}).then(d => {
        mutate("/api/inventory")
    })
    createLog("LocationMoveRequest", `Moving ${relocate.item?.name} from ${relocate.previous_location} to ${relocate.target_location.short_code}`, "Delete")

  }

    
  let columns = [
        { name: "#", uid: "id" },
        { name: "ITEM", uid: "item"},
        { name: "PREVIOUS LOCATION", uid: "prev" },
        { name: "TARGET LOCATION", uid: "target" },

        { name: "ACTIONS", uid: "actions" },
       
      ];
      
      const count=1;
      const renderCell = (movingRequest, columnKey) => {
        const cellValue = movingRequest[columnKey];
        switch (columnKey) {

          case "id":
              return <p className="text-lg ">{count++}</p>;
          case "item":
            return <p className="text-lg ">{movingRequest.item?.name}</p>;
          case "prev":
            return <p className="text-lg ">{movingRequest.previous_location}</p>;
          case "target":
            return <p className="text-lg ">{movingRequest.target_location.short_code}</p>;

      
          case "actions":
            return (
      
              <div className="flex flew-row gap-8">
                <Tooltip content="Accept Request" >
                  <a type="submit" className="text-sm text-primary-color" onClick={() => handleApproveRelocate(movingRequest)}> Accept </a>
                </Tooltip>

                <Tooltip content="Reject Request" >
                  <a  className="text-sm text-error-color" onClick={() => handleRejectRelocate(movingRequest)} > Reject </a>
                </Tooltip>
              </div>
                
  

            
       
            );
          default:
            return cellValue;
        }
      };


    return ( 
      <>
          {/* <UpdateRegStatus
          type={type}
          email={email}
          visible={visible} 
          closeHandler={closeHandler} 
          orderRequest={orderReq}
          pageType ={pageType}
          /> */}


            <Table 
            headerLined
            shadow={false}
            aria-label={"list of items"}
            sticked={true}
            selectionMode="none"
            css={{
              height: "auto",
              minWidth: "100%",
            }}
            containerCss={{
              borderRadius: "8px",
              padding:"8px",
            }}
           
          >

            <Table.Header columns={columns} >
              {(column) => (
                <Table.Column
                  key={column.uid}
                >
                  {column.name}
                </Table.Column>
              )}
            </Table.Header>
            <Table.Body items={movingRequests} > 
              {(item) => (
                <Table.Row >
                  {(columnKey) => (
                    <Table.Cell >{renderCell(item, columnKey)}</Table.Cell>
                  )}
                </Table.Row>
              )}
            </Table.Body>
      
            <Table.Pagination
              noMargin
              align="center"
              rowsPerPage={(router.pathname=="/inventory")?8:10}
            />
            </Table>
      </>
     );
}
 
export default MovingRequestTable;