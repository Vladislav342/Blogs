import Blog from '@/models/Blogs';

class BlogController {
    async findAllBlogs() {
        return await Blog.find({});
    }

    async createBlog(title: string, date: string, content: string) {
        return await Blog.create({ title, date, content });
    }

    async findBlogAndUpdate(_id: string, title: string, date: string, content: string) {
        return await Blog.findOneAndUpdate(
            { _id },
            { title, date, content },
            {
                returnOriginal: false,
            },
        );
    }

    async removeBlog(_id: string) {
        return await Blog.deleteOne({ _id });
    }
}

const BlogService = new BlogController();

export default BlogService;