exports.port = {
  secret: process.env.PORT
};

exports.mongodbuser = {
  secret: process.env.MONGO_DB_USER
};

exports.mongodbpass = {
  secret: process.env.MONGO_DB_PASSWORD
};

exports.mongodbdatabase = {
  secret: process.env.MONGO_DB_DATABASE
};

exports.jwt = {
  secret: process.env.JWT_SECRET
};
