const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  nombre: String,
  contrasenha: String,
  apellido1: String,
  apellido2: String,
  correoElectronico: String,
  telefono: String,
  universidad: String,
  especialidad: String,
  condicionMedica: String,
  necesidadDietetica: String,
  codigoDePais: String,
  rol: String,
  pais: String,
  ciudad: String
}, {versionKey: false});

const eventSchema = mongoose.Schema({
  nombre: String,
  tema: String,
  fecha: String
}, {versionKey: false});

const gameSchema = mongoose.Schema({
  nombre: String,
  categoria: String,
  engine: String
}, {versionKey: false});

const categorySchema = mongoose.Schema({
  nombre: String,
  descripcion: String
}, {versionKey: false});

const criterioSchema = mongoose.Schema({
  nombre: String,
  descripcion: String
}, {versionKey: false});

const placeSchema = mongoose.Schema({
  ubicacion: String,
  pais: String,
  ciudad: String
}, {versionKey: false});

const feedbackSchema = mongoose.Schema({
  titulo: String,
  evento: String
}, {versionKey: false});

const rolSchema = mongoose.Schema({
  nombre: String,
  evento: String
}, {versionKey: false});

const rateSchema = mongoose.Schema({
  cal: String,
  calDesempate: String
}, {versionKey: false});

const gameReportSchema = mongoose.Schema({
  tipo: String,
  descripcion: String,
  juego: String
}, {versionKey: false});

module.exports = {
  userSchema,
  eventSchema,
  gameSchema,
  categorySchema,
  placeSchema,
  feedbackSchema,
  rolSchema,
  rateSchema,
  gameReportSchema,
  criterioSchema
}