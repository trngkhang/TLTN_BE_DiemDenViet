import "dotenv/config";

const envVar = {
  port: process.env.PORT || 3001,
  mongoUri: process.env.MONGO_URI.toString(),
};

export default envVar;
