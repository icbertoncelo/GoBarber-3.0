import app from '@shared/infra/http/app';

app.listen(process.env.APP_PORT, () =>
  console.log(`Server runing on http://localhost:${process.env.APP_PORT}`),
);
