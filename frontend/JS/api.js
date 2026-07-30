// JS/api.js - Camada de requisições
const API_BASE_URL = 'https://allgamefala.onrender.com/api'; // Ajuste caso necessário

const API = {
  getToken() {
    return localStorage.getItem('token');
  },

  setToken(token) {
    localStorage.setItem('token', token);
  },

  clearToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  },

  async request(endpoint, options = {}) {
    const token = this.getToken();
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.mensagem || 'Erro na requisição');
    }
    return data;
  },

  // Auth
  login: (email, senha) => API.request('/auth/login', { method: 'POST', body: JSON.stringify({ email, senha }) }),
  registro: (nome, email, senha) => API.request('/auth/cadastro', { method: 'POST', body: JSON.stringify({ nome, email, senha }) }),

  // Jogos
  getJogos: () => API.request('/jogos'),
  buscarIGDB: (query) => API.request(`/jogos/buscar?q=${encodeURIComponent(query)}`),
  getJogoById: (id) => API.request(`/jogos/${id}`),

  // Reviews
  getReviewsByJogo: (jogoId) => API.request(`/reviews/jogo/${jogoId}`),
  criarReview: (jogoId, nota, comentario) => API.request('/reviews', { method: 'POST', body: JSON.stringify({ jogo: jogoId, nota, comentario }) }),

  // Sugestões
  enviarSugestao: (nomeJogo, comentario) => API.request('/sugestao', { method: 'POST', body: JSON.stringify({ nomeJogo, comentario }) })
};