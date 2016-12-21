const mongoose = require('mongoose');
const MovieSchema = require('../schema/movie');


var Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;