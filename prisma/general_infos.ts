// Building, Order Status, ItemSize, QuantityUnit records
const order_statuses = [
 {
        name: "Pending",
        type: "order_status"
    },
    {
        name: "Approved",
        type: "order_status"
    },

    {
        name: "Purchased",
        type: "order_status"
    },
    {
        name: "Rejected",
        type: "order_status"
    },

]

const item_sizes = [    
    {
        name: "small",
        type: "item_size"
    },
    {
        name: "medium",
        type: "item_size"
    },
    {
        name: "large",
        type: "item_size"
    },
    {
        name: "extra_large",
        type: "item_size"
    },
    {
        name: "other",
        type: "item_size"
    },
]

const quantity_units = [
    {
        name: "kilogram",
        type: "quantity_unit"
    },
    {
        name: "gram",
        type: "quantity_unit"
    },
    {
        name: "inches",
        type: "quantity_unit"
    },
    {
        name: "meter",
        type: "quantity_unit"
    },
    {
        name: "pound",
        type: "quantity_unit"
    },
    {
        name: "litre",
        type: "quantity_unit"
    },
    {
        name: "square_meter",
        type: "quantity_unit"
    },
    {
        name: "cubic_meter",
        type: "quantity_unit"
    },
    {
        name: "other quantity",
        type: "quantity_unit"
    },


]


export const general_infos = [
    ...order_statuses, ...item_sizes, ...quantity_units
]