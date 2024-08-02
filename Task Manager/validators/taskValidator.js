const Joi = require("joi");

function taskValidator(req, res, next) {
  const taskBody = Joi.object({
    name: Joi.string().required(),
    completed: Joi.boolean().required(),
  });

  const result = taskBody.validate(req.body);

  if (result.error) {
    return res.json({ msg: result.error.details[0].message });
  }
  req.validationResult = result
  next();
}

module.exports = taskValidator;
