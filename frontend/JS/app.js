document.addEventListener('DOMContentLoaded', async () => {
  const gamesContainer = document.getElementById('games-list');

  // Carrega os jogos da API
  const jogos = await api.fetchJogos();

  if (jogos.length === 0) {
    gamesContainer.innerHTML = '<p>Nenhum jogo encontrado no momento.</p>';
    return;
  }

  // Renderiza os cards dos jogos
  gamesContainer.innerHTML = jogos.map(jogo => `
    <article class="game-card">
      <div class="game-card-body">
        <h3>${jogo.nome || 'Nome Indisponível'}</h3>
        <p>${jogo.descricao || 'Sem descrição cadastrada.'}</p>
        <button class="btn" onclick="verDetalhes('${jogo.id}')">Ver Detalhes</button>
      </div>
    </article>
  `).join('');
});

function verDetalhes(id) {
  console.log(`Navegar para o jogo ID: ${id}`);
}