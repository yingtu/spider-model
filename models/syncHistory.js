var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId,
  Mixed = Schema.Types.Mixed;

var syncHistory = new Schema({
  count: {
    type: String,
    required: true,
  },
  createDateTime: {
    type: Date,
    default: Date.now
  }
});

syncHistory.static({
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

module.exports = mongoose.model('syncHistory', syncHistory);