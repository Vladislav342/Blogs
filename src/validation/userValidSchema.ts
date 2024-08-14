import Joi from 'joi';

interface IUserValidation {
  login: string;
  password: string;
  action: string;
}

const userValidation = (data: IUserValidation) => {
  const userSchema = Joi.object<IUserValidation>({
    login: Joi.string().required(),
    password: Joi.string().required(),
    action: Joi.string().required(),
  });
  return userSchema.validate(data);
};

export default userValidation;
