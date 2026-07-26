import Sugestao from "../models/sugestao.model.js";

async function criar(dados) {
    const sugestao = (await Sugestao.create(dados)).populate("usuario", "nome");
    return sugestao;
}

async function atualizarStatus(id, status) {
    const sugestaoAtualizada = await Sugestao.findByIdAndUpdate(
        id,
        { status: status },
        {
            new: true,
            runValidators: true,
        }
    );
    return sugestaoAtualizada;
}

async function listar() {
    const sugestoes = await Sugestao.find();
    return sugestoes;
}

async function deletar(id) {
    const sugestaoDeletada = await Sugestao.findByIdAndDelete(id);
    return sugestaoDeletada;
}

const SugestaoRepository = {
    criar,
    atualizarStatus,
    listar,
    deletar,
};

export default SugestaoRepository;
