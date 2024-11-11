const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const corsOptions = require('./utils/corsConfig');
const businessRoutes = require('./routes/businessRoutes');
const productRoutes = require('./routes/productRoutes');
const cors = require('cors');
dotenv.config();

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.use('/api/business', businessRoutes);
app.use('/api/products', productRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});