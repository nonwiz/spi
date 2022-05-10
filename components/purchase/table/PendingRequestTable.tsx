import { Table, Row, Col, Tooltip, User, Text, Container, Grid } from "@nextui-org/react";
import { useRouter } from 'next/router'
import { useState } from 'react'
import { IconButton } from "@/components/admin/icons/IconButton";
import { EyeIcon } from "@/components/admin/icons/EyeIcon";
import { EditIcon } from "@/components/admin/icons/EditIcon";
import UpdateDepartmentModal from "@/components/admin/UpdateDepartmentModal";
import StyledStatus from "@/components/customer/StyledStatus";
import UpdateRegStatus from "../UpdateRegStatus";
import DateConvert from "@/components/dateConvert";




const PendingRequestTable = ({orderRequest, email, pageType}) => {

  const router = useRouter()
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("none");
  const [orderReq, setOrderRequest] = useState({})

  console.log("Here is pending request table", orderRequest)



  const detailHandler = (order) =>{
    setVisible(true);
    setType("view_details")
    setOrderRequest(order)
  }

  const updateHandler = (order) => {
    setVisible(true);
    setType("update_details")
    setOrderRequest(order)
  }

  const closeHandler = () => {
    setVisible(false);
    setType("none")
  };

    
  let columns;
    if (router.pathname=="/purchase") {
      columns = [
        { name: "#", uid: "id" },
        { name: "ORDER DESCRIPTION", uid: "order_description" },
        { name: "ORDER PRICE", uid: "order_price" },
        { name: "REQUEST DATE", uid: "order_date" },
        { name: "ORDER STATUS", uid: "order_status" },
        { name: "ACTIONS", uid: "actions" },
       
      ];
    } else {
      columns = [
        { name: "ROOM", uid: "id" },
        { name: "ORDER DESCRIPTION", uid: "order_description" },
        { name: "ORDER ITEMS", uid: "order_items" },
        { name: "ORDER PRICE", uid: "order_price" },
        { name: "REQUEST DATE", uid: "order_date" },
        { name: "ORDER STATUS", uid: "order_status" },
        { name: "ACTIONS", uid: "actions" },
      ];
    }
    
      
      const renderCell = (orderRequest, columnKey) => {
        const cellValue = orderRequest[columnKey];
          console.table(orderRequest)
        switch (columnKey) {

          case "id":
              return <p className="text-lg ">{orderRequest.location.short_code}</p>;
          case "order_description":
            return <p className="text-lg ">{orderRequest.purchase_reason}</p>;
          case "order_items":
            return <p className="text-lg ">{orderRequest.id}</p>;
          case "order_price":
            return <p className="text-lg ">{orderRequest.total_price}</p>;
          case "order_date":
              return <p className="text-lg "><DateConvert date={orderRequest.order_date} type="date" /></p>;
          case "order_status":
            return <StyledStatus status={`${orderRequest.approval_by.length > 0 && orderRequest.order_status == "Pending"? `Pending (${orderRequest.approval_by.length}/2)` : orderRequest.order_status}`} />
       

          case "actions":
            return (
              <Row justify="center" align="center">
              <Col css={{ d: "flex" }}>
                <Tooltip content="Order Details">
                  <IconButton  onClick={() => detailHandler(orderRequest)}>
                    <EyeIcon size={20} fill="#979797" />
                  </IconButton>
                </Tooltip>
              </Col>
              <Col css={{ d: "flex" }}>
                <Tooltip content="Update Order">
                  <IconButton onClick={() => updateHandler(orderRequest)}>
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
          <UpdateRegStatus
          type={type}
          email={email}
          visible={visible} 
          closeHandler={closeHandler} 
          orderRequest={orderReq}
          pageType ={pageType}
          />


            <Table 
            headerLined
            shadow={false}
            aria-label={"Pending Request table"}
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
            <Table.Body items={orderRequest} > 
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
 
export default PendingRequestTable;