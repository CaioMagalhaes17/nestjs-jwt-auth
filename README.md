# API de Autenticação com NestJS

Esta é uma API de autenticação desenvolvida em NestJS que utiliza MySQL como banco de dados. Siga as instruções abaixo para configurar e rodar o projeto.

## Configuração do Ambiente

### Pré-requisitos

Antes de iniciar, certifique-se de ter o Node.js e o npm instalados na sua máquina.

### Instalação

1. Clone este repositório:

```bash
  git clone https://github.com/CaioMagalhaes17/nestjs-jwt-auth
```


2. Instale as dependências do projeto:

```bash
  npm install
```

3. Configure o arquivo .env

```bash
  cp .env-example .env
```

5. Importe o banco de dados MySQL:

- Baixe o arquivo `banco.sql` fornecido.
- Importe-o no seu servidor MySQL para criar o banco de dados e as tabelas necessárias.

## Executando a API

Para rodar o servidor da API, execute o seguinte comando:

```bash
  npm run start:dev
```


O servidor estará disponível em `http://localhost:3000` por padrão.

## Rotas da API

### Login

- **Método:** POST
- **Endpoint:** `/login`
- **Acesso:** Pública
- **Descrição:** Autentica um usuário e retorna um token JWT.
- **Status de Retorno:**
  - 200 OK: Sucesso na autenticação. Retorna um token JWT no formato Bearer.
  - 400 Bad Request: Erro na autenticação.

### Cadastro de Usuário

- **Método:** POST
- **Endpoint:** `/user`
- **Acesso:** Pública
- **Descrição:** Cria um novo usuário na base de dados.
- **Status de Retorno:**
  - 201 Created: Usuário criado com sucesso.
  - 400 Bad Request: Erro de validação ou usuário já existente.

### Mudança de Permissões (ADMIN)

- **Método:** PUT
- **Endpoint:** `/user/permissions/:userId`
- **Acesso:** Autenticada para administradores
- **Descrição:** Atualiza as permissões de um usuário específico.
- **Status de Retorno:**
  - 201 Created: Permissões atualizadas com sucesso.
  - 400 Bad Request: Erro de validação ou permissões inválidas.

### Ver Perfil do Usuário

- **Método:** GET
- **Endpoint:** `/user`
- **Acesso:** Autenticada
- **Descrição:** Retorna o perfil do usuário autenticado.
- **Status de Retorno:**
  - 200 OK: Retorna um objeto JSON com informações do usuário (id, nome, login, permissions).

## Tecnologias Utilizadas

- **NestJS:** Framework Node.js para construção de APIs eficientes e escaláveis.
- **MySQL:** Banco de dados relacional utilizado para armazenamento dos dados dos usuários.
- **JWT:** Utilizado para autenticação baseada em tokens.


# Considerações sobre o Uso:
  Apenas um usuário pode criar uma conta como administrador, os usuários posteriores devem ter suas permissões alteradas pelo ADMIN

## Autor

# Prints

<img src="https://github.com/CaioMagalhaes17/nestjs-jwt-auth/tree/master/blob/main/cadastro.png">
<img src="https://github.com/CaioMagalhaes17/nestjs-jwt-auth/tree/master/blob/main/login.png">
<img src="https://github.com/CaioMagalhaes17/nestjs-jwt-auth/tree/master/blob/main/permissions.png">
<img src="https://github.com/CaioMagalhaes17/nestjs-jwt-auth/tree/master/blob/main/perfil.png">


Caio Magalhães de Faria
