import Usuario from "../models/usuario.model.js";

async function criar(dadosDoUsuario) {
    return Usuario.create(dadosDoUsuario);
}

async function buscarPorEmail(email) {
    return Usuario.findOne({ email: email.trim().toLowerCase() });
}

async function buscarPorEmailComSenha(email) {
    const query = Usuario.findOne({ email: email.trim().toLowerCase() });

    return query.select("+senhaHash");
}

async function buscarPorId(id) {
    return Usuario.findById(id);
}

async function listarTodos() {
    return Usuario.find().sort({ createdAt: -1 });
}

async function atualizarPorId(id, dadosAtualizados) {
    return Usuario.findByIdAndUpdate(id, dadosAtualizados, {
        new: true,

        runValidators: true,
    });
}

async function deletarPorId(id) {
    return Usuario.findByIdAndDelete(id);
}

const UsuarioRepository = {
    criar,
    buscarPorEmail,
    buscarPorEmailComSenha,
    buscarPorId,
    listarTodos,
    atualizarPorId,
    deletarPorId,
};

export default UsuarioRepository;
