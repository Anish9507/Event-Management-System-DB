const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
const clientBuildPath = path.join(__dirname, '..', 'client', 'build');
const flattenedBuildPath = path.join(__dirname, '..', 'build');
const indexHtmlPath = path.join(flattenedBuildPath, 'index.html');
if (process.env.NODE_ENV === 'production' || fs.existsSync(indexHtmlPath)) {
  app.use(express.static(flattenedBuildPath));
  app.get('*', (req, res) => {
    res.sendFile(indexHtmlPath);
  });
}
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
