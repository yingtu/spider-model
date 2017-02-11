function validUrl(v) {
  return v.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/)
}
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId,
  Mixed = Schema.Types.Mixed;

var source = new Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
    set(v) {
      return v.trim().toLowerCase()
    },
    validate: [
      validUrl,
      'Invalid source url'
    ]
  },
  interval: {
    type: Number,
    default: 86400 //24小时的秒
  },
  platform: {
    type: ObjectId,
    ref: 'platform'
  },
  deprecated: {
    type: Boolean
  },
  desc: String,
  createDateTime: {
    type: Date,
    default: Date.now
  },
  updateDateTime: {
    type: Date,
    default: Date.now
  }
});

source.static({
  list: async function(params) {
    params = params ? params : { limit: 50, skip: 0 }
    var _undefined;
    return await this.find({
        deprecated: _undefined
      })
      .limit(params.limit)
      .skip(params.skip)
      .sort({ _id: -1 })
      .populate('platform', { _id: 1, siteName: 1, queryModel: 1 })
  }
});

module.exports = mongoose.model('source', source);