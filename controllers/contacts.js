const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Users']
  const result = await mongodb.getDatabase().db().collection('contacts').find();
  result.toArray()
    .then((contacts) => {
      res.setHeader('Contenct-Type', 'application/json');
      res.status(200).json(contacts);
    })
}

const getSingle = async (req,res) => {
  //#swagger.tags=['Users']
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('contacts').find({ _id: userId });
  result.toArray()
    .then((contacts) => {
      res.setHeader('Contenct-Type', 'application/json');
      res.status(200).json(contacts[0]);
    })
}

const createUser = async (req,res) => {
  //#swagger.tags=['Users']
  const { firstName, lastName, email, favoriteColor, birthday } = req.body;
  const user = {
    firstName,
    lastName,
    email,
    favoriteColor,
    birthday,
  }

  const response = await mongodb.getDatabase().db().collection('contacts').insertOne(user);
  if(response.acknowledged > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating user')
  }
}

const updateUser = async (req,res) => {
  //#swagger.tags=['Users']
  const userId = new ObjectId(req.params.id);
  const { firstName, lastName, email, favoriteColor, birthday } = req.body;
  const user = {
    firstName,
    lastName,
    email,
    favoriteColor,
    birthday,
  }

  const response = await mongodb.getDatabase().db().collection('contacts').replaceOne({_id: userId }, user);
  if(response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating user')
  }
}

const deleteUser = async (req,res) => {
  //#swagger.tags=['Users']
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDatabase().db().collection('contacts').deleteOne({_id: userId } , true);
  if(response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating user')
  }
}


module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser
}