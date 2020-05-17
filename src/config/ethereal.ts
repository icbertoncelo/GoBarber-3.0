const etherealConfig = {
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: process.env.ETHEREAL_USERNAME as string,
    pass: process.env.ETHEREAL_PASSWORD as string,
  },
};

export default etherealConfig;
