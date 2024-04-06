const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 8000;
const formRoutes = require('./Routes/formRoute');
const dataRoutes = require('./Routes/dataRoute');
const dataAdminRoutes = require('./Routes/dataAdminRoute');


app.use(bodyParser.json());
app.use(cors());

app.use('/api', formRoutes);
app.use('/api', dataRoutes);
app.use('/api', dataAdminRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});