const UserSchema = require("../models/userSchema");
const bcrypt = require('bcrypt');

const getAll = async (req, res) => {
  UserSchema.find(function (err, users) {
    if(err) {
      res.status(500).send({ message: err.message })
    }
      console.log("GET")
      res.status(200).send(users)
  }) 
};

const createUser = async (req, res) => {
  //console.log("SENHA ANTES DO HASH", req.body.password)
  const hashedPassword = bcrypt.hashSync(req.body.password, 10)
  //console.log("SENHA DEPOIS DO HASH", hashedPassword, "SENHA DO BODY", req.body.password)
  req.body.password = hashedPassword

  //console.log("COMO ESTÁ O REQ BODY?", req.body.password)

  try {
    // acessar as informações que vem no body da requisição
    const newUser = new UserSchema(req.body);

    // criar o novo usuário
    const savedUser = await newUser.save();

    // enviar uma resposta
    console.log("POST")
    res.status(201).send({
      "message": "Usuário criado com sucesso",
      savedUser
    })
  } catch(e) {
    console.error(e)
  } 
};

const updateUserById = async (req, res) => {
  try {
      const findUser = await UserSchema.findById(req.params.id)

      if (findUser) {            
          findUser.name = req.body.name || findUser.name
          findUser.email = req.body.email || findUser.email
      }

      const savedUser = await findUser.save()
      
      console.log("PUT")
      res.status(200).json({
          message: `Usuário '${findUser.name}' atualizado com sucesso`,
          savedUser
      })

  } catch (error) {
      console.error(error)
  }
}

const deleteUserById = async (req, res) => {
  try {
      const userFound = await UserSchema.findById(req.params.id)

     await userFound.delete()
     console.log("DELETE")
     res.status(200).json({
         mensagem: `Usuário '${userFound.name}' deletado com sucesso`
     })

  } catch (err) {
      res.status(400).json({
          mensagem: err.message
      })
  }
}

module.exports = {
  getAll,
  createUser,
  updateUserById,
  deleteUserById
};
