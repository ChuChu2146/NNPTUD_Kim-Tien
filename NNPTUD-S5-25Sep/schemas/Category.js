const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// 🔹 Kết nối MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/NNPTUD_S5_25SEP', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Đã kết nối MongoDB thành công"))
.catch((err) => console.error("❌ Lỗi kết nối MongoDB:", err));

// 🔹 Import routes
const categoryRoutes = require('./routes/categoryRoutes');
app.use('/api/categories', categoryRoutes);

// (Thêm các route khác nếu có)

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
