var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId,
  Mixed = Schema.Types.Mixed;

//记录每个源每次的运行记录
var sourceUpdateHistory = new Schema({
  done: {
    type: Boolean,
    default: false
  },
  updateCount: {
    type: Number,
  },
  oldCount: {
    type: Number,
  },
  source: {
    type: ObjectId,
    ref: 'source'
  },
  desc: String,
  createDateTime: {
    type: Date,
    default: Date.now
  },
  startDateTime: {
    type: Date,
    default: Date.now
  },
  endDateTime: {
    type: Date
  }
});

sourceUpdateHistory.static({
  list: async function(params) {
    params = params ? params : { limit: 50, skip: 0 }
    var list = await this.find({
        source: params.sourceId
      })
      .limit(params.limit)
      .skip(params.skip)
      .sort({ _id: -1 })
    var count = await this.find({ source: params.sourceId }).count();
    return {
      list: list,
      total: count,
    }
  }
});

module.exports = mongoose.model('sourceUpdateHistory', sourceUpdateHistory);