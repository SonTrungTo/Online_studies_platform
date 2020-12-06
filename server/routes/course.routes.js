import express from "express";
import authCtrl from "../controllers/auth.controller";
import userCtrl from "../controllers/user.controller";
import courseCtrl from "../controllers/course.controller";

const router = express.Router();

router.route('/api/courses/by/:userId')
    .post(authCtrl.requireSignin, authCtrl.hasAuthorization,
        userCtrl.isEducator, courseCtrl.create)
    .get(authCtrl.requireSignin, authCtrl.hasAuthorization,
        courseCtrl.listByInstructor);

router.route('/api/courses/by/:courseId')
    .get(courseCtrl.getCourseImage);

router.param('userId', userCtrl.userById);
router.param('courseId', courseCtrl.courseById);

export default router;