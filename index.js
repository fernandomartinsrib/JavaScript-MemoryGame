function onLoad() {
    const dependencias = {
        tela: Tela, // Classe tela é global
        util: Util
    }

    //inicializar jogo da Memória
    const jogoDaMemoria = new JogoDaMemoria(dependencias)
    jogoDaMemoria.inicializar()
}

window.onload = onLoad