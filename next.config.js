// must restart server whenever you make changes in next.config
module.exports = {
  env: {
    MONGO_SRV:
      "mongodb+srv://mcmbonu:dmjjmd@prod-bpcyp.mongodb.net/test?retryWrites=true&w=majority",
    JWT_SECRET: "sdfdsfdsfdsfdsfsdbcgxrffgxzr",
    CLOUDINARY_URL: "https://api.cloudinary.com/v1_1/mcmbonu/image/upload",
    STRIPE_SECRET_KEY: "sk_test_wqy8yu3JWOJgw0JAQXlKTQbz00I5fvPxH7"
  }
};
