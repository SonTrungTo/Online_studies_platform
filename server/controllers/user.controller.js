import User from "../models/user.model";
import dbErrorHandler from "../helpers/dbErrorHandler";
import extend from "lodash/extend";

const list = async (req, res) => {
    try {
        const users = await User.find().select('name email created updated');
        return res.status(200).json(users);
    } catch (err) {
        return res.status(400).json({
            error: dbErrorHandler.getErrorMessage(err)
        });
    }
};

const create = async(req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        return res.status(200).json({
            message: "Successfully signed up!"
        });
    } catch (err) {
        return res.status(400).json({
            error: dbErrorHandler.getErrorMessage(err)
        });
    }
};

const read = (req, res) => {
    req.profile.salt = undefined;
    req.profile.hashed_password = undefined;
    return res.status(200).json(req.profile);
};

const update = async (req, res) => {
    try {
        const user = extend(req.profile, req.body);
        user.updated = Date.now();
        await user.save();
        user.salt = undefined;
        user.hashed_password = undefined;
        return res.status(200).json(user);
    } catch (err) {
        return res.status(400).json({
            error: dbErrorHandler.getErrorMessage(err)
        });
    }
};

const remove = async (req, res) => {
    try {
        const deletedUser = await req.profile.remove();
        deletedUser.salt = undefined;
        deletedUser.hashed_password = undefined;
        return res.status(200).json(deletedUser);
    } catch (err) {
        return res.status(400).json({
            error: dbErrorHandler.getErrorMessage(err)
        });
    }
};

const userById = async (req, res, next, id) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(400).json({
                error: "User does not exist"
            });
        }
        req.profile = user;
        next();
    } catch (err) {
        return res.status(400).json({
            error: "Could not fetch the user"
        });
    }
};

export default {
    list, create, userById, read, update, remove
};