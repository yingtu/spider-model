var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId,
  Mixed = Schema.Types.Mixed;

var platform = new Schema({
  siteName: {
    type: String,
    required: true
  },
  desc: String,
  queryModel: {
    type: String,
    required: true,
  },
  createDateTime: {
    type: Date,
    default: Date.now
  },
  updateDateTime: {
    type: Date,
    default: Date.now
  }
});

platform.static({
  list: async function() {
    return await this.find()
      .sort({ _id: -1 })
  }
});

module.exports = mongoose.model('platform', platform);