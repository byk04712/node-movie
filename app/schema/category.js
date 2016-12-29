const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;



const CategorySchema = new Schema({
	name: String,
	movies: [{
		type: ObjectId,
		ref: 'Movie'
	}]
});


CategorySchema.statics = {
	fetch: function(cb) {
		return this.find({}).exec(cb);
	}
}


module.exports = CategorySchema;