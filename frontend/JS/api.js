const API_BASE_URL = 'http://localhost:3000'; // Ajuste a porta conforme a sua rota backend

const api = {
  async fetchJogos() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/jogos`);
      if (!response.ok) throw new Error('Erro ao buscar jogos');
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      return [];
    }
  }
};