import Joi from 'joi';
import { PostDataDto } from '@/types/PostDataDto';

const blogValidation = (data: PostDataDto) => {
  const blogSchema = Joi.object<PostDataDto>({
    title: Joi.string().required(),
    date: Joi.string().required(),
    content: Joi.string().required(),
  });
  return blogSchema.validate(data);
};

export default blogValidation;
