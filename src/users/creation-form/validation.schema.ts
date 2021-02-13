import Joi from "joi";

const dateValidationRegex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/

const UserSchema = Joi.object({
  _id:Joi.string().optional(),
  __v:Joi.number().optional(),
  fullName: Joi.string()
    .pattern(new RegExp("^[A-z S+]*$"))
    .rule({ message: "only alphabetical characters and spaces are allowed" })
    .required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .rule({
      message: "Please enter a valid email format",
    })
    .required(),
  birthdate: Joi.string()
    .required()
    .pattern(dateValidationRegex)
    .rule({
      message: "Date has to be formatted as YYYY-MM-DD",
    }),

  hiringdate: Joi.string()
    .optional()
    .pattern(dateValidationRegex)
    .rule({
      message: "Date has to be formatted as YYYY-MM-DD",
    }),

  address: Joi.string().required(),

  phone: Joi.string().required().pattern(new RegExp("^01*[0-9]{10}")).rule({
    message: "Only Egyptian phone numbers formats are allowed. i.e 01141461405",
  }),

  alternateInfo: Joi.object().keys({
    address: Joi.string().optional().label("altAddress"),
    phone: Joi.string()
      .label("altPhone")
      .optional()
      .allow("")
      .pattern(new RegExp("^01*[0-9]{10}"))
      .rule({
        message:
          "Only Egyptian phone numbers formats are allowed. i.e 01141461405",
      }),
  }),
});


export default UserSchema;