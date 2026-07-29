import mongoose from "mongoose";

const sugestaoSchema = new mongoose.Schema(
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
        nomeJogo: {
            type: String,
            required: true,
        },
        status: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Sugestao = mongoose.model("Sugestao", sugestaoSchema);

export default Sugestao;
