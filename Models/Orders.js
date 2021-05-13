import mongoose from "mongoose";

const OrdersSchema = mongoose.Schema({
    customerID:{
        type: String,
        required:true
    },
    productID:{
        type: String,
        required:true
    },
    quantity: {
        type: String,
        required:true
    },
    orderStatus:{
        type: String,
        default:"pending"
    },
    orderdate: {
        type: Date,
        default: Date.now,
      },
    updatedate:{
        type: Date,
        default: Date.now,
    },
    deliverpersonId:{
        type: String
    }
  
  
});

const Users = mongoose.model("orders", OrdersSchema);

export default Users;
