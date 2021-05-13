import mongoose from "mongoose";

const UsersSchema = mongoose.Schema({
  phoneno: {
    type: String,
    required:true
  },
  password: {
    type: String,
    required:true
  },
  role: {
    type: String,
  },
  cart:[
    {
      productID:{
        type: String,
      },
      quantity:{
        type:String,
        default:1
      }
    }
  ],
  deliveryAdress:[
    {
      place:{
        type:String,
      }
    }
  ]
  
  
});

const Users = mongoose.model("usersdet", UsersSchema);

export default Users;
