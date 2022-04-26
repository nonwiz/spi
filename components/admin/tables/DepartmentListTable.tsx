import { Table, Row, Col, Tooltip, User, Text, Container } from "@nextui-org/react";
import { useState } from 'react'

import { IconButton } from "@/components/admin/icons/IconButton";
import { EyeIcon } from "@/components/admin/icons/EyeIcon";
import { EditIcon } from "@/components/admin/icons/EditIcon";
import { DeleteIcon } from "@/components/admin/icons/DeleteIcon";
import UpdateDepartmentModal from "@/components/admin/UpdateDepartmentModal";



const DepartmentListTable = ({department}) => {

  const [visible, setVisible] = useState(false);
  const [departmentInfo, setDepartment] = useState([]);
  const [type, setType] = useState("none");
  
  const detailHandler = (department) =>{
    setVisible(true);
    setDepartment(department);
    setType("view_details")
  }

  const updateHandler = (department) => {
    setVisible(true);
    setDepartment(department);
  }

  const closeHandler = () => {
    setVisible(false);
    setDepartment([])
    setType("none")
  };

  const getDeanName = (department, dean_id) =>{

      if(department.users.length >0 ){
        const dean_info = department.users.filter(user => user.id == dean_id)
        if(dean_info.length != 0){
            return (dean_info.at(0).name)
        }
      }else{
        return "not defined"
      }

  }
    const columns = [
        { name: "#", uid: "id" },
        { name: "DEPARTMENT NAME", uid: "name" },
        { name: "DEPARTMENT DEAN", uid: "dean" },
        { name: "DEPARTMENT BUDGET", uid: "budget" },
        { name: "ACTIONS", uid: "actions" },
      ];
      
      const renderCell = (department, columnKey) => {
        const cellValue = department[columnKey];

        switch (columnKey) {

          case "id":
              return <p className="text-lg ">{department.id}</p>;

          case "name":
            return <p className="text-lg md:mr-8">{department.name}</p>;
          
          case "dean":
            return <p className="text-lg md:mr-8">{getDeanName(department, department.current_dean_user_id)}</p>;

          case "budget":
            return <p className="text-lg md:mr-8">{department.budget}</p>;

          case "actions":
            return (
              <Row justify="center" align="center">
              <Col css={{ d: "flex" }}>
                <Tooltip content="Details">
                  <IconButton value={department} onClick={() => detailHandler(department)}>
                    <EyeIcon size={20} fill="#979797" />
                  </IconButton>
                </Tooltip>
              </Col>
              <Col css={{ d: "flex" }}>
                <Tooltip content="Edit user">
                  <IconButton onClick={() => updateHandler(department)}>
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
          <UpdateDepartmentModal
          type={type}
          visible={visible} 
          closeHandler={closeHandler} 
          department={departmentInfo} 
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
            <Table.Body items={department}> 
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
 
export default DepartmentListTable;