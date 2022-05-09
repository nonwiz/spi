import { Table, Row, Col, Tooltip, User, Text, Container } from "@nextui-org/react";
import { useState } from 'react'
import { StyledBadge } from "@/components/customer/StyledStatus";
import { IconButton } from "@/components/admin/icons/IconButton";
import { EyeIcon } from "@/components/admin/icons/EyeIcon";
import { EditIcon } from "@/components/admin/icons/EditIcon";
import { DeleteIcon } from "@/components/admin/icons/DeleteIcon";
import ChangeRoleModal from "@/components/admin/ChangeRoleModal";
import { ProfileIcon } from "../icons/ProfileIcon";


const UserListTable = ({users, roles}) => {

  const [visible, setVisible] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [type, setType] = useState("none");
  
  const detailHandler = (user) =>{
    setVisible(true);
    setUserInfo(user);
    setType("view_details")
  }

  const updateHandler = (user) => {
    setVisible(true);
    setUserInfo(user);
  }

  const closeHandler = () => {
    setVisible(false);
    setUserInfo([])
    setType("none")
  };

 
    const columns = [
        { name: "NAME", uid: "name" },
        // { name: "EMAIL", uid: "email" },
        { name: "ROLE", uid: "role" },
        { name: "DEPARTMENT", uid: "department" },
        { name: "LOCATION", uid: "location" },
        { name: "ACTIONS", uid: "actions" },
      ];
      
      const renderCell = (user, columnKey) => {
        const cellValue = user[columnKey];
        switch (columnKey) {
          case "name":
            return <div className="flex gap-1 items-center fill-gray-700">
              <ProfileIcon className={"w-8 h-8"}/>
                    <div className="text-lg">
                      <p>{user.name}</p> <p className="-mt-1">{user.email}</p>
                    </div>
                  </div>
            // return <User name={cellValue} className="text-sm capitalize text-wrap">
            //   <span className="text-gray-500 font-semibold">{user.email}</span>
            //  </User>;

          // case "email":
          //     return <p className="text-lg md:mr-8">{user.email}</p>;

          case "role":
            return <p className="text-lg md:mr-8">{user.role}</p>;

          case "department":
            return <p className="text-lg md:mr-8">{user.department ? user.department.name : "Not assigned"}</p>;

          case "location":
            return <p className="text-lg md:mr-8">{user.location ? `${user.location.short_code}` : "Not assigned"}</p>;

          case "actions":
            return (
              <Row justify="center" align="center">
              <Col css={{ d: "flex" }}>
                <Tooltip content="View User Details">
                  <IconButton value={user} onClick={() => detailHandler(user)}>
                    <EyeIcon size={20} fill="#979797" />
                  </IconButton>
                </Tooltip>
              </Col>
              <Col css={{ d: "flex" }}>
                <Tooltip content="Edit User Role">
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
              rowsPerPage={9}
     
              onPageChange={(page) => console.log({ page })}
            />
            </Table>
         
      </>
     );
}
 
export default UserListTable;