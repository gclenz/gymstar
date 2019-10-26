import app from './app';

import './database';

const port = 3333;

app.listen(port, () => {
  console.log('The server is running...');
});
