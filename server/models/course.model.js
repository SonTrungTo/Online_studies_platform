import mongoose from "mongoose";

const CourseSchema = mongoose.Schema({
    name: {
        type: String,
        required: "Name is required",
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    image: {
        data: Buffer,
        contentType: String
    },
    category: {
        type: String,
        required: "Category is required"
    },
    published: {
        type: Boolean,
        default: false
    },
    instructor: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date
});

export default mongoose.model('Course', CourseSchema);