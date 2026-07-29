# BacklogGD

Backend de uma plataforma de avaliações de jogos inspirada em Backloggd e Metacritic. A API permite consultar jogos na IGDB, montar um catálogo local, publicar avaliações e comentários, registrar curtidas e receber sugestões da comunidade.

## Recursos

- cadastro, login e autenticação com JWT;
- pesquisa de jogos pela [IGDB](https://www.igdb.com/) e persistência do jogo consultado;
- avaliações com nota de 0 a 5, média calculada automaticamente e intervalo de 24 horas entre novas avaliações do mesmo usuário para o mesmo jogo;
- comentários e curtidas em avaliações e comentários;
- gerenciamento de perfil e remoção de conta, incluindo a exclusão do conteúdo relacionado;
- sugestões de jogos e rotas administrativas para jogos e sugestões.

## Tecnologias

- Node.js e Express 5
- MongoDB e Mongoose
- JWT e bcryptjs
- Axios, para comunicação com a IGDB/Twitch
- Render, com configuração de deploy em `backend/render.yaml`

## Estrutura

```text
.
├── backend/
│   ├── src/
│   │   ├── config/        # conexão com o MongoDB
│   │   ├── controllers/   # camada HTTP
│   │   ├── middlewares/   # autenticação, autorização, validação e erros
│   │   ├── models/        # schemas do Mongoose
│   │   ├── repositories/  # acesso aos dados
│   │   ├── routes/        # endpoints da API
│   │   ├── services/      # regras de negócio e integração IGDB
│   │   ├── app.js
│   │   └── server.js
│   ├── package.json
│   └── render.yaml
├── LICENSE
└── README.md
```

## Como executar localmente

Pré-requisitos: Node.js 18+ e uma instância do MongoDB (local ou Atlas). Para as rotas de jogos, também é necessário criar credenciais de cliente Twitch para acesso à IGDB.

```bash
git clone <url-do-repositorio>
cd projeto-lions-backloggd/backend
npm install
```

Crie o arquivo `backend/.env` com as variáveis abaixo:

```env
PORT=3000
MONGO_URI=mongodb+srv://<usuario>:<senha>@<cluster>/<banco>
JWT_SECRET=uma-chave-secreta-longa
JWT_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=10
TWITCH_CLIENT_ID=seu-client-id
TWITCH_CLIENT_SECRET=seu-client-secret
```

Inicie o servidor:

```bash
npm start
```

A API estará disponível em `http://localhost:3000`. A rota `GET /` pode ser usada como verificação de disponibilidade.

## Autenticação e perfis

Após o cadastro ou login, a API retorna um `token`. Envie-o nas rotas protegidas:

```http
Authorization: Bearer <token>
```

Contas novas têm o tipo `usuario`. Rotas administrativas exigem que o usuário possua o tipo `admin` no banco de dados.

### Cadastro

```http
POST /api/auth/cadastro
Content-Type: application/json

{
  "nome": "Ana",
  "email": "ana@exemplo.com",
  "senha": "senha-com-ao-menos-6-caracteres"
}
```

### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "ana@exemplo.com",
  "senha": "senha-com-ao-menos-6-caracteres"
}
```

## Rotas

`🔒` requer autenticação. `👑` requer autenticação e perfil de administrador.

### Autenticação e usuário

| Método | Rota | Acesso | Descrição |
| --- | --- | --- | --- |
| POST | `/api/auth/cadastro` | Público | Cria uma conta e retorna usuário e token. |
| POST | `/api/auth/login` | Público | Autentica e retorna usuário e token. |
| GET | `/api/usuarios/perfil` | 🔒 | Retorna o perfil do usuário autenticado. |
| PATCH | `/api/usuarios/perfil` | 🔒 | Atualiza `nome` e/ou `senha`. |
| DELETE | `/api/usuarios/perfil` | 🔒 | Remove a conta, suas avaliações e seus comentários. |

### Jogos

| Método | Rota | Acesso | Descrição |
| --- | --- | --- | --- |
| GET | `/api/jogos/buscar?q=zelda` | Público | Busca até 50 jogos na IGDB. |
| GET | `/api/jogos/:idIGDB` | Público | Retorna o jogo local ou o importa da IGDB pelo ID. |
| POST | `/api/jogos` | 👑 | Cadastra um jogo manualmente. |
| PATCH | `/api/jogos/:id` | 👑 | Atualiza dados do jogo local. |
| DELETE | `/api/jogos/:id` | 👑 | Exclui o jogo, suas avaliações e os comentários delas. |

No cadastro manual de jogo, são obrigatórios `titulo`, `desenvolvedor`, `publicadoras`, `dataLancamento`, `plataformas`, `genero` e `sinopse`. Os campos de desenvolvedor, publicadoras, plataformas e gênero são listas de textos.

### Avaliações

| Método | Rota | Acesso | Descrição |
| --- | --- | --- | --- |
| GET | `/api/reviews` | Público | Lista todas as avaliações. |
| GET | `/api/reviews/jogo/:idJogo` | Público | Lista avaliações de um jogo local. |
| GET | `/api/reviews/usuario/:idUsuario` | Público | Lista avaliações de um usuário. |
| GET | `/api/reviews/:id` | Público | Retorna uma avaliação. |
| POST | `/api/reviews` | 🔒 | Cria uma avaliação. |
| PATCH | `/api/reviews/:id` | 🔒 | Edita a própria avaliação. |
| DELETE | `/api/reviews/:id` | 🔒 | Exclui a própria avaliação e seus comentários. |
| POST | `/api/reviews/:id/like` | 🔒 | Curte uma avaliação. |
| DELETE | `/api/reviews/:id/like` | 🔒 | Remove a curtida de uma avaliação. |
| GET | `/api/reviews/admin/todas` | 👑 | Lista todas as avaliações. |

Exemplo de criação:

```json
{
  "jogo": "<id-do-jogo-no-mongodb>",
  "nota": 4.5,
  "comentario": "Uma aventura marcante, com excelente direção de arte."
}
```

A nota aceita valores de 0 a 5 e o comentário comporta até 2.000 caracteres. A média do jogo é recalculada ao criar, editar ou excluir uma avaliação.

### Comentários

| Método | Rota | Acesso | Descrição |
| --- | --- | --- | --- |
| GET | `/api/comentarios/review/:idReview` | Público | Lista comentários de uma avaliação. |
| GET | `/api/comentarios/usuario/:idUsuario` | Público | Lista comentários de um usuário. |
| GET | `/api/comentarios/:id` | Público | Retorna um comentário. |
| POST | `/api/comentarios/review/:idReview` | 🔒 | Cria comentário em uma avaliação. |
| PATCH | `/api/comentarios/:id` | 🔒 | Edita o próprio comentário. |
| DELETE | `/api/comentarios/:id` | 🔒 | Exclui o próprio comentário. |
| POST | `/api/comentarios/:id/like` | 🔒 | Curte um comentário. |
| DELETE | `/api/comentarios/:id/like` | 🔒 | Remove a curtida de um comentário. |

O corpo para criação ou edição usa `{ "comentario": "..." }`; o limite é de 1.000 caracteres.

### Sugestões

| Método | Rota | Acesso | Descrição |
| --- | --- | --- | --- |
| GET | `/api/sugestao` | Público | Lista sugestões de jogos. |
| POST | `/api/sugestao` | 🔒 | Envia uma sugestão. |
| PATCH | `/api/sugestao/:id` | 👑 | Atualiza o status da sugestão. |
| DELETE | `/api/sugestao/:id` | 👑 | Exclui uma sugestão. |

Exemplo de envio:

```json
{
  "nomeJogo": "Hades II",
  "comentario": "Gostaria de acompanhar as avaliações da comunidade quando for lançado."
}
```

Para alterar o status, envie `{ "status": true }` ou `{ "status": false }`.

## Respostas e erros

As respostas são JSON. Erros seguem o formato abaixo:

```json
{
  "message": "Descrição do erro"
}
```

Os principais códigos utilizados são `400` para dados inválidos, `401` para ausência ou invalidez do token, `403` para falta de permissão, `404` para recurso inexistente, `409` para e-mail já cadastrado, `429` para tentativa antecipada de nova avaliação e `502` para falhas de comunicação com a IGDB/Twitch.

## Deploy

O arquivo [`backend/render.yaml`](backend/render.yaml) contém a configuração para publicar a API no Render. No serviço, informe os valores de `MONGO_URI`, `TWITCH_CLIENT_ID` e `TWITCH_CLIENT_SECRET`; o Render gera `JWT_SECRET` automaticamente conforme essa configuração.

## Licença

Este projeto está sob a licença [MIT](LICENSE).
