import { SiteClient } from 'datocms-client';

export default async function recebedorDeRequests(req, res) {
    if(req.method === 'POST') {
        const TOKEN = 'dff46a031c5c729c7a06f42ad15069';
        const client = new SiteClient(TOKEN);
        
        //Validar os dados, antes de sair cadastrando
        const registroCriado = await client.items.create({
            itemType: "972758", // ID do Model de "Communities" criado pelo Dato
            ...req.body,
        })

        res.json({
            dados: 'Algum dado qualquer',
            registroCriado: registroCriado,
        })
        return;
    }

    res.status(404).json({
        message: 'Ainda não temos nada no GET, mas no POST tem!'
    })
}