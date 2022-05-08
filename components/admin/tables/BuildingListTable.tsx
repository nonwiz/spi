import { Table, Row, Col, Tooltip, User, Text, Container } from "@nextui-org/react";
import { useState } from 'react'

import { IconButton } from "@/components/admin/icons/IconButton";
import { EyeIcon } from "@/components/admin/icons/EyeIcon";
import { EditIcon } from "@/components/admin/icons/EditIcon";
import { DeleteIcon } from "@/components/admin/icons/DeleteIcon";
import UpdateBuildingModal from "@/components/admin/UpdateBuildingModal";



const BuildingListTable = ({building}) => {

  const [visible, setVisible] = useState(false);
  const [buildingInfo, setBuilding] = useState([]);
  const [type, setType] = useState("none");
  
  const detailHandler = (building) =>{
    setVisible(true);
    setBuilding(building);
    setType("view_details")
  }

  const updateHandler = (building) => {
    setVisible(true);
    setBuilding(building);
  }

  const closeHandler = () => {
    setVisible(false);
    setBuilding([])
    setType("none")
  };

  const getDeanName = (building, dean_id) =>{

      if(building?.users?.length >0 ){
        const dean_info = building.users.filter(user => user.id == dean_id)
        if(dean_info.length != 0){
            return (dean_info.at(0).name)
        }
      }else{
        return "not defined"
      }

  }
    const columns = [
        { name: "#", uid: "id" },
        { name: "building NAME", uid: "name" },
        { name: "building DEAN", uid: "dean" },
        { name: "building BUDGET", uid: "budget" },
        { name: "ACTIONS", uid: "actions" },
      ];
      
      const renderCell = (building, columnKey) => {
        const cellValue = building[columnKey];

        switch (columnKey) {

          case "id":
              return <p className="text-lg ">{building.id}</p>;

          case "name":
            return <p className="text-lg md:mr-8">{building.name}</p>;
          
          case "dean":
            return <p className="text-lg md:mr-8">{getDeanName(building, building.current_dean_user_id)}</p>;

          case "budget":
            return <p className="text-lg md:mr-8">{building.budget}</p>;

          case "actions":
            return (
              <Row justify="center" align="center">
              <Col css={{ d: "flex" }}>
                <Tooltip content="View Details">
                  <IconButton value={building} onClick={() => detailHandler(building)}>
                    <EyeIcon size={20} fill="#979797" />
                  </IconButton>
                </Tooltip>
              </Col>
              <Col css={{ d: "flex" }}>
                <Tooltip content="Edit Building">
                  <IconButton onClick={() => updateHandler(building)}>
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
          <UpdateBuildingModal
          type={type}
          visible={visible} 
          closeHandler={closeHandler} 
          building={buildingInfo} 
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
            <Table.Body items={building}> 
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
              
              onPageChange={(page) => console.log({ page })}
            />
            </Table>
         
      </>
     );
}
 
export default BuildingListTable;