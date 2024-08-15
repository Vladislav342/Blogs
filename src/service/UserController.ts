import UserBlog from '@/models/UserModel';

class UserController {
    async findOneUser(login: string) {
        return await UserBlog.findOne({ login: login });
    }

    async createUser(login: string, password: string) {
        return await UserBlog.create({ login, password });
    }
}

const UserService = new UserController();

export default UserService;