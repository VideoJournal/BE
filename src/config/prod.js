export const config = {
  port: process.env.PORT,
  secrets: {
    jwt: process.env.JWT_SECRET,
  },
  dbUrl: process.env.DB_URL,
};
