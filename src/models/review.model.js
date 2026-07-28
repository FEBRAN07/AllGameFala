import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        nota: {
            type: Number,
            required: true,
            min: 0,
            max: 5,
        },

        comentario: {
            type: String,
            required: true,
            trim: true,
            maxlength: 2000,
        },

        dataReview: {
            type: Date,
            default: Date.now,
        },

        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Usuario",
            required: true,
        },

        jogo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Jogo",
            required: true,
        },

        quantidadeLikes: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
