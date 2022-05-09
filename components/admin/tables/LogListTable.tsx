import { Table, Row, Col, Tooltip, User, Text, Container } from "@nextui-org/react";
import { useState } from 'react'
import { StyledBadge } from "@/components/customer/StyledStatus";
import { IconButton } from "@/components/admin/icons/IconButton";
import { EyeIcon } from "@/components/admin/icons/EyeIcon";
import { EditIcon } from "@/components/admin/icons/EditIcon";
import { DeleteIcon } from "@/components/admin/icons/DeleteIcon";
import ChangeRoleModal from "@/components/admin/ChangeRoleModal";
import { ProfileIcon } from "../icons/ProfileIcon";


const LogListTable = ({logs}) => {


  const formatDate = (date) =>{
    return new Date(date).toLocaleString('en-us',{dateStyle: 'medium', timeStyle: 'short'})
  }

 
    const columns = [
        { name: "#", uid: "id" },
        // { name: "EMAIL", uid: "email" },
        { name: "MODEL", uid: "model" },
        { name: "DESCRIPTION", uid: "description" },
        { name: "OPERATION", uid: "operation" },
        { name: "USER", uid: "user" },
        { name: "DATE & TIME", uid: "timestamp" },
      ];
      
      const renderCell = (log, columnKey) => {
        const cellValue = log[columnKey];
        switch (columnKey) {
          case "id":
            return <p className="text-lg md:mr-8">{log.id}</p>;

          case "model":
            return <p className="text-lg md:mr-8">{log.model}</p>;

          case "description":
            return <p className="text-lg md:mr-8">{log.message}</p>;

          case "operation":
            return <div className={(log?.operation=="Update")?"bg-yellow-400 w-[80%] rounded-full":"bg-green-400  w-[80%] rounded-full"}><p className="text-lg md:mr-8 text-center w-full">{log.operation }</p></div>;

          case "user":
            return <p className="text-lg md:mr-8">{log.user }</p>;

          case "timestamp":
            return <p className="text-lg md:mr-8">{formatDate(log.timestamp)}</p>;
    
        
          default:
            return cellValue;
        }
      };


    return ( 
      <>
          <Table  headerLined
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
            }}>
            <Table.Header columns={columns}>
              {(column) => (
                <Table.Column
                  key={column.uid}
                >
                  {column.name}
                </Table.Column>
              )}
            </Table.Header>
            <Table.Body items={logs}> 
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
              rowsPerPage={14}
     
              onPageChange={(page) => console.log({ page })}
            />
            </Table>
         
      </>
     );
}
 
export default LogListTable;