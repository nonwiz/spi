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
import Link from "next/link";


const LocationListTable = ({locations}) => {
  const router = useRouter()
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("none");
  const [orderReq, setOrderRequest] = useState({})


  const detailHandler = (locations) =>{
    setVisible(true);
    setType("view_details")
    setOrderRequest(order)
  }

  // const updateHandler = (order) => {
  //   setVisible(true);
  //   setType("update_details")
  //   setOrderRequest(order)
  // }

  const closeHandler = () => {
    setVisible(false);
    setType("none")
  };
    
  let columns = [
        { name: "#", uid: "id" },
        { name: "BUILDING", uid: "building"},
        { name: "ROOM", uid: "room" },
        { name: "FLOOR", uid: "floor" },
        { name: "NUMBER of ITEMS", uid: "items" },
        { name: "DESCRIPTION", uid: "description" },
        { name: "ACTIONS", uid: "actions" },
       
      ];
   
      const renderCell = (locations, columnKey) => {
        const cellValue = locations[columnKey];
        switch (columnKey) {

          case "id":
              return <p className="text-lg ">{locations.id}</p>;
          case "building":
            return <p className="text-lg ">{locations.building}</p>;

          case "floor":
            return <p className="text-lg ">{locations.floor}</p>;

          case "room":
            return <p className="text-lg ">{locations.room_number}</p>;
          case "items":
            return <p className="text-lg ">{(locations.items.length>0)?`Contains ${locations.items.length} item `: "No items"}</p>;
          case "description":
            return <p className="text-lg ">{locations.price}</p>;
       
          case "actions":
            return (
              <Row justify="center" align="center">
              <Col css={{  }} className="ml-6">
                <Tooltip content="Location Details" >
              
                    <Link href={'/inventory/locationList/' + locations.id} key={locations.id}>
                        <EyeIcon size={20} fill="#979797" />
                    </Link>
                 
                </Tooltip>
              </Col>
              {/* <Col css={{ d: "flex" }}>
                <Tooltip content="Update Order">
                  <IconButton onClick={() => updateHandler(items)}>
                    <EditIcon size={20} fill="#979797" />
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
            <Table.Body items={locations} > 
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
 
export default LocationListTable;