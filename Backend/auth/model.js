const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    correo: String,
    contrasenha: String
}, {versionKey: false})

const eventSchema = mongoose.Schema({
  nombre: String,
  tema: String,
  fecha: String
}, {versionKey: false})

const gameSchema = mongoose.Schema({
  titulo: String,
  categoria: String,
  engine: String
}, {versionKey: false})

const categorySchema = mongoose.Schema({
  nombre: String,
  descripcion: String
}, {versionKey: false})

const placeSchema = mongoose.Schema({
  ubicacion: String,
  pais: String,
  ciudad: String
}, {versionKey: false})

const feedbackSchema = mongoose.Schema({
  titulo: String,
  evento: String
}, {versionKey: false})

const rolSchema = mongoose.Schema({
  nombre: String,
  evento: String
}, {versionKey: false})

const rateSchema = mongoose.Schema({
  cal: String,
  calDesempate: String
}, {versionKey: false})

module.exports = {
  userSchema,
  eventSchema,
  gameSchema,
  categorySchema,
  placeSchema,
  feedbackSchema,
  rolSchema,
  rateSchema
};