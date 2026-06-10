# My Health Hub

Plataforma de saúde e bem-estar — conecta clientes a profissionais de educação física.

---

## Estrutura do projeto

```
myhealthhub/
├── index.html              ← página principal (SPA)
├── css/
│   └── style.css
├── js/
│   └── app.js              ← toda lógica do frontend
└── backend/
    ├── server.js           ← servidor Express
    ├── db.js               ← conexão MySQL
    ├── .env                ← variáveis de ambiente (edite aqui)
    ├── package.json
    ├── middleware/
    │   └── auth.js         ← verificação JWT
    └── routes/
        ├── auth.js         ← POST /api/auth/login | register | GET /me
        ├── profissionais.js ← GET /api/profissionais | /:id | POST /:id/avaliar
        ├── servicos.js     ← GET /api/servicos | POST | PUT /:id
        └── agendamentos.js ← GET /api/agendamentos | POST | PATCH /:id/status
```

---

## Como rodar

### 1. Banco de dados
Importe o script SQL no MySQL Workbench ou terminal:
```bash
mysql -u root -p < bd_myhealthhub.sql
```

### 2. Backend
```bash
cd backend
npm install
# edite o arquivo .env com sua senha do MySQL
node server.js
# ou com hot-reload:
npm run dev
```
A API sobe em http://localhost:3000

### 3. Frontend
Abra o `index.html` com o **Live Server** do VS Code (porta 5500).

---

## Rotas da API

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | /api/auth/register | Cadastro (cliente ou profissional) |
| POST | /api/auth/login | Login → retorna JWT |
| GET | /api/auth/me | Perfil do usuário logado |
| GET | /api/profissionais | Lista profissionais (busca/filtro) |
| GET | /api/profissionais/:id | Detalhe + serviços + avaliações |
| POST | /api/profissionais/:id/avaliar | Avaliar profissional |
| GET | /api/servicos | Lista serviços |
| POST | /api/servicos | Criar serviço (profissional) |
| PUT | /api/servicos/:id | Editar serviço |
| GET | /api/agendamentos | Agendamentos do usuário logado |
| POST | /api/agendamentos | Criar agendamento |
| PATCH | /api/agendamentos/:id/status | Atualizar status |
=======
# 🏋️ My Health Hub

Marketplace de serviços de saúde que conecta profissionais de educação física a clientes, permitindo busca, comparação e contratação de serviços em um ambiente centralizado.

> ⚠️ **Projeto em desenvolvimento ativo** — estrutura e tecnologias podem sofrer alterações.

**Projeto de Extensão:** Fábrica de Software: Desenvolvimento de Websites, Aplicativos e Jogos  
**Instituição:** Universidade Sagrado Coração (Unisagrado) · Bauru - SP

---

## Funcionalidades Planejadas

- **Marketplace de profissionais** — listagem com perfis detalhados, especialidades e avaliações
- **Sistema de agendamento** — controle de horários e contratação de serviços
- **Área do profissional** — gerenciamento de serviços e visualização de agendamentos
- **Chat interno** — comunicação direta entre cliente e educador físico
- **Sistema de avaliação** — feedback estruturado sobre serviços prestados
>>>>>>> 3134d8d2196ee0cf0007334e2d0828857f6c0bbb

---

## Tecnologias

- **Frontend:** HTML, CSS, JavaScript vanilla
- **Backend:** Node.js + Express
- **Banco:** MySQL (mysql2)
- **Auth:** JWT + bcrypt
=======
=======
| Camada | Tecnologia |
|---|---|
| Backend | FastAPI (Python) |
| Frontend | HTML, CSS, JavaScript |
| Banco de Dados | MySQL |
| ORM | SQLAlchemy |
| Validação | Pydantic |
| Autenticação | JWT (python-jose) + bcrypt |
| Documentação de API | Swagger (integrado ao FastAPI) |

---

## Estrutura do Repositório

```
my-health-hub/
├── backend/
│   ├── app/
│   │   ├── core/
│   │   │   ├── database.py       # Conexão e sessão SQLAlchemy
│   │   │   └── security.py       # Autenticação JWT
│   │   ├── models/               # Entidades do banco (SQLAlchemy)
│   │   │   ├── user.py
│   │   │   ├── professional.py
│   │   │   ├── service.py
│   │   │   └── appointment.py
│   │   ├── schemas/              # Validação de dados (Pydantic)
│   │   ├── routers/              # Endpoints da API
│   │   ├── crud/                 # Operações com o banco
│   │   └── main.py               # Ponto de entrada da API
│   └── requirements.txt
│
├── frontend/
│   ├── assets/
│   ├── css/
│   ├── js/
│   └── pages/
│
├── database/                     # Scripts SQL
├── docs/                         # Documentação técnica
├── .env.example
├── .gitignore
└── README.md
```

---

## Instalação e Execução

### Pré-requisitos

- Python 3.10+
- MySQL Server
- pip

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/my-health-hub.git
cd my-health-hub
```

### 2. Configurar o ambiente virtual

```bash
cd backend

# Linux/macOS
python3 -m venv venv && source venv/bin/activate

# Windows
python -m venv venv && venv\Scripts\activate
```

### 3. Instalar dependências

```bash
pip install -r requirements.txt
```

### 4. Configurar variáveis de ambiente

Crie um arquivo `.env` dentro de `backend/` com base no `.env.example`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=my_health_hub
```

### 5. Executar a API

```bash
uvicorn app.main:app --reload
```

A API estará disponível em `http://localhost:8000`.  
A documentação interativa (Swagger) em `http://localhost:8000/docs`.

---

## Endpoints Disponíveis

| Método | Rota | Descrição |
|---|---|---|
| GET | `/` | Health check da API |
| GET | `/users/` | Listar usuários |
| GET | `/professionals/` | Listar profissionais |
| GET | `/services/` | Listar serviços |
| GET | `/appointments/` | Listar agendamentos |
| — | `/auth/` | Autenticação *(em desenvolvimento)* |

---

## Status do Projeto

| Componente | Status |
|---|---|
| Estrutura do backend | ✅ Concluído |
| Modelos e schemas | ✅ Concluído |
| Rotas de listagem | ✅ Concluído |
| CRUD completo | 🔄 Em desenvolvimento |
| Autenticação JWT | 🔄 Em desenvolvimento |
| Frontend | 🔄 Em desenvolvimento |
| Schema SQL | 🔄 Em desenvolvimento |
| Testes | ⏳ Pendente |

---

## Equipe

| Nome |
|---|
| Andrey Henrique Galbino Silva |
| Carlos Eduardo Rodrigues Silva |
| Carlos Eduardo Spacca Lopes |
| Daniel Lucarelli Cerri |
| Melck Silva de Oliveira Nascimento |
| Murilo Moretto Marques |

**Orientador:** Prof. Elvio
