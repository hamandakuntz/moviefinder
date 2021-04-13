buscarFilmes()

function buscarFilmes () {
    const promessa = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/moviefinder/filmes");
    console.log(promessa)
    promessa.then(percorreDados);
}

function percorreDados (resposta){
    const dados = resposta.data;
    console.log(dados)
    for (let i = 0; i < dados.length; i++ ){
        const posicao = i;
        renderizarFilmes(dados, posicao)
    }
}


function renderizarFilmes (dados, posicao) {    

    const elementoListaFilmes = document.querySelector (".movies");    
     
    const filme = dados[posicao].imagem;
    const titulo = dados[posicao].titulo;
       

    elementoListaFilmes.innerHTML += `
    <div class="movie">
        <img src="${filme}">
        <div class="title">${titulo}</div>
        <button onclick="comprarFilme()">
            Comprar
            <ion-icon name="cart-outline"></ion-icon>
        </button>
    </div>`      
}

function comprarFilme () {
   const nomeDigitado = prompt("Digite o seu nome:")
   const assentos = prompt("Digite a quantidade de assentos:")

    const dados = {
        nome: nomeDigitado,
        quantidade: assentos
    }

   const requisicao = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/moviefinder/filmes/${dados}/ingresso`, dados)
   requisicao.then(tratarSucesso)
   requisicao.catch(tratarErro) 

}

function tratarSucesso() {
    alert("Ingresso comprado com sucesso!")
}

function tratarErro() {
    alert("Os ingressos para este filme estão esgotados!")
}

