var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId,
  Mixed = Schema.Types.Mixed;
mongoose.Promise = global.Promise;

var pageInfo = new Schema({
  pageId: { type: String, required: true },
  title: {
    type: String,
    required: true,
  },
  platform: {
    type: ObjectId,
    ref: 'platform'
  },
  source: {
    type: ObjectId,
    ref: 'source'
  },
  coverUrl: {
    type: String,
    required: true
  },
  detailUrl: {
    type: String,
    required: true
  },
  tags: {
    type: Array
  },
  duration: String,
  desc: String,
  playCount: String, //播放数
  commentCount: String, //评论数
  dynamicCommentCount: String, //弹幕数量
  favoriteCount: String, //收藏数量
  pubTime: Date,
  createDateTime: {
    type: Date,
    default: Date.now
  },
  updateDateTime: {
    type: Date,
    default: Date.now
  }
});

pageInfo.static({
  list: async function(params) {
    params = params ? params : { limit: 50, skip: 0 }
    var list = await this.find()
      .populate('platform')
      .populate('source')
      .limit(params.limit)
      .skip(params.skip)
      .sort({ _id: -1 })
    var count = await this.count();
    return {
      list: list,
      total: count,
    }
  }
});

module.exports = mongoose.model('pageInfo', pageInfo);