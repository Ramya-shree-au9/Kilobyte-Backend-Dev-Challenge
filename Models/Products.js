import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
        name:{
            type: String,
            required:true
        },
        category:{
            type: String,
            required:true
        }
    
    
});

const Users = mongoose.model("Products",ProductSchema);

export default Users;
