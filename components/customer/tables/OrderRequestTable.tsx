import { Table, Row, Col, Tooltip, User, Text, Container } from "@nextui-org/react";
import { useRouter } from 'next/router'
import { useState } from 'react'
import { IconButton } from "@/components/admin/icons/IconButton";
import { EyeIcon } from "@/components/admin/icons/EyeIcon";
import { EditIcon } from "@/components/admin/icons/EditIcon";

import UpdateDepartmentModal from "@/components/admin/UpdateDepartmentModal";
import StyledStatus from "../StyledStatus";
import {DeleteIcon} from "../icons/DeleteIcon";



const OrderRequestTable = ({orderRequest}) => {
  const router = useRouter()
  const [visible, setVisible] = useState(false);
  const [orderRequestInfo, setOrderRequestt] = useState([]);
  const [type, setType] = useState("none");
  
  const detailHandler = (orderRequest) =>{
    setVisible(true);
    setOrderRequestt(orderRequest);
    setType("view_details")
  }

  const updateHandler = (orderRequest) => {
    setVisible(true);
    setOrderRequestt(orderRequest);
  }

  const closeHandler = () => {
    setVisible(false);
    setOrderRequestt([])
    setType("none")
  };
    
  let columns;
    if (router.pathname=="/customer") {
      columns = [
        { name: "#", uid: "id" },
        { name: "ORDER DESCRIPTION", uid: "order_description" },
        { name: "ORDER PRICE", uid: "order_price" },
        { name: "ORDER DATE", uid: "order_date" },
        { name: "ORDER STATUS", uid: "order_status" },
       
      ];
    } else {
      columns = [
        { name: "#", uid: "id" },
        { name: "ORDER DESCRIPTION", uid: "order_description" },
        { name: "ORDER ITEMS", uid: "order_items" },
        { name: "ORDER PRICE", uid: "order_price" },
        { name: "ORDER DATE", uid: "order_date" },
        { name: "ORDER STATUS", uid: "order_status" },
        { name: "ACTIONS", uid: "actions" },
      ];
    }
    
      
      const renderCell = (orderRequest, columnKey) => {
        const cellValue = orderRequest[columnKey];

        switch (columnKey) {

          case "id":
              return <p className="text-lg ">{orderRequest.id}</p>;
          case "order_description":
            return <p className="text-lg ">{orderRequest.purchase_reason}</p>;
          case "order_items":
            return <p className="text-lg ">{orderRequest.id}</p>;
          case "order_price":
            return <p className="text-lg ">{orderRequest.total_price}</p>;
          case "order_date":
              return <p className="text-lg ">{orderRequest.order_date}</p>;
          case "order_status":
             return <StyledStatus status={orderRequest.order_status} />
       

          case "actions":
            return (
              <Row justify="center" align="center">
              <Col css={{ d: "flex" }}>
                <Tooltip content="View Order Details">
                  <IconButton  onClick={() => detailHandler(orderRequest)}>
                    <EyeIcon size={20} fill="#979797" />
                  </IconButton>
                </Tooltip>
              </Col>
              <Col css={{ d: "flex" }}>
                <Tooltip content="Cancel Order">
                  <IconButton onClick={() => updateHandler(orderRequest)}>
                    <DeleteIcon size={20} fill="#979797" />
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
          <UpdateDepartmentModal
          type={type}
          visible={visible} 
          closeHandler={closeHandler} 
          department={orderRequestInfo} 
          />

         
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
            <Table.Body items={orderRequest}> 
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
              rowsPerPage={(router.pathname=="/customer")?5:10}
            />
            </Table>
         
      </>
     );
}
 
export default OrderRequestTable;