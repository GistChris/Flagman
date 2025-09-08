import User from "../database/models/user.model.js";

export const findUserByID = (id) => {
  return User.findById(id).select("-local.password");
};
export const deleteUserByEmail = (email) => {
  return User.findOneAndDelete({ "local.email": email });
};

export const findUserByEmail = (email) => {
  return User.findOne({ "local.email": email });
};

export const createUser = async (data) => {
  const user = await findUserByEmail(data.email);
  if (user) throw new Error("Courriel déjà utilisé");
  const hashedPassword = await User.hashPassword(data.password);
  const newUser = new User({
    name: data.name,
    local: {
      email: data.email,
      password: hashedPassword,
      sku: data.sku,
    },
  });
  return newUser.save();
};

export const addAddressToUser = async (data) => {
  const user = await findUserByEmail(data.email);
  const addresses = user.addresses;
  addresses.push(data.address);
  return User.findOneAndUpdate(
    { _id: user._id },
    { addresses: addresses },
    { returnOriginal: false, new: true }
  );
};
export const updateAddressToUser = async (data) => {
  const user = await findUserByEmail(data.email);
  const addresses = user.addresses;
  addresses.forEach((item, i) => {
    if (item == addresses[data.index]) addresses[i] = data.address;
  });
  return User.findOneAndUpdate(
    { _id: user._id },
    { addresses: addresses },
    { returnOriginal: false, new: true }
  );
};
export const deleteAddressToUser = async (data) => {
  const user = await findUserByEmail(data.email);
  const addresses = user.addresses;
  addresses.splice(data.index, 1);
  return User.findOneAndUpdate(
    { _id: user._id },
    { addresses: addresses },
    { returnOriginal: false, new: true }
  );
};
export const addCardToUser = async (data) => {
  const user = await findUserByEmail(data.email);
  const cards = user.cards;
  cards.push(data.cardNumber);
  return User.findOneAndUpdate(
    { _id: user._id },
    { cards: cards },
    { returnOriginal: false , new: true}
  );
};
export const addOrderToUser = async (data) => {
  const user = await findUserByEmail(data.email);
  const orders = user.orders;
  const order = [];
  order.push(data.createdOrder);
  order.push(data.order);
  order.push(data.shippingAddress);
  order.push(data.paymentInfo);
  order.push(data.subTotal);
  order.push(data.TPS);
  order.push(data.TVQ);
  order.push(data.orderTotal);
  orders.push(order);
  order.push(data.longDescription);
  return User.findOneAndUpdate(
    { _id: user._id },
    { orders: orders },
    { returnOriginal: false, new: true }
  );
};
export const updateCardToUser = async (data) => {
  const user = await findUserByEmail(data.email);
  const cards = user.cards;
  cards.forEach((item, i) => {
    if (item == cards[data.index]) cards[i] = data.cardNumber;
  });
  return User.findOneAndUpdate(
    { _id: user._id },
    { cards: cards },
    { returnOriginal: false, new: true }
  );
};
export const deleteCardToUser = async (data) => {
  const user = await findUserByEmail(data.email);
  const cards = user.cards;
  cards.splice(data.index, 1);
  return User.findOneAndUpdate(
    { _id: user._id },
    { cards: cards },
    { returnOriginal: false, new: true }
  );
};
