import mongoose from "mongoose";

const comentarioSchema = new mongoose.Schema(
    {
        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Usuario",
            required: true,
        },
        comentario: {
            type: String,
            required: true,
        },
        reviewComentada: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
            required: true,
        },
        data: {
            type: Date,
            default: Date.now,
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Usuario",
            },
        ],
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

comentarioSchema.virtual("quantidadeLikes").get(function () {
    return this.likes.length;
});

const Comentario = mongoose.model("Comentario", comentarioSchema);

export default Comentario;