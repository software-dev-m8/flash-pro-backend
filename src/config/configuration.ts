import * as Joi from 'joi'

export default Joi.object({
  ENVIRONMENT: Joi.string().valid('prod', 'dev').default('dev'),
  PORT: Joi.number().required(),
  MONGO_URI: Joi.string().required(),
  JWT_ACCESS_SECRET_KEY: Joi.string().required(),
  JWT_ACCESS_EXPIRES_IN: Joi.string().required().default('1h'),
  JWT_REFRESH_SECRET_KEY: Joi.string().required(),
  JWT_REFRESH_EXPIRES_IN: Joi.string().required().default('7d'),
  ALLOWED_ORIGINS: Joi.string().default('*'),
})
