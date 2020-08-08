// metodos staticos não podem trabalhar com variavel this
// trazer util de maneira global para usar com static
const util = Util

const ID_CONTEUDO = "conteudo"
const ID_BTN_JOGAR = "jogar"
const ID_BTN_MOSTRAR_TUDO = "mostrarTudo"
const ID_MENSAGEM = "mensagem"
const CLASSE_INVISIBLE = "invisible"
const ID_CARREGANDO = "carregando"
const ID_CONTADOR = "contador"
const MENSAGEM = {
    sucesso: {
        texto:'Combinação correta!',
        class:'alert-success'
    },
    erro: {
        texto:'Combinação Incorreta!',
        class:'alert-danger'
    }
}

class Tela {
    static obterCodigoHtml(item){
        return `<div class="col-md-3">
                <div class="card" style="width: 50%;" onclick="window.verificarSelecao('${item.id}', '${item.nome}')">
                    <img src="${item.img}" name="${item.nome}" class="card-img-top" alt="...">
                </div>
                <br>
            </div>
            `
    }

    static configurarBotaoConfigurarSelecao(funcaoOnClick){
        window.verificarSelecao = funcaoOnClick
    }

    static alterarConteudoHTML(codigoHtml) {
        const conteudo = document.getElementById(ID_CONTEUDO);
        conteudo.innerHTML = codigoHtml
    }

    static gerarStringHTMLPelaImage(itens) {
        // para cada item da lista, vai executar a função obterCodigoHtml
        // no final concatena em uma única String
        // muda de Array para String.
         return itens.map(Tela.obterCodigoHtml).join('')
    }

    static atualizarImagens(itens) {
        const codigoHtml = Tela.gerarStringHTMLPelaImage(itens)
        Tela.alterarConteudoHTML(codigoHtml)
    }

    static configurarBotaoJogar(funcaoOnClick) {
        const btnJogar = document.getElementById(ID_BTN_JOGAR)
        btnJogar.onclick = funcaoOnClick
    }

    static exibirHerois(nomeDoHeroi, img){
        const elementosHtml = document.getElementsByName(nomeDoHeroi)
        // para cada elemento encontrado na tela, vamos alterar a imagem
        // com forEach, para cada item, dentro dos () setamos o valor
        // de imagem
        elementosHtml.forEach(item => (item.src = img))

    }

    static async exibirMensagem(sucesso = true) {
        const elemento = document.getElementById(ID_MENSAGEM)
        if(sucesso){
            elemento.classList.remove(MENSAGEM.erro.class)
            elemento.classList.add(MENSAGEM.sucesso.class)
            elemento.innerText = MENSAGEM.sucesso.texto
        }
        else{
            elemento.classList.remove(MENSAGEM.sucesso.class)
            elemento.classList.add(MENSAGEM.erro.class)
            elemento.innerText = MENSAGEM.erro.texto
        }
        elemento.classList.remove(CLASSE_INVISIBLE)

        await util.timeout(1000)
        elemento.classList.add(CLASSE_INVISIBLE)
        
    }

    static exibirCarregando(mostrar = true){
        const carregando = document.getElementById(ID_CARREGANDO)
        if(mostrar){
            carregando.classList.remove(CLASSE_INVISIBLE)
            return;
        }

        carregando.classList.add(CLASSE_INVISIBLE)
    }

    static iniciarContador(){
        let contFinal = 3
        const elementoContador = document.getElementById(ID_CONTADOR)

        // substituir o texto começando $$contador segundos.
        // onde está o $$contador adicionarei o valor
        const identificadorNoTexto = "$$contador"
        const textoPadrao = `Começando em ${identificadorNoTexto} segundos...`

        //criar função em linha para atualizar o texto
        // a cada segundo

        const atualizarTexto = () =>
        (elementoContador.innerHTML = textoPadrao.replace(identificadorNoTexto, contFinal--))
    
        atualizarTexto()
        // a cada segundo, vai chamar a funçao atualizar texto
        // essa função vai substituir o $$contador pelo `contarFinal` diminuindo 1
        // retorna o id do intervalo
        const idDoIntervalo = setInterval(atualizarTexto, 1000)
        return idDoIntervalo

    }

    static limparContador(idDoIntervalo) {
        clearInterval(idDoIntervalo)
        document.getElementById(ID_CONTADOR).innerHTML = ""
    }

    static configuraBotaoMostrarTudo(funcaoOnClick) {
        const btnMostrarTudo = document.getElementById(ID_BTN_MOSTRAR_TUDO)
        btnMostrarTudo.onclick = funcaoOnClick
    }
}