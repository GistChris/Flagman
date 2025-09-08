import {
  createUser,
  findUserByEmail,
  findUserByID,
  deleteUserByEmail,
  addAddressToUser,
  updateAddressToUser,
  deleteAddressToUser,
  addCardToUser,
  updateCardToUser,
  deleteCardToUser,
  addOrderToUser,
} from "../queries/users.queries.js";
import { privateKey } from "../environment/keys/index.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  try {
    const user = await createUser(req.body);
    res.json(user);
  } catch (err) {
    res.json({ error: err.message });
  }
};
export const addAddress = async (req, res, next) => {
  try {
    const user = await addAddressToUser(req.body);
    res.json(user);
  } catch (err) {
    res.json({ error: err.message });
  }
};
export const updateAddress = async (req, res, next) => {
  try {
    const user = await updateAddressToUser(req.body);
    res.json(user);
  } catch (err) {
    res.json({ error: err.message });
  }
};
export const deleteAddress = async (req, res, next) => {
  try {
    const user = await deleteAddressToUser(req.body);
    res.json(user);
  } catch (err) {
    res.json({ error: err.message });
  }
};
export const addCard = async (req, res, next) => {
  try {
    const user = await addCardToUser(req.body);
    res.json(user);
  } catch (err) {
    res.json({ error: err.message });
  }
};
export const addOrder = async (req, res, next) => {
  try {
    const user = await addOrderToUser(req.body);

    res.json(user);
  } catch (err) {
    res.json({ error: err.message });
  }
};
export const updateCard = async (req, res, next) => {
  try {
    const user = await updateCardToUser(req.body);

    res.json(user);
  } catch (err) {
    res.json({ error: err.message });
  }
};
export const deleteCard = async (req, res, next) => {
  try {
    const user = await deleteCardToUser(req.body);
    res.json({ user });
    // res.json({ message: `Card  du ${user.name} deleted` });
  } catch (err) {
    res.json({ error: err.message });
  }
};
export const deleteUser = async (req, res, next) => {
  try {
    const user = await deleteUserByEmail(req.body.email);
    res.json({ message: `User ${user.name} deleted` });
  } catch (error) {
    res.json({ error: error.message });
  }
};

export const fetchCurrentUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log(token);
    if (token) {
      jwt.verify(token, privateKey, async (error, decoded) => {
        if (!error) {
          const user = await findUserByID(decoded.sub);
          if (user) {
            console.log("Fetched User", user.name);
            res.json(user);
            return;
          }
        } else {
          res.clearCookie("token");
          res.json(null);
        }
      });
    } else {
      res.json(null);
    }
  } catch (error) {
    console.log(error);
    res.json({ error: error.message });
  }
};
