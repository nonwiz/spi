import { Table, Row, Col, Tooltip, User, Text, Container } from "@nextui-org/react";
import { useState } from 'react'
import { StyledBadge } from "@/components/admin/icons/StyledBadge";
import { IconButton } from "@/components/admin/icons/IconButton";
import { EyeIcon } from "@/components/admin/icons/EyeIcon";
import { EditIcon } from "@/components/admin/icons/EditIcon";
import { DeleteIcon } from "@/components/admin/icons/DeleteIcon";
import ChangeRoleModal from "@/components/admin/ChangeRoleModal";


const UserListTable = ({users, roles}) => {

  const [visible, setVisible] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [type, setType] = useState("viewDetails");
  
  const detailHandler = (user) =>{
    setVisible(true);
    setUserInfo(user);
  }

  const updateHandler = (user) => {
    setVisible(true);
    setUserInfo(user);
    setType("updateDetails")

  }

  const closeHandler = () => {
    setVisible(false);
    setUserInfo([])
    setType("viewDetails")
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
            return <User squared  src="https://i.pravatar.cc/150?u=a04258114e29026702d" name={cellValue} className="text-sm capitalize text-gray-700 text-wrap" />;

          case "email":
              return <p className="text-lg md:mr-8">{user.email}</p>;

          case "role":
            return <p className="text-lg md:mr-8">{user.role}</p>;

          case "department":
            return <p className="text-lg md:mr-8">{user.department ? user.department.name : "Not assigned"}</p>;

          case "location":
            return <p className="text-lg md:mr-8">{user.location ? `${user.location.zone} ${user.location.room_number}` : "Not assigned"}</p>;

          case "actions":
            return (
              <Row justify="center" align="center">
              <Col css={{ d: "flex" }}>
                <Tooltip content="Details">
                  <IconButton value={user} onClick={() => detailHandler(user)}>
                    <EyeIcon size={20} fill="#979797" />
                  </IconButton>
                </Tooltip>
              </Col>
              <Col css={{ d: "flex" }}>
                <Tooltip content="Edit user">
                  <IconButton onClick={() => updateHandler(user)}>
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
          <ChangeRoleModal visible={visible} closeHandler={closeHandler} user={userInfo} type={type} roles={roles} />
          
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
            <Table.Body items={users}> 
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
              rowsPerPage={5}
              total={2}
              onPageChange={(page) => console.log({ page })}
            />
            </Table>
         
      </>
     );
}
 
export default UserListTable;