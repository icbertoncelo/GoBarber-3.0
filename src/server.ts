import app from './app';

app.listen(process.env.APP_PORT, () =>
  console.log('Server runing on http://localhost:3333'),
);
