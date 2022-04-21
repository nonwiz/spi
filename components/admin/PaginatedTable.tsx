import { Table, Row, Col, Tooltip, User, Text, Container } from "@nextui-org/react";
import { useState } from 'react'
import { StyledBadge } from "@/components/admin/icons/StyledBadge";
import { IconButton } from "@/components/admin/icons/IconButton";
import { EyeIcon } from "@/components/admin/icons/EyeIcon";
import { EditIcon } from "@/components/admin/icons/EditIcon";
import { DeleteIcon } from "@/components/admin/icons/DeleteIcon";
import PopupModal from "./PopupModal";

const PaginatedTable = ({users}) => {

  const [visible, setVisible] = useState(false);

  const detailHandler = () => {
    setVisible(true);
  }
  const updateHandler = () => {
    setVisible(true);
  }

  const closeHandler = () => {
    setVisible(false);
  };

 
    const columns = [
        { name: "NAME", uid: "name" },
        { name: "EMAIL", uid: "email" },
        { name: "ROLE", uid: "role" },
        { name: "DEPARTMENT", uid: "department" },
        { name: "LOCATION", uid: "location" },
        { name: "ACTIONS", uid: "actions" },
      ];
      
      const renderCell = (user, columnKey) => {
        const cellValue = user[columnKey];
        switch (columnKey) {
          case "name":
            return (
              <User squared zoomed src="https://i.pravatar.cc/150?u=a04258114e29026702d" name={cellValue} className="text-sm capitalize text-gray-700" />
       
            );
          
          case "department":
            return <span>{user.department ? user.department.name : "Not assigned"}</span>;
 
          case "location":
            return <span>{user.location ? `${user.location.zone} ${user.location.room_number}` : "Not assigned"}</span>;
    
          case "actions":
            return (
              <Row justify="center" align="center">
                <Col css={{ d: "flex" }}>
                  <Tooltip content="Details">
                    <IconButton value={"hello"} onClick={detailHandler}>
                      <EyeIcon size={20} fill="#979797" />
                    </IconButton>
                  </Tooltip>
                </Col>
                <Col css={{ d: "flex" }}>
                  <Tooltip content="Edit user">
                    <IconButton onClick={updateHandler}>
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
          <PopupModal visible={visible} closeHandler={closeHandler} />
          
            <Table 
            headerLined
            shadow={false}
            aria-label={"recently added users"}
            sticked={true}
            selectionMode="single"
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
            <Table.Body items={users}> 
              {(item) => (
                <Table.Row>
                  {(columnKey) => (
                    <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
                  )}
                </Table.Row>
              )}
            </Table.Body>
      
            <Table.Pagination
              noMargin
              align="center"
              rowsPerPage={5}
              total={2}
              onPageChange={(page) => console.log({ page })}
            />
            </Table>
         
      </>
     );
}
 
export default PaginatedTable;