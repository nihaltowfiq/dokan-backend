export default () => ({
  port: parseInt(process.env.PORT, 10) || 5000,
  database: {
    uri: process.env.MONGODB_URI,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: '60s',
  },
});
