import express from "express";
import {
  register,
  login,
  addcart,
  cartItemDelete,
  addDeliveryAdress
} from "../Controllers/usersController.js";

import {
  placeOrders,
  perticularPersonOrderList,
  orderslist,
  assignDeliveryPerson,
  updateorderslist
} from "../Controllers/Oderscontroller.js";

import {insertProducts} from "../Controllers/products.js";

import { validate} from '../Controllers/checkvalidate.js'

const router = express.Router();

// Product routes
router.post("/insertProducts",insertProducts);

// users routes
router.post("/register", register);
router.post("/login", login);
router.patch("/addcart/:id", validate, addcart);
router.delete("/cartItemDelete/:id", validate, cartItemDelete);
router.patch("/addDeliveryAdress/:id", validate, addDeliveryAdress);

// order routes
router.post("/placeOrders",validate, placeOrders);
router.get("/pertiPersonOrderList/:id",validate, perticularPersonOrderList);
router.get("/orderslist", validate, orderslist);
router.patch("/assignDeliveryPerson/:id", validate, assignDeliveryPerson);
router.patch("/updateorderslist/:id", validate, updateorderslist);



export default router;