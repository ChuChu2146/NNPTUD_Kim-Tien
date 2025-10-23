const Product = require("../schemas/product");

// Xóa mềm sản phẩm (soft delete)
exports.softDelete = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isDelete: true },
      { new: true }
    );
    if (!product)
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    res.json({ message: "Đã đánh dấu isDelete = true", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
