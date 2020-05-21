import app from '@shared/infra/http/app';

app.listen(process.env.APP_PORT, () =>
  console.log(`Server runing on ${process.env.APP_API_URL}`),
);
