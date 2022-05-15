import { Table, Row, Col, Tooltip, User, Text, Container } from "@nextui-org/react";
import { useState } from 'react'
import { StyledBadge } from "@/components/customer/StyledStatus";
import { IconButton } from "@/components/admin/icons/IconButton";
import { EyeIcon } from "@/components/admin/icons/EyeIcon";
import { EditIcon } from "@/components/admin/icons/EditIcon";
import { DeleteIcon } from "@/components/admin/icons/DeleteIcon";
import UpdateLocationModal from "@/components/admin/UpdateLocationModal";
import DateConvert from "@/components/dateConvert";


const LocationListTable = ({location}) => {

  const [visible, setVisible] = useState(false);
  const [locationInfo, setLocation] = useState([]);
  const [type, setType] = useState("none");
  
  const detailHandler = (location) =>{
    setVisible(true);
    setLocation(location);
    setType("view_details")
  }

  const updateHandler = (location) => {
    setVisible(true);
    setLocation(location);
  }

  const closeHandler = () => {
    setVisible(false);
    setLocation([])
    setType("none")
  };

 
    const columns = [
        { name: "#", uid: "short_code" },
        { name: "BUILDING", uid: "building" },
        { name: "FLOOR", uid: "floor" },
        { name: "ROOM NUMBER", uid: "room_number" },
        { name: "UPDATE DATE", uid: "update_date" },
        { name: "ACTIONS", uid: "actions" },
      ];
      
      const renderCell = (location, columnKey) => {
        const cellValue = location[columnKey];

        switch (columnKey) {

          case "short_code":
              return <p className="text-lg ">{location.short_code}</p>;

          case "building":
            return <p className="text-lg md:mr-8">{location.building}</p>;
          
          case "floor":
            return <p className="text-lg md:mr-8">{location.floor}</p>;

          case "room_number":
            return <p className="text-lg md:mr-8">{location.room_number}</p>;

          case "update_date":
            return <p className="text-lg md:mr-8"><DateConvert date={location.update_date}/></p>;
    
          
          case "actions":
            return (
              <Row justify="center" align="center">
              <Col css={{ d: "flex" }}>
                <Tooltip content="View Details">
                  <IconButton value={location} onClick={() => detailHandler(location)}>
                    <EyeIcon size={20} fill="#979797" />
                  </IconButton>
                </Tooltip>
              </Col>
              <Col css={{ d: "flex" }}>
                <Tooltip content="Edit Location">
                  <IconButton onClick={() => updateHandler(location)}>
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
          <UpdateLocationModal
          type={type}
          visible={visible} 
          closeHandler={closeHandler} 
          location={locationInfo} 
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
            <Table.Body items={location}> 
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
 
export default LocationListTable;