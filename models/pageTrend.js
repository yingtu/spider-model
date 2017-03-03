var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId,
  Mixed = Schema.Types.Mixed;
mongoose.Promise = global.Promise;

var pageTrend = new Schema({
  pageInfo: {
    type: ObjectId,
    required: true,
    ref: 'pageInfo'
  },

  shareCount: String,
  playCount: String, //播放数
  commentCount: String, //评论数
  dynamicCommentCount: String, //弹幕数量
  favoriteCount: String, //收藏数量
  createDateTime: {
    type: Date,
    default: Date.now
  }
});

pageTrend.static({
  list: async function(params) {
    params = params ? params : { limit: 50, skip: 0 }
    var list = await this.aggregate([{
      $lookup: {
        from: 'pageInfo',
        localField: 'pageInfo',
        foreignField: '_id',
        as: 'page'
      }
    }, {
      $group: {
        _id: '$pageInfo',
        pageDetail: { $first: "$page" },
        items: {
          $push: "$$ROOT"
        }
      }
    }, {
      $sort: { "createDateTime": -1 },
    }, {
      $skip: params.skip
    }, {
      $limit: params.limit
    }])

    var count = await this.count();
    return {
      list: list,
      total: count,
    }
  },
  trendFields() {
    return ['shareCount', 'playCount', 'commentCount', 'dynamicCommentCount', 'favoriteCount']
  }
});

module.exports = mongoose.model('pageTrend', pageTrend);