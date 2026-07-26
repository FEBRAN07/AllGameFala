import JogoRepository from "../repositories/jogo.repository.js";
import igdbRequest from "./igdb.service.js";

async function buscarJogos(termoBusca) {
    const resultado = await igdbRequest(
        "games",
        `search "${termoBusca}"; fields name,cover.url,first_release_date,genres.name,total_rating,total_rating_count,involved_companies.company.name,involved_companies.developer,involved_companies.publisher; where game_type = (0,8,9,10,11) & total_rating_count > 0; limit 50;`
    );
    return resultado;
}

async function cadastrarJogo(dados) {
    const jogo = await JogoRepository.criar(dados);
    return jogo;
}

async function getOuCriarJogo(idIGDB) {
    let jogo = await JogoRepository.buscarPorIdIGDB(idIGDB);
    if (jogo) return jogo;

    const [dados] = await igdbRequest(
        "games",
        `fields name,summary,cover.url,first_release_date,genres.name,platforms.name,involved_companies.developer,involved_companies.publisher,involved_companies.company.name; where id = ${idIGDB};`
    );

    console.log(dados);

    jogo = await JogoRepository.criar({
        idIGDB: dados.id,
        titulo: dados.name,
        desenvolvedor: dados.involved_companies?.filter((c) => c.developer).map((c) => c.company.name) || [],
        publicadoras: dados.involved_companies?.filter((c) => c.publisher).map((c) => c.company.name) || [],
        sinopse: dados.summary,
        capa: dados.cover?.url,
        dataLancamento: dados.first_release_date ? new Date(dados.first_release_date * 1000) : null,
        genero: dados.genres?.map((g) => g.name) || [],
        plataformas: dados.platforms?.map((p) => p.name) || [],
    });

    return jogo;
}

async function atualizarJogo(id, dadosAtualizados) {
    const jogoAtualizado = await JogoRepository.atualizarPorId(id, dadosAtualizados);
    return jogoAtualizado;
}

async function deletarJogo(id) {
    const jogoDeletado = await JogoRepository.deletarPorId(id);
    return jogoDeletado;
}

const JogoService = {
    buscarJogos,
    getOuCriarJogo,
    atualizarJogo,
    deletarJogo,
    cadastrarJogo
};

export default JogoService;
