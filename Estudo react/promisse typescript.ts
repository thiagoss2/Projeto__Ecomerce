async function buscarDados(url: string): Promise<void> {

    try {
        const resposta = await fetch(url); // Aguarda a resposta da solicitação
        const dados = await resposta.json(); // Aguarda a conversão da resposta para JSON
        console.log(dados);
    } catch (erro) {
        console.error("Erro ao buscar dados:", erro);
    }
}


