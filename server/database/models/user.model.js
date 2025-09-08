import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    local: {
      email: { type: String, required: true, unique: true },
      password: { type: String },
      sku: { type: Number },
    },

    addresses: { type: [String] },

    cards: { type: [Number] },

    orders: {
      type: [],
      shippingAddress: { type: String },
      paymentInfo: { type: String },
      subTotal: { type: Number },
      TPS: { type: Number },
      TVQ: { type: Number },
      orderTotal: { type: Number },
    },
  },
  { timestamps: true }
);

// Obtenir une fonction statique pour hacher le mot de passe
userSchema.statics.hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const start = Date.now();
    const hashedPassword = await bcrypt.hash(password, salt);
    const end = Date.now() - start;
    console.log(`Hashed password in ` + end.toLocaleString());
    return hashedPassword;
  } catch (error) {
    throw error;
  }
};

//Pouvoir comparer le mot de passe haché du l'utilisateur en cours
//          avec le mot de passe non-haché fourni par le front-end
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.local.password);
};

export default mongoose.model("user", userSchema);
