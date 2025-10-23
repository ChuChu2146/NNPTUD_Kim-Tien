const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Tên sản phẩm không được để trống"],
    unique: true
  },
  price: {
    type: Number,
    default: 1
  },
  description: {
    type: String,
    default: "good product"
  },
  category: {
    type: String,
    required: true
  },
  isDelete: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', schema);
