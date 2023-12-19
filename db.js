import { connect } from "mongoose";

export default () => {
  connect(
    "mongodb+srv://xenontweet:xenontweet@xenontweet.gmiaaup.mongodb.net/?retryWrites=true&w=majority"
  )
    .then(() => {
      console.log("Database connected Successfully.");
    })
    .catch((err) => {
      console.log(err);
    });
};
