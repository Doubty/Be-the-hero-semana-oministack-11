const connection = require('../database/connection');

module.exports = {

    async index(request, response) {
        const { page = 1 } = request.query;
       
        const  [count]= await connection('incidents').count();

        

        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page -1) * 5) // aqui é usado pra mostar o conteúdo de acordo com um pulo, onde a cada página irá mostrando 5 e pulando de acordo com o número da página, ex pg 1 começa em 0 e pg 2 já começa em 5
        //Filtando o que deve aparecer
        .select('incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf');
          
        // retornando o count no header do response 
        response.header('X-Total-Count', count['count(*)'])
        return response.json(incidents);
    },

    async create(request, response) {

        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        //Fazendo isso do const result para pegar o id armazenado
        // pode pegar pelo array ou pela estrutura 
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });


        //coloquei com chaves o retorno para o frontend saber o nome do valor
        return response.json({ id })

    },

    async delete(request, response) {

        const { id } = request.params;
        const ong_id = request.headers.authorization

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if (incident.ong_id != ong_id) {
            // mudando o status de erro para o 401 não autorizado
            return response.status(401).json({ error: 'operation not permited' })
        }

        await connection('incidents').where('id', id).delete();

        // aqui estou retornando um status 204 que não tem conteúdo
        return response.status(204).send();
    }

}