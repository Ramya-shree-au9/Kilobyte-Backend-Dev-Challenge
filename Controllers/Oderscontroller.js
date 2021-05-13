import Orders from "../Models/Orders.js";

export const placeOrders = async (req, res) => {
    try {
        const order = await Orders.insertMany(req.body);
        res.status(200).send(order);
      } catch (err) {
        res.status(404)
      }
}

export const perticularPersonOrderList = async (req, res) => {
  try {
    Orders.find({'customerID':req.params.id},(err,result)=>{
      res.status(200).send(result);
    })
  } catch (err) {
    res.status(404);
  }
}

export const orderslist = async (req, res) => {
  if(req.body.role === 'admin'){
  try {
    const result=await Orders.find().sort({orderedDate:-1})
      res.status(200).send(result);
    
  } catch (err) {
    res.status(404);
  }
}else{
    res.status(200).send("Your not a admin");
}
}

export const assignDeliveryPerson = async (req, res) => {
    var orderId = req.params.id
  if(req.body.role === 'admin'){
  try {
    const result=await Orders.findByIdAndUpdate(orderId,{
        deliverpersonId:req.body.deliverpersonId,
      },{ new: true })  
        res.status(200).send(result);   
    } catch (err) {
      res.status(404);
    }
}else{
    res.status(200).send("Your not a admin");
}
}

export const updateorderslist = async (req, res) => {
    if(req.body.role ==='driver'){
    try {
      const result=await Orders.findByIdAndUpdate(req.params.id,{
        orderStatus:req.body.orderStatus,
        updatedate:Date.now
      },{ new: true })  
        res.status(200).send(result);   
    } catch (err) {
      res.status(404);
    }
    }else{
        res.status(200).send("Your not a driver");
    }
  }