class JogoDaMemoria {
    // se mandar um obj = {tela:1, idade:2, etc:3}
    // vai ignorar o resto das prop e pegar somente tela
    constructor({ tela, util}){
        this.tela = tela
        this.util = util

        //caminho relativo ao index.html
        this.heroisIniciais = [
            {img:'./arquivos/batman.png', nome:"batman"},
            {img:'./arquivos/wolverine.png', nome:"wolverine"},
            {img:'./arquivos/thor.png', nome:"thor"},
            {img:'./arquivos/spyder.png', nome:"spyder"},
        ]

        this.iconePadrao = './arquivos/ninja.png'

        this.heroisEscondidos = []
        this.heroisSelecionados = []
    }

    // para usar o this, não pode usar static!
    inicializar() {
        // vai pegar todas as funcoes da classe Tela
        this.tela.atualizarImagens(this.heroisIniciais)
        
        // força a tela a usar o THIS de jogo da memória
        this.tela.configurarBotaoJogar(this.jogar.bind(this))
        this.tela.configurarBotaoConfigurarSelecao(this.verificarSelecao.bind(this))
        this.tela.configuraBotaoMostrarTudo(this.mostrarHeroisEscondidos.bind(this))
    }

    async embaralhar() {
        const copias = this.heroisIniciais

        //duplicar itens
        .concat(this.heroisIniciais)

        //entrar em cada item e criar um id aleatório
        .map(item => {
            return Object.assign({}, item, { id: Math.random()/0.5})
        })

        // ordena aleatoriamente
        .sort(() => Math.random() - 0.5)
        this.tela.atualizarImagens(copias)
        this.tela.exibirCarregando()

        const idDoIntervalo = this.tela.iniciarContador()
        // esperar 3 segundos para atualizar a tela
        await this.util.timeout(3000)
        this.tela.limparContador(idDoIntervalo)
        this.esconderHerois(copias)
        this.tela.exibirCarregando(false)

    }

    esconderHerois(herois){
        // trocar a imagem de todos os herois existentes
        // pelo icone padrão
        // usando a sintaxe ({ chave: 1}) estamos falando que vamos retornar
        // oq tiver dentro dos parenteses
        // quando não usa : (exemplo do id), o JS entende que o nome
        // é o mesmo do valor. Ex: id:id, vira id.
        const heroisOcultos = herois.map(({nome, id}) => ({
            id,
            nome,
            img: this.iconePadrao
        }))

        this.tela.atualizarImagens(heroisOcultos)
        // guarmos os herois para trabalhar com eles depois
        this.heroisEscondidos = heroisOcultos
    }

    exibirHerois(nomeDoHeroi) {
        // procurar pelo nome dos herois
        // obter só imagem
        const {img} = this.heroisIniciais.find(({nome}) => nomeDoHeroi === nome)
        
        // função para atualizar a imagem do heroi selecionado
        this.tela.exibirHerois(nomeDoHeroi, img)
    }

    verificarSelecao(id, nome) {
        const item = { id, nome }

        // verificar quantidade de herois selecionados
        // e tomar ação se certo ou errado
        const heroisSelecionados = this.heroisSelecionados.length
        switch(heroisSelecionados) {
            case 0:
                this.heroisSelecionados.push(item)
                break;
            case 1:
                // se a quantidade for 1, significa que so pode escolher mais 1
                const [ opcao1 ]  = this.heroisSelecionados
                //zerar itens para não selecionar + de 2
                this.heroisSelecionados = []

                // conferir se nome e id são iguais
                if(opcao1.nome === item.nome &&
                // aqui verifica os ids sao diferentes
                // o cara pode clicar no mesmo ícone duas vezes
                opcao1.id !== item.id){
                    this.exibirHerois(item.nome)
                    // como o padrão é true, não precisa passar nada.
                    this.tela.exibirMensagem()
                    return;
                }
                this.tela.exibirMensagem(false)
                break;

        }
    }
    // this se refere ao contexto atual
    // 
    jogar() {
        this.embaralhar()
    }

    mostrarHeroisEscondidos() {
        const heroisEscondidos = this.heroisEscondidos
        for (const heroi of heroisEscondidos) {
            const { img } = this.heroisIniciais.find(item => item.nome === heroi.nome)
            heroi.img = img
        }
        this.tela.atualizarImagens(heroisEscondidos)
    }

}