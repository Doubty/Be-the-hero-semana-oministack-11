const express = require('express');
const routes = require('./routes');
const cors = require('cors'); // precisa instalar: npm install cors

const app = express();

//Precisa mostara ao servidor que estará usando json nas requisições
app.use(cors()); // Desse jeito, eu já permito que toda aplicação frontend acesse ao meu servidor node
app.use(express.json());
app.use(routes);
app.listen(3333);



/**
 * npx executa um pacote
 * npm instala um pacote
 */
/*
Métodos HTPP:
Get: Buscar uma informação do backend, exemplo a lista de usuários
Post: criar alguma informação no backend, exemplo de um cadastro
Put: Alterar alguma informação
Delete: deletar alguma informação do backend
*/

/*
Tipos de parâmetros em uma rota:

Query: parametros nomeados e inseridos na rota  após o ? (Filtro e paginação) ?page=2&nome=galvao (request.query)
Route params: Usado para identificar recursos   /users/1 e /users/:id   (request.params)
Request Body: é o corpo da requisição, usado para criar ou alterar recursoss   (request.body)

pra retonrar um json  responde.json({})
*/


/* Banco de dados:
  SQL: mysql, postgres, sqlite, oracle
  NoSQL: mongoDB, CouchDB
*/

/**
 * Formas de consultas dos dados:
 * drive: select * from users
 * query builder: table('users').select('*').where()
 */


