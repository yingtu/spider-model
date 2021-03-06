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
    unique: true,
  },
  sourceId: {
    type: String,
    unique: true
  },
  url: {
    type: String,
    required: true,
    unique: true,
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
    ref: 'platform',
    required: true,
  },
  deprecated: {
    type: Boolean
  },
  desc: String,
  createDateTime: {
    type: Date,
    default: Date.now
  },
  crawlOnceLimit: {
    type: Number,
    default: 100
  },
  creator: {
    type: String,
  },
  author: {
    type: String
  },
  updateDateTime: {
    type: Date,
    default: Date.now
  },
  beary_chat: {
    type: String
  }
});

source.static({
  list: async function(params) {
    params = params ? params : { limit: 50, skip: 0 }
    var where = params.where ? params.where : {};
    var _undefined;
    var list = await this.find(Object.assign({
        deprecated: _undefined
      }, where))
      .limit(params.limit)
      .skip(params.skip)
      .sort({ _id: -1 })
      .populate('platform', { _id: 1, siteName: 1, queryModel: 1 })
    var count = await this.count();
    return {
      list: list,
      total: count,
    }
  }
});

module.exports = mongoose.model('source', source);