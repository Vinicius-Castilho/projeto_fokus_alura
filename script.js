const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botao = document.querySelectorAll('.app__card-button')
const musicaFocoInput = document.querySelector('#alternar-musica')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const tempoNaTela = document.querySelector('#timer')
const printTempo = document.querySelector('.app__card-timer')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
const musicaPlay = new Audio('/sons/play.wav')
const musicaPausa = new Audio('/sons/pause.mp3')
const musicaStop = new Audio('/sons/beep.mp3')
const botãoStart = document.querySelector('#start-pause')
const imagemBtComeçar= document.querySelector('.app__card-primary-butto-icon')

let tempo = 1500
let intervaloID= null

musica.loop = true

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    }

    else{
        musica.pause()
    }
})

focoBt.addEventListener('click', () => {
    tempo = 1500
    // html.setAttribute('data-contexto', 'foco')
    // banner.setAttribute('src', '/imagens/foco.png')
    // titulo.innerHTML= `Otimize sua produtividade, <br>
    //     <strong class="app__title-strong">mergulhe no que importa</strong>`  <-- innerHTML serve pra alterar o texto e criar listas se colocar um + antes do H
    ; //classlist 
    alterarContexto('foco'); // se alterar a ordem não funciona a alteração do active na função
    focoBt.classList.add('active')
})
curtoBt.addEventListener('click', () => {
    tempo = 300
    // html.setAttribute('data-contexto', 'descanso-curto')
    // banner.setAttribute('src', '/imagens/descanso-curto.png')
    // titulo.innerHTML=`Que tal dar uma respirada? <br>
    //     <strong class="app__title-strong">Faça uma pausa curta!</strong>`
    
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
})
longoBt.addEventListener('click', () => {
    tempo = 900
    // html.setAttribute('data-contexto', 'descanso-longo')
    // banner.setAttribute('src', '/imagens/descanso-longo.png') //exemplo de como seria sem a função
    // titulo.innerHTML= `Hora de voltar à superfície. <br>
    //     <strong class="app__title-strong">Faça uma pausa longa.</strong>`
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
})

function alterarContexto(contexto,){
    mostrarTempo()

    botao.forEach(function (contexto){
        contexto.classList.remove('active');
    })
    
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`) //função para alterar os atributos evitando repetição 
     switch (contexto) {
         case "foco":
             titulo.innerHTML= `Otimize sua produtividade, <br>
             <strong class="app__title-strong">mergulhe no que importa</strong>`
             break;

         case "descanso-curto":
             titulo.innerHTML= `Que tal dar uma respirada? <br>
             <strong class="app__title-strong">Faça uma pausa curta!</strong>`
             break;

         case "descanso-longo":
             titulo.innerHTML= `Hora de voltar à superfície. <br>
             <strong class="app__title-strong">Faça uma pausa longa.</strong>`
              break;
         default:
             break;
     }
}


const contagemRegressiva = () => {
    if(tempo <= 0){
        musicaStop.play()
        alert('Tempo Finalizado')
        zerar()
        mostrarTempo()
        return
    }
    tempo -=1
    mostrarTempo()
    console.log('Temporizador: ' + tempo)
}

botãoStart.addEventListener('click', iniciarOuPausar)


function iniciarOuPausar(){
    
    if(intervaloID){ // especifico para pausa
        musicaPausa.play()
        iniciarOuPausarBt.innerHTML=`Começar`
        imagemBtComeçar.setAttribute('src', '/imagens/play_arrow.png')
        zerar()
        return
    }
    musicaPlay.play();
    intervaloID = setInterval(contagemRegressiva, 1000 )
    imagemBtComeçar.setAttribute('src', '/imagens/pause.png')
    iniciarOuPausarBt.innerHTML=`Pausar`
   
}



function zerar(){
    clearInterval(intervaloID)
    intervaloID = null
}


function mostrarTempo(){
    const segundosNaTela = new Date(tempo*1000)
    const tempoFormatado = segundosNaTela.toLocaleTimeString('pt-br' , {minute: '2-digit', second:'2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`

}

mostrarTempo();