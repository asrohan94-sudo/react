import express from "express";



import {
  listMethods,
  addMethod,
  updateMethod,
  deleteMethod,
} from "../controllers/PaymentController.js";

const paymentRouter = express.Router();

paymentRouter.get("/", listMethods);
paymentRouter.post("/", addMethod);
paymentRouter.put("/:id", updateMethod);
paymentRouter.delete("/:id", deleteMethod);



export default paymentRouter;