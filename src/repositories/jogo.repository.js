import Jogo from "../models/jogo.model.js";

async function criar(dados) {
    return await Jogo.create(dados);
}

async function atualizarPorId(id, dados) {
    return await Jogo.findByIdAndUpdate(id, dados, {
        new: true,
        runValidators: true,
    });
}

async function deletarPorId(id) {
    return await Jogo.findByIdAndDelete(id);
}

async function buscarPorIdIGDB(idIGDB) {
    return await Jogo.findOne({ idIGDB: idIGDB });
}

async function buscarPorIdNosso(id) {
    return await Jogo.findById(id);
}

const JogoRepository = {
    criar,
    buscarPorIdIGDB,
    buscarPorIdNosso,
    deletarPorId,
    atualizarPorId,
};

export default JogoRepository;
