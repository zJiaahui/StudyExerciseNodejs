require("./connect.js");
const mongoose = require("mongoose");
const studentSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: [8, "name最大长度为8"],
    minlength: [2, "name最小长度为2"],
    required: [true, "name必须填写"]
  },
  age: {
    type: Number,
    min: [18, "年龄太小不能上大学"],
    max: [30, "年龄太大不能上大学"]
  },
  sex: {
    type: String,
    required: [true, "sex必须填写"]
  },
  email: String,
  hobbies: [String],
  enterDate: { type: Date, default: "2020-07-10" }
});
const student = mongoose.model("student", studentSchema);
module.exports.student = student;
