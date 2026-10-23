const API_BASE = '/api';

export const adminApi = {
  async getAnalytics() {
    const res = await fetch(`${API_BASE}/admin/analytics`);
    return res.json();
  },

  async getUsers() {
    const res = await fetch(`${API_BASE}/admin/users`);
    return res.json();
  },

  async toggleBlockUser(id) {
    const res = await fetch(`${API_BASE}/admin/users/${id}/block`, { method: 'PUT' });
    return res.json();
  },

  // Vocabulary
  async getVocabulary(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/vocabulary?${query}`);
    return res.json();
  },

  async createVocabulary(data) {
    const res = await fetch(`${API_BASE}/admin/vocabulary`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async updateVocabulary(id, data) {
    const res = await fetch(`${API_BASE}/admin/vocabulary/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async deleteVocabulary(id) {
    const res = await fetch(`${API_BASE}/admin/vocabulary/${id}`, { method: 'DELETE' });
    return res.json();
  },

  // Reading
  async getReadings() {
    const res = await fetch(`${API_BASE}/reading`);
    return res.json();
  },

  async createReading(data) {
    const res = await fetch(`${API_BASE}/admin/reading`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async updateReading(id, data) {
    const res = await fetch(`${API_BASE}/admin/reading/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async deleteReading(id) {
    const res = await fetch(`${API_BASE}/admin/reading/${id}`, { method: 'DELETE' });
    return res.json();
  },

  // Writing Prompts
  async getWritingPrompts() {
    const res = await fetch(`${API_BASE}/writing/prompts`);
    return res.json();
  },

  async createWritingPrompt(data) {
    const res = await fetch(`${API_BASE}/admin/writing`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async updateWritingPrompt(id, data) {
    const res = await fetch(`${API_BASE}/admin/writing/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async deleteWritingPrompt(id) {
    const res = await fetch(`${API_BASE}/admin/writing/${id}`, { method: 'DELETE' });
    return res.json();
  },

  // Speaking Scenarios
  async getSpeakingScenarios() {
    const res = await fetch(`${API_BASE}/speaking/scenarios`);
    return res.json();
  },

  async createSpeakingScenario(data) {
    const res = await fetch(`${API_BASE}/admin/speaking`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async updateSpeakingScenario(id, data) {
    const res = await fetch(`${API_BASE}/admin/speaking/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async deleteSpeakingScenario(id) {
    const res = await fetch(`${API_BASE}/admin/speaking/${id}`, { method: 'DELETE' });
    return res.json();
  },

  // AI Characters
  async getAICharacters() {
    const res = await fetch(`${API_BASE}/speaking/characters`);
    return res.json();
  },

  async updateAICharacter(id, data) {
    const res = await fetch(`${API_BASE}/admin/characters/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // AI Content Generator
  async generateAIContent(contentType, topic, tone) {
    const res = await fetch(`${API_BASE}/admin/ai/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contentType, topic, tone }),
    });
    return res.json();
  },

  // Reports
  async getReports() {
    const res = await fetch(`${API_BASE}/admin/reports`);
    return res.json();
  },

  async updateReport(id, status) {
    const res = await fetch(`${API_BASE}/admin/reports/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    return res.json();
  },

  // Quests
  async getQuests() {
    const res = await fetch(`${API_BASE}/quests`);
    return res.json();
  },

  // Game World 30-Level Adventure Map Management
  async getGameAdminLevels() {
    const res = await fetch(`${API_BASE}/game/admin/levels`);
    return res.json();
  },

  async updateGameLevel(levelNumber, data) {
    const res = await fetch(`${API_BASE}/game/admin/levels/${levelNumber}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async getGameAnalytics() {
    const res = await fetch(`${API_BASE}/game/admin/analytics`);
    return res.json();
  },
};
