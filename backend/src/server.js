import app from './app';

import './database';

require('dotenv/config');

const port = process.env.SERVER_PORT;

app.listen(port, () => {
  console.log('The server is running...');
});
