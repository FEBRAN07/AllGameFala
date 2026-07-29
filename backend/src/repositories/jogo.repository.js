import Jogo from "../models/jogo.model.js";

async function criar(dados) {
    return await Jogo.create(dados);
}

async function salvar(jogo) {
    return await jogo.save();
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

async function listar({ filtro, skip, limite, ordenacao }) {
    const [jogos, total] = await Promise.all([
        Jogo.find(filtro).sort(ordenacao).skip(skip).limit(limite),
        Jogo.countDocuments(filtro),
    ]);

    return { jogos, total };
}

const JogoRepository = {
    criar,
    buscarPorIdIGDB,
    buscarPorIdNosso,
    deletarPorId,
    atualizarPorId,
    salvar,
    listar,
};

export default JogoRepository;
