import { Table, Row, Col, Tooltip, User, Text, Container } from "@nextui-org/react";
import { useRouter } from 'next/router'
import { useState } from 'react'
import { IconButton } from "@/components/admin/icons/IconButton";
import { EyeIcon } from "@/components/admin/icons/EyeIcon";
import { EditIcon } from "@/components/admin/icons/EditIcon";

import UpdateDepartmentModal from "@/components/admin/UpdateDepartmentModal";
import StyledStatus from "../StyledStatus";
import {DeleteIcon} from "../icons/DeleteIcon";



const ItemListTable = ({items}) => {
  const router = useRouter()
  const [visible, setVisible] = useState(false);
  const [itemInfo, setItemInfo] = useState([]);
  const [type, setType] = useState("none");
  
  const detailHandler = (item) =>{
    setVisible(true);
    setItemInfo(item);
    setType("view_details")
  }

  const closeHandler = () => {
    setVisible(false);
    setItemInfo([])
    setType("none")
  };

  const columns = [
    { name: "#", uid: "id" },
    { name: "ITEM NAME", uid: "item_name" },
    { name: "ITEM DESCRIPTION", uid: "item_description" },
    { name: "ITEM ORDER DATE", uid: "item_date" },
    { name: "ITEM DEPRECIATION DATE", uid: "item_depreciation" },
    { name: "ITEM QUANTITY", uid: "item_quantity" },
    { name: "ACTIONS", uid: "actions" },
  ];
    
    
      
      const renderCell = (items, columnKey) => {
        const cellValue = items[columnKey];

        switch (columnKey) {

          case "id":
              return <p className="text-lg ">{items.id}</p>;
          case "item_name":
            return <p className="text-lg ">{items.name}</p>;
          case "item_description":
            return <p className="text-lg ">{items.description}</p>;
          case "item_date":
            return <p className="text-lg ">{items.order_date}</p>;
          case "item_depreciation":
            return <p className="text-lg ">{items.depriciation}</p>;
          case "item_quantity":
              return <p className="text-lg ">{items.quantity} {items.quantity_unit}</p>;
    
       

          case "actions":
            return (
              <Row justify="center" align="center">
              <Col css={{ d: "flex" }}>
                <Tooltip content="Item Details">
                  <IconButton  onClick={() => detailHandler(items)}>
                    <EyeIcon size={20} fill="#979797" />
                  </IconButton>
                </Tooltip>
              </Col>
              {/* <Col css={{ d: "flex" }}>
                <Tooltip content="Edit user">
                  <IconButton onClick={() => updateHandler(items)}>
                    <DeleteIcon size={20} fill="#979797" />
                  </IconButton>
                </Tooltip>
              </Col> */}
            </Row>
            );
          default:
            return cellValue;
        }
      };


    return ( 
      <>
          {/* <UpdateDepartmentModal
          type={type}
          visible={visible} 
          closeHandler={closeHandler} 
          department={orderRequestInfo} 
          /> */}

         
            <Table 
            headerLined
            shadow={false}
            aria-label={"user details table"}
            sticked={true}
            selectionMode="none"
            css={{
              height: "auto",
              minWidth: "auto",
            }}
            containerCss={{
              borderRadius: "8px",
              padding:"8px",
            }}
           
          >
        
            <Table.Header columns={columns}>
              {(column) => (
                <Table.Column
                  key={column.uid}
                >
                  {column.name}
                </Table.Column>
              )}
            </Table.Header>
            <Table.Body items={items}> 
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
              rowsPerPage={10}
            />
            </Table>
         
      </>
     );
}
 
export default ItemListTable;