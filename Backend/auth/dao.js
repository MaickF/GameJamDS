const mongoose = require('mongoose');
const { userSchema, eventSchema, gameSchema, categorySchema, placeSchema, feedbackSchema, rolSchema, rateSchema, gameReportSchema, criterioSchema, criterioxjuegoSchema, problemReportSchema } = require('./model');

/*authSchema.statics = {
  create: function (data, cb) {
    const user = new this(data);
    user.save(cb);
  },
  login: function (query, cb) {
    this.find(query, cb);
  }
}

const authModel = mongoose.model('Users', authSchema);
module.exports = authModel;
*/
const User = mongoose.model('User', userSchema)
const Event = mongoose.model('Event', eventSchema)
const Game = mongoose.model('Game', gameSchema)
const Category = mongoose.model('Category', categorySchema)
const Place = mongoose.model('Place', placeSchema)
const Feedback = mongoose.model('Feedback', feedbackSchema)
const Rol = mongoose.model('Rol', rolSchema)
const Rate = mongoose.model('Rate', rateSchema)
const GameReport = mongoose.model('GameReport', gameReportSchema)
const Criterio = mongoose.model('Criterio', criterioSchema)
const CriterioXJuego = mongoose.model('CriterioXJuego', criterioxjuegoSchema)
const ProblemReport = mongoose.model('problemReport', problemReportSchema)

module.exports = {
  User,
  Event,
  Game,
  Category,
  Place,
  Feedback,
  Rol,
  Rate,
  GameReport,
  Criterio,
  CriterioXJuego,
  ProblemReport
};