var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId,
  Mixed = Schema.Types.Mixed;
mongoose.Promise = global.Promise;

var pageInfo = new Schema({
  pageId: { type: String, required: true },
  isPub: {
    type: Boolean,
    default: false
  },
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
  author: {
    type: String
  },
  shareCount: Number,
  duration: String,
  desc: String,
  playCount: Number, //播放数
  commentCount: Number, //评论数
  dynamicCommentCount: Number, //弹幕数量
  favoriteCount: Number, //收藏数量
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
pageInfo.index({ playCount: 1, commentCount: 1, dynamicCommentCount: 1, favoriteCount: 1, shareCount: 1, pubTime: 1 })
module.exports = mongoose.model('pageInfo', pageInfo);