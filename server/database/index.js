import mongoose from "mongoose";

const protocol = "mongodb+srv";
// const url = "cluster0.c0jhclh.mongodb.net";
//mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })  
//mongodb+srv://alexander:<db_password>@cluster2.yiihhb5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster2


const params = "?retryWrites=true&w=majority";
//const url = "cluster0.rbklztt.mongodb.net";
// const username = "User";
// const password = "pw4User$";
const url = "cluster2.yiihhb5.mongodb.net";
const username = "alexander";
const password = "Tamara";
const database = "DAWTA-AUTH";

export const connectionString = `${protocol}://${username}:${password}@${url}/${database}${params}`;

const options = {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useFindAndModify: false,
  //useCreateIndex: true,
  //useFindAndModify: false,
};

export const connect = (callback) =>
  mongoose
    .connect(connectionString, options)
    .then((db) => {
      console.log(`Connecté avec succès à la base ${database} sur ${url}`);
      if (callback) callback();
    })
    .catch((err) => {
      console.log(err);
    });
