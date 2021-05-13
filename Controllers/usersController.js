import Users from "../Models/usermodel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config.js";

export const register = async (req, res) => {
  const {phoneno, password, role} = req.body;
  var hashpassword = bcrypt.hashSync(password, 8);
  Users.findOne({ phoneno:phoneno }, async (err, data) => {
    try {
      if (data) {
        res
          .status(200)
          .send({ message: "Phone number already taken,try another one" });
      } else {
        Users.create(
          {
            phoneno: phoneno,
            password: hashpassword,
            role: role ? role : "user",
          },
          (err, user) => {
            try {
              res
                .status(200)
                .send({ data: user, message: "Registered Successfully" });
            } catch (err) {
              console.log(err);
              res.status(404);
            }
          }
        );
      }
    } catch (err) {
      console.log(err);
      res.status(404).send();
    }
  });
};


export const login = async (req, res) => {
  Users.findOne({ phoneno: req.body.phoneno }, (err, data) => {
    try {
      if (!data) {
        res.status(200).send({ message: "Phone number is not registered" });
      } else if (!bcrypt.compareSync(req.body.password, data.password)) {
        res
          .status(200)
          .send({ messagep: "Incorrect Password" });
      } else {
          
        var token = jwt.sign({id: data._id }, config.secrete, {
          expiresIn: 3600,
        });
        res.status(200).send({
          auth: true,
          token: token,
          data: data,
          message: "Login Successfully",
        });
      }
    } catch {
      res.status(404);
    }
  });
}; 

export const addcart = async(req,res)=>{
  const id=req.params.id
    try {
      Users.findByIdAndUpdate(id,
        {$push: {"cart": req.body}},
        {new: true, upsert:true},(err,data)=>{
            res.status(200).send(data) 
      })
      } catch {
        res.status(404).send(err)
      }
}

export const cartItemDelete = async(req,res)=>{
  try {
      Users.findOneAndUpdate({'cart._id':req.params.id},
      {$pull:{cart:{_id:req.params.id}}},{ safe: true },
     (err,result)=>{
          res.status(200).send({data:result})  
    })
  }
     catch {
      res.status(404).send(err)
    }
}


export const addDeliveryAdress = async(req,res)=>{
  const id=req.params.id
    try {
      Users.findByIdAndUpdate(id,
        {$push: {"deliveryAdress": req.body}},
        {new: true,upsert:true},(err,data)=>{
            res.status(200).send({data:data}) 
      })
      } catch {
        res.status(404).send(err)
      }
}


