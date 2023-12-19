import { Schema, model } from "mongoose";
import Joi from "joi";

const contactScheme = Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 20,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 50,
    required: true,
    unique: true,
    trim: true,
  },
  company: {
    type: String,
    minlength: 5,
    maxlength: 40,
    required: true,
  },
  mobileNo: {
    type: String,
    minlength: 10,
    maxlength: 12,
    required: true,
  },
  jobfunction: {
    type: String,
    minlength: 3,
    maxlength: 12,
    required: true,
  },
  country: {
    type: String,
    minlength: 3,
    maxlength: 12,
    required: true,
  },
});

export const Contact = model("contacts", contactScheme);

export function validateForm(data) {
  const schema = Joi.object({
    email: Joi.string().required(),
    name: Joi.string().required(),
    company: Joi.string().required(),
    mobileNo: Joi.string().required(),
    jobfunction: Joi.string().required(),
    country: Joi.string().required(),
  });

  //   return schema.validate(data, { abortEarly: false });
  return schema.validate(data);
}
