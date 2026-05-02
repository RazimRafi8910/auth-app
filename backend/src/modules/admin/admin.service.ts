import User from "../user/user.model.js";


export const getAllUsers = async () => {
    const users = await User.find();
    return users.map((user) => {
        const userObject = user.toObject();
        delete userObject.password;
        delete (userObject as any).__v;
        return userObject;
    });
}