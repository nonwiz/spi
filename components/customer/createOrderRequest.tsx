import { getFieldsValues, fetcher } from "lib/fetcher";
import { useSWRConfig } from "swr";
import { useState } from "react";



const FormCreateOrderRequest = ({orderTypes}: {orderTypes: object[]}) => {
  const { mutate } = useSWRConfig();
  const orderItemProperty = ["description", "size", "quantity", "unit_price", "amount"]

  const [orderItem, setOrderItem] = useState([1, 1]);


  const handleCreateOrderRequest = async event => {
    event.preventDefault();
    const items = orderItem.map((item, i) => 
     orderItemProperty.map((prop, num) => `${orderItemProperty[num]}-${i}`))
  const flatItems = items.reduce((all, curr) => {
        return [...all, ...curr]
      }, [])

    const datas =  [...flatItems, "purchase_reason", "type"];
    console.log({datas})
    const formData = getFieldsValues(event, datas );
    formData["orderItem"] = orderItem;

    console.log({formData})
    // fetcher("/api/admin/department/addUser", formData).then(d => {
    //   console.log(d)
    //   mutate("/api/admin")
    // })

  }


  return <>
    <h2> Form create order request </h2>

    <form onSubmit={handleCreateOrderRequest}>
      {orderItem.map((item, num) => 
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
          <option key={id} value={item.id}> {item.type} </option>
        ))}
      </select>


      <input type="submit" value="Request" className="p-2 border-2 border-solid m-2" />

    </form>
    <button onClick={() => setOrderItem([...orderItem, 1])}> Add item </button>
    <br />
    <button onClick={() => setOrderItem([...orderItem.slice(0, orderItem.length - 1)])}> Remove item </button>



    </>
}

export default FormCreateOrderRequest;
