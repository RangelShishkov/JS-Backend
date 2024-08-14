const { MongooseError } = require("mongoose");

exports.extractErrorMsgs = (error) => {
  if (!error) {
    return ["An unknown error occurred"];
  }

  const isInstanceOfMongoose = error instanceof MongooseError;

  if (isInstanceOfMongoose && error.errors) {
    const errors = Object.values(error.errors);
    const msgs = errors.map((e) => e.message);
    return msgs;
  }

  if (Array.isArray(error.messages)) {
    return error.messages;
  }

 
  if (error.message) {
    return [error.message];
  }

  return ["An unknown error occurred"];
};
