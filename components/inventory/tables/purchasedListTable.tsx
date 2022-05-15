import { Table, Row, Col, Tooltip, User, Text, Container, Grid } from "@nextui-org/react";
import { useRouter } from 'next/router'
import { useState } from 'react'
import { IconButton } from "@/components/admin/icons/IconButton";
import { EditIcon } from "@/components/admin/icons/EditIcon";
import UpdateDepartmentModal from "@/components/admin/UpdateDepartmentModal";
import StyledStatus from "@/components/customer/StyledStatus";
import UpdateRegStatus from "../UpdateRegStatus";
import DateConvert from "@/components/dateConvert";
import ViewItemModal from "../ViewItemModal";
import { useSWRConfig } from "swr";
import { createLog, fetcher } from "lib/fetcher";
import { DeleteIcon } from "@/components/customer/icons/DeleteIcon";
import UpdatePurchasedItem from "../updatePurchasedItem";




const PurchasedListTable = ({items, locations}) => {
  const router = useRouter()
  const [visible, setVisible] = useState(false);
  const [itemInfo, setItemInfo] = useState([])
  const [itemLocation, setItemLocation] = useState([])
  const { mutate } = useSWRConfig();

  const returnRoom = (location_id) => {
    return locations?.find((loc) => loc.id == location_id)?.short_code

  }

  const disposeItem = async ( id : Number) => {
    fetcher("/api/inventory/removeItem", { item_id: id }).then((d) => {
      mutate(`/api/inventory`)
    })
    createLog("Item", `Dispose depreciated item`, "Remove");
  }



  const updateItem = (item) => {
    setItemInfo(item)
    setVisible(true);
    setItemLocation(returnRoom(item.location_id));
  }

  const closeHandler = () => {
    setVisible(false);
  };
   
    const checkDepreciation = (item) => {
    let od = new Date(item.order_date);
      let dp;
      let today = new Date();
      if (!item.isAsset) {
        return "Not Applicable"
      }
      if (item.depreciation) {
        dp = new Date(item.depreciation)
      } else {
        dp = new Date();
        dp.setFullYear(od.getFullYear() + 10)
      }
      if (dp < today) {
        return "Depreciated"
      } else {
        return dp.toDateString();
      }
   
    }

  let columns = [
        { name: "#", uid: "id" },
        { name: "NAME", uid: "name" },
        { name: "QUANTITY", uid: "quantity" },
        { name: "PRICE", uid: "price" },
        { name: "TYPE", uid: "type" },
        { name: "ORDER DATE", uid: "order_date" },
        { name: "LOCATION", uid: "location"},
        { name: "DEPRECIATION", uid: "depreciation" },
        { name: "ACTIONS", uid: "actions" },
       
      ];
   const count =1;
      const renderCell = (items, columnKey) => {
        const cellValue = items[columnKey];
      
        switch (columnKey) {

          case "id":
              return <p className="text-lg ">{count++}</p>;
          case "name":
            return <p className="text-lg ">{items.name}</p>;
          case "price":
            return <p className="text-lg ">{items.price}</p>;
          case "order_date":
            return <p className="text-lg "><DateConvert date={items.order_date} type={"inventory"} /></p>;
          case "depreciation":
              return <p className="text-lg ">{checkDepreciation(items)}</p>;

          case "type":
            return <p className="text-lg ">{items.type}</p>;

          case "location":
            return <p className="text-lg">{returnRoom(items.location_id)}</p>
          case "quantity":
            return <p className="text-lg ">{items.quantity} {items.quantity_unit}</p>;
          case "order_status":
            return <StyledStatus status={`${items.approval_by.length > 0 && items.order_status == "Pending"? `Pending (${items.approval_by.length}/2)` : items.order_status}`} />
       
          case "actions":
            return (
              <Row justify="center" align="center">

              <Col css={{  }} className="">
                <Tooltip content="Edit Item" >
                  <IconButton  onClick={() => updateItem(items)} >
                  <EditIcon size={20} fill="#979797" />
                  </IconButton>
                </Tooltip>
                </Col>
               
               
               
            


              

             
              
            </Row>
            );
          default:
            return cellValue;
        }
      };


    return ( 
      <>
          <UpdatePurchasedItem
            visible={visible}
            closeHandler={closeHandler}
            location={itemLocation} 
            item={itemInfo}      
          />


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
            <Table.Body items={items} > 
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
 
export default PurchasedListTable;