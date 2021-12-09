const Users = require("./../../models/Users.js");

/*
var users = [{
    id: 1,
    username: "Lautaro",
    email: "lupita@gmail.com",
    birthday: "30-12-1998", 
    age: 22 
}]
*/

module.exports = {
  Query: {
    async getUser(_, { userID }) {
      /* let queryUser = await users.find((e)=>{
                return e.id == userID
            })

            if (queryUser) {
                return queryUser
            } else {
                throw new Error('Ups!... No se ha encontrado este usuario... = (')
            }
            */
      try {
        const user = await Users.findById(userID);

        if (user) {
          return user;
        } else {
          throw new Error("Ups!... No se ha encontrado este usuario... = (");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async getAllUser() {
      const users = await Users.find();
      if (users) {
        return users;
      } else {
        throw new Error("Ups!... No se ha encontrado nungún usuario... = (");
      }
    },
  },
  Mutation: {
    async userCreate(_, { username, email, birthday }) {
      const newUser = new Users({
        username,
        email,
        birthday,
        age: 18,
      });
      const saveUser = await newUser.save();
      return saveUser;
    },
    async updateUser(_, {userID, username, email, birthday }) {
      try {
        const user = await Users.findById(userID);

        if (user) {
          const editUser = await Users.updateOne({
           "_id": userID
          },
          {
            $set: {
              username,
              email,
              birthday
            }
          },function (err, doc) {
            if (err) {
              return err
            } else {
              return doc
            }
          });
          editUser

          const newUser = await Users.findById(userID);
          return newUser
        } else {
          throw new Error("Ups!... No se ha encontrado este usuario... = (");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
