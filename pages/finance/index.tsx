import Layout from "@/components/layout"
import { useFinance } from "lib/fetcher";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { fetcher } from "lib/fetcher"
import { useSWRConfig } from "swr"


export default function Page() {
  const { data: session } = useSession();
  const { data, isLoading } = useFinance();
  const [sItem, setSelected] = useState(0)
  const { mutate } = useSWRConfig()
  const [comment, setComment] = useState("");

  if (isLoading) return <p> Loading ... </p>

  const { orderRequests: ors } = data;

  console.log(data, ors[sItem]);

  const handleApprove = async (item: Number) => {
    fetcher("/api/common/order/approve", { orderId: item }).then((d) => {
      console.log(d)
      mutate("/api/departmentHead")
    })
  }

  const handleDeleteComment = async (item: Number) => {
    fetcher("/api/common/order/deleteComment", { commentId: item }).then((d) => {
      console.log(d)
      mutate("/api/departmentHead")
    })
  }

  const handleReject = async (item: Number) => {
    fetcher("/api/common/order/reject", { orderId: item }).then((d) => {
      console.log(d)
      mutate("/api/departmentHead")
    })
  }

  const handleComment = async (comment: String, item: Number) => {
    fetcher("/api/common/order/comment", { comment, orderId: item }).then((d) => {
      console.log(d)
      mutate("/api/departmentHead")
    })
  }

  return (
    <div className="p-4">
      <div className="p-2 my-4">
        <h1>Department Order Status </h1>
        <hr />
        {data.orderRequests.map((item, id) => <li key={id}>
          <button onClick={() => setSelected(id)}>{item.purchase_reason}</button> | {item.order_status} | requested by: {item.user.email} ...
        </li>)}
        <hr />
        <h2> Order Request Information </h2>
        {ors && ors[sItem] &&
          <div>
            <li> Purchase Reason: {ors[sItem].purchase_reason} | {ors[sItem].order_status} </li>
            <li> Items:
              <ul>
                {ors[sItem].order_items.map((item, i) =>
                  <li key={i}> {item.description} | {item.size} | {item.quantity} | {item.unit_price} | Type: {item.type} | Total: {item.amount} </li>)}
              </ul>
            </li>
            <li> Total cost: {ors[sItem].total_price} baht </li>

            <li> Approved by {ors[sItem].approval_by.map((item, k) =>
              <span key={k}>{item.role}, </span>)}</li>

            <li> Comments: {ors[sItem].comment_by.map((item, k) =>
              <span key={k}>{item.role}, {item.user}: {item.comment}, {item.user == data.user.email && <button onClick={e => handleDeleteComment(item.id)}> Delete </button>} </span>)}</li>

            <button onClick={e => handleApprove(ors[sItem].id)}> Approve </button>
            <br />
            <p> Remark: {ors[sItem].remark ? ors[sItem].remark : "No remark"} </p>

            <textarea name="reason" placeholder="Comment" onChange={(e) => setComment(e.target.value)} />
            <button onClick={e => handleComment(comment, ors[sItem].id)}> Comment </button>
            <button onClick={e => handleReject(ors[sItem].id)}> Reject</button>
          </div>
        }

      </div>
    </div>
  )
}

