import { getFieldsValues, fetcher } from "lib/fetcher";
import { useSWRConfig } from "swr";
import { useState } from "react";



const FormCreateOrderRequest = ({ orderTypes }: { orderTypes: object[] }) => {
  const { mutate } = useSWRConfig();
  const orderItemProperty = ["description", "size", "quantity", "unit_price", "amount", "type"]

  const [orderItem, setOrderItem] = useState([1, 1]);

  
  const handleCreateOrderRequest = async event => {
    event.preventDefault();
    const items = orderItem.map((item, i) =>
      orderItemProperty.map((prop, num) => `${orderItemProperty[num]}-${i}`))
    const flatItems = items.reduce((all, curr) => {
      return [...all, ...curr]
    }, [])

    const datas = [...flatItems, "purchase_reason"];

    const formData = getFieldsValues(event, datas);
    const cleanData = {
      items: [],
      purchase_reason: formData["purchase_reason"],
    }
    for (let i = 0; i < orderItem.length; i++) {
      const item = {};
      orderItemProperty.forEach(f => {
        item[f] = formData[`${f}-${i}`];
      })
      cleanData.items.push(item)
    }

    const formatedData = JSON.stringify(cleanData)


    fetcher("/api/customer/order/createOrderRequest", formatedData).then(d => {
      
      mutate("/api/admin")
    })

  }


  return <>
    <h2> Form create order request </h2>

    <form onSubmit={handleCreateOrderRequest}>
      {orderItem.map((item, num) =>
        <div className="" key={num}>
          <textarea placeholder="description" name={`description-${num}`} />
          <input type="text" placeholder="size" name={`size-${num}`} />
          <input type="text" placeholder="quantity" name={`quantity-${num}`} />
          <input type="text" placeholder="unit_price" name={`unit_price-${num}`} />
          <input type="text" placeholder="amount" name={`amount-${num}`} />
          <select name={`type-${num}`}>
            {orderTypes.map((item, id) => (
              <option key={id} value={item.type}> {item.type} </option>
            ))}
          </select>
        </div>
      )}

      <textarea placeholder="purchase_reason" name="purchase_reason" />



      <input type="submit" value="Request" className="p-2 border-2 border-solid m-2" />

    </form>
    <button onClick={() => setOrderItem([...orderItem, 1])}> Add item </button>
    <br />
    <button onClick={() => setOrderItem([...orderItem.slice(0, orderItem.length - 1)])}> Remove item </button>



  </>
}

export default FormCreateOrderRequest;
