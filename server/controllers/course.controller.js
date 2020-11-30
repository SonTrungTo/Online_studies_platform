import Course from "../models/course.model";
import dbErrorHandler from "../helpers/dbErrorHandler";
import fs from "fs";
import formidable from "formidable";

const create = async (req, res) => {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Could not create the course"
            });
        }
        const course = new Course(fields);
        course.instructor = req.profile;
        if (files.image) {
            course.image.data = fs.readFileSync(files.image.path);
            course.image.contentType = files.image.type;
        }
        try {
            await course.save();
            return res.status(200).json(course);
        } catch (err) {
            return res.status(400).json({
                error: dbErrorHandler.getErrorMessage(err)
            });
        }
    });
};

const getCourseImage = (req, res) => {
    res.set('Content-Type', req.course.image.contentType);
    return res.send(req.course.image.data);
};

const courseById = async (req, res, next, id) => {
    try {
        let course = await Course.findById(id)
        .populate('instructor', '_id name')
        .exec();
        if (!course) {
            return res.status(400).json({
                error: "Course cannot be found"
            });
        }
        req.course = course;
        next();
    } catch (err) {
        return res.status(400).json({
            error: "Server could not fetch the course by id"
        });
    }
};

export default {
    create, getCourseImage, courseById
};