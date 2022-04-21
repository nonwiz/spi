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
   
    // console.log("closed");
  };
    const columns = [
        { name: "NAME", uid: "name" },
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
              <User squared src={user.avatar} name={cellValue} className="text-sm capitalize text-gray-700">
                {user.email}
              </User>
            );
          case "role":
            return (
              <Col>
                <Row>
                  <Text size={14} className="text-sm capitalize text-gray-700">
                    {cellValue}
                  </Text>
                </Row>
                <Row>
                  <Text size={13}  className="text-sm text-gray-500 font-normal">
                    {user.team}
                  </Text>
                </Row>
              </Col>
            );
          case "status":
            return <StyledBadge type={user.status}>{cellValue}</StyledBadge>;

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
            css={{
              height: "auto",
              minWidth: "auto",
            
            }}
            containerCss={{
              borderRadius: "8px",
              padding:"8px",
            }}
            selectionMode="none"
          >
        
            <Table.Header columns={columns}>
              {(column) => (
                <Table.Column
                  key={column.uid}
                  hideHeader={column.uid === "actions"}
                  align={column.uid === "actions" ? "center" : "start"}
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
              rowsPerPage={7}
              total={10}
              onPageChange={(page) => console.log({ page })}
            />
            </Table>
         
      </>
     );
}
 
export default PaginatedTable;