import express from "express";
const router = express.Router();

import { signup, fetchCurrentUser, deleteUser,addAddress, updateAddress,
    deleteAddress,addCard,updateCard,deleteCard,addOrder } from "../controllers/users.controller.js";

router.post("/", signup);
router.get("/", fetchCurrentUser);
router.delete("/", deleteUser)
router.post("/address", addAddress);
router.post("/update_address", updateAddress);
//Utilisez la méthode post pour rechercher l'utilisateur et supprimer l'adresse dans la liste
router.post("/delete_address", deleteAddress);
router.post("/card", addCard);
router.post("/update_card", updateCard);
//Utilisez la méthode post pour rechercher l'utilisateur et supprimer la cart dans la liste
router.post("/delete_card", deleteCard);
router.post("/order", addOrder);

export default router;
