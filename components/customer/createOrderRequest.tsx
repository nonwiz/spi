import { getFieldsValues, fetcher } from "lib/fetcher";
import { useSWRConfig } from "swr";
import { useState } from "react";



const FormCreateOrderRequest = ({orderTypes}: {orderTypes: object[]}) => {
  const { mutate } = useSWRConfig();

    const [orderItem, setOrderItem] = useState([1, 2]);
  const handleCreateOrderRequest = async event => {
    event.preventDefault();
    const formData = getFieldsValues(event, ["user", "id"])
    fetcher("/api/admin/department/addUser", formData).then(d => {
      console.log(d)
      mutate("/api/admin")
    })

  }


  return <>
        <h2> Form create order request</h2>
        <form onSubmit={handleCreateOrderRequest}>
{orderItem.map((num) => 
  <div className="flex flex-row" key={num}> 
      <textarea placeholder="description" name={`description-${num}`} />
      <input type="text" placeholder="size" name={`size-${num}`}/>
      <input type="text" placeholder="quantity" name={`quantity-${num}`}/>
      <input type="text" placeholder="unit_price" name={`unit_price-${num}`}/>
      <input type="text" placeholder="amount" name={`amount-${num}`}/>
  </div>



      )}
         <textarea placeholder="purchase_reason" name="purchase_reason" />

      <select name="type">
{orderTypes.map((item, id) => (
          <option value={item.id}> {item.type} </option>
      ))}
  </select>

           <input type="submit" value="Request" className="p-2 border-2 border-solid m-2" />

        </form>
 
  </>
}

export default FormCreateOrderRequest;
