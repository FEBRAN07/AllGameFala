// JS/app.js - Controle de Interface
let currentUser = JSON.parse(localStorage.getItem('usuario')) || null;
let currentSelectedGameId = null;

document.addEventListener('DOMContentLoaded', () => {
  setupAuthUI();
  loadCatalog();
  setupEventListeners();
});

// Atualiza UI de Login/Perfil
function setupAuthUI() {
  const authArea = document.getElementById('auth-area');
  if (currentUser) {
    authArea.innerHTML = `
      <div class="user-avatar-badge">
        <img src="${currentUser.fotoPerfil || 'https://via.placeholder.com/40'}" alt="${currentUser.nome}" />
        <span>${currentUser.nome}</span>
        <button class="btn btn-outline btn-sm" onclick="logout()">Sair</button>
      </div>
    `;
  } else {
    authArea.innerHTML = `
      <button class="btn btn-outline" onclick="openModal('modal-auth', false)">Entrar</button>
      <button class="btn btn-primary" onclick="openModal('modal-auth', true)">Cadastrar</button>
    `;
  }
}

function logout() {
  API.clearToken();
  currentUser = null;
  setupAuthUI();
}

// Modais
function openModal(id, isRegisterMode = false) {
  const modal = document.getElementById(id);
  if (!modal) return;
  
  if (id === 'modal-auth') {
    const nomeGroup = document.getElementById('group-nome');
    const title = document.getElementById('auth-modal-title');
    const btnSubmit = document.getElementById('btn-auth-submit');
    
    if (isRegisterMode) {
      nomeGroup.style.display = 'block';
      title.innerText = 'Criar uma Conta';
      btnSubmit.innerText = 'Cadastrar';
      btnSubmit.dataset.mode = 'register';
    } else {
      nomeGroup.style.display = 'none';
      title.innerText = 'Entrar na Conta';
      btnSubmit.innerText = 'Entrar';
      btnSubmit.dataset.mode = 'login';
    }
  }

  modal.classList.add('active');
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('active');
}

// Renderização do Catálogo
async function loadCatalog() {
  const grid = document.getElementById('games-grid');
  try {
    const jogos = await API.getJogos();
    renderGames(jogos);
  } catch (error) {
    grid.innerHTML = `<p style="color:var(--text-secondary); text-align:center; grid-column: 1/-1;">Erro ao carregar catálogo.</p>`;
  }
}

function renderGames(jogos) {
  const grid = document.getElementById('games-grid');
  if (!jogos.length) {
    grid.innerHTML = `<p style="color:var(--text-secondary); text-align:center; grid-column: 1/-1;">Nenhum jogo encontrado.</p>`;
    return;
  }

  grid.innerHTML = jogos.map(jogo => `
    <div class="game-card" onclick="openGameDetails('${jogo.idIGDB}')">
      <div class="cover-container">
        <img class="cover-img" src="${jogo.capa || 'https://via.placeholder.com/170x220'}" alt="${jogo.titulo}" loading="lazy"/>
      </div>
      <div class="card-details">
        <div class="game-title">${jogo.titulo}</div>
        <div class="game-rating">★ ${jogo.notaMedia ? Number(jogo.notaMedia).toFixed(1) : 'N/A'}</div>
      </div>
    </div>
  `).join('');
}

// Detalhes do Jogo
async function openGameDetails(jogoId) {
  try {
    const jogo = await API.getJogoById(jogoId);
    currentSelectedGameId = jogo._id;
    document.getElementById('modal-game-cover').src = jogo.capa || 'https://via.placeholder.com/200';
    document.getElementById('modal-game-title').innerText = jogo.titulo;
    document.getElementById('modal-game-desc').innerText = jogo.descricao || 'Sem descrição cadastrada.';
    document.getElementById('modal-game-genre').innerText = jogo.genero || 'Geral';
    document.getElementById('modal-game-year').innerText = jogo.anoLancamento || '-';

    await loadReviews(jogo._id);
    openModal('modal-game');
  } catch (err) {
    alert(err.message);
  }
}

async function loadReviews(jogoId) {
  const reviewsContainer = document.getElementById('reviews-list');
  try {
    const reviews = await API.getReviewsByJogo(jogoId);
    if (!reviews.length) {
      reviewsContainer.innerHTML = `<p style="color:var(--text-muted); font-size:0.85rem;">Seja o primeiro a avaliar!</p>`;
      return;
    }

    reviewsContainer.innerHTML = reviews.map(r => `
      <div class="review-item">
        <div class="review-header">
          <span class="review-author">${r.usuario ? r.usuario.nome : 'Jogador'}</span>
          <span class="review-rating">${'★'.repeat(r.nota)}</span>
        </div>
        <p class="review-text">${r.comentario}</p>
      </div>
    `).join('');
  } catch (err) {
    reviewsContainer.innerHTML = `<p style="color:var(--text-muted)">Erro ao carregar avaliações.</p>`;
  }
}

// Event Listeners
function setupEventListeners() {
  // Autenticação Submit
  document.getElementById('form-auth').addEventListener('submit', async (e) => {
    e.preventDefault();
    const mode = document.getElementById('btn-auth-submit').dataset.mode;
    const email = document.getElementById('auth-email').value;
    const senha = document.getElementById('auth-senha').value;

    try {
      if (mode === 'register') {
        const nome = document.getElementById('auth-nome').value;
        const res = await API.registro(nome, email, senha);
        API.setToken(res.token);
        currentUser = res.usuario;
      } else {
        const res = await API.login(email, senha);
        API.setToken(res.token);
        currentUser = res.usuario;
      }
      setupAuthUI();
      closeModal('modal-auth');
    } catch (err) {
      alert(err.message);
    }
  });

  // Busca
  document.getElementById('btn-search').addEventListener('click', async () => {
    const query = document.getElementById('search-input').value.trim();
    if (!query) return loadCatalog();

    try {
      const resultados = await API.buscarIGDB(query);
      document.getElementById('grid-title').innerText = `Resultados para: "${query}"`;
      renderGames(resultados);
    } catch (err) {
      alert(err.message);
    }
  });

  // Review Submit
  document.getElementById('form-review').addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!currentUser) return alert('Você precisa estar logado para publicar uma review.');

    const nota = Number(document.getElementById('review-nota').value);
    const texto = document.getElementById('review-texto').value;

    try {
      await API.criarReview(currentSelectedGameId, nota, texto);
      document.getElementById('review-texto').value = '';
      loadReviews(currentSelectedGameId);
    } catch (err) {
      alert(err.message);
    }
  });

  // Sugestão Submit
  document.getElementById('nav-suggest').addEventListener('click', () => openModal('modal-suggest'));
  document.getElementById('form-suggest').addEventListener('submit', async (e) => {
    e.preventDefault();
    const nome = document.getElementById('suggest-nome').value;
    const motivo = document.getElementById('suggest-motivo').value;

    try {
      await API.enviarSugestao(nome, motivo);
      alert('Sugestão enviada com sucesso!');
      closeModal('modal-suggest');
      document.getElementById('form-suggest').reset();
    } catch (err) {
      alert(err.message);
    }
  });
}