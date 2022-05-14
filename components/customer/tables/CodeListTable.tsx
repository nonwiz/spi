import { Table, Row, Col, Tooltip, User, Text, Container } from "@nextui-org/react";
import { useRouter } from 'next/router'
import { useState } from 'react'
import { IconButton } from "@/components/admin/icons/IconButton";
import { EyeIcon } from "@/components/admin/icons/EyeIcon";
import { EditIcon } from "@/components/admin/icons/EditIcon";
import { checkDepreciation } from "lib/fetcher"
import UpdateDepartmentModal from "@/components/admin/UpdateDepartmentModal";
import StyledStatus from "../StyledStatus";
import {DeleteIcon} from "../icons/DeleteIcon";
import DateConvert from "@/components/dateConvert";



const CodeListTable = ({codes}) => {
  const router = useRouter()
  const [visible, setVisible] = useState(false);
  const [itemInfo, setItemInfo] = useState([]);
  const [type, setType] = useState("none");


  const columns = [
    
    { name: "#", uid: "id" },
    { name: "NAME", uid: "name" },
    { name: "CODE", uid: "code" },
    { name: "TYPE", uid: "type" },
  ];
    
    
  let count =1;
      const renderCell = (items, columnKey) => {
        const cellValue = items[columnKey];
     
        switch (columnKey) {

          case "id":
              return <p className="text-lg ">{count++}</p>;
          
          case "code":
            return <p className="text-lg ">{items.code}</p>;
          case "name":
            return <p className="text-lg ">{items.name}</p>;
          case "type":
            return <p className="text-lg ">{items.codeType}</p>;

          default:
            return cellValue;
        }
      };


    return ( 
      <>
          {/* <UpdateDepartmentModal
          type={type}
          visible={visible} 
          closeHandler={closeHandler} 
          department={orderRequestInfo} 
          /> */}

         
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
            <Table.Body items={codes}> 
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
 
export default CodeListTable;


