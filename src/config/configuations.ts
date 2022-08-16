export default () => ({
  database: {
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  JWT: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES,
    refresh_secret: process.env.JWt_REFRESH_SECRET,
    refresh_exprires: process.env.JWT_REFRESH_EXPIRES,
  },
});
