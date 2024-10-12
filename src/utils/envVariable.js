import "dotenv/config";

const envVar = {
  port: process.env.PORT || 3001,
  mongoUri: process.env.MONGO_URI.toString(),
  jwtSecret: process.env.JWT_SECRET.toString(),
};

export default envVar;
