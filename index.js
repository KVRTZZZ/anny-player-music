//vetores

let musicas = [
    {titulo: 'Summertime Sadness', artista: 'Lana Del Rey'
    ,src: 'musicas/summertime.mp3', img: 'images/gatinho-livro.jpg'},
    {titulo: 'doin', artista: 'Lana Del Rey'
    ,src: 'musicas/doin.mp3', img: 'images/gatinho.jpg'},
    {titulo: 'Born to die' , artista: 'Lana Del Rey'
    ,src: 'musicas/die.mp3', img: 'images/gatinho-olho.jpg'}
];


//variaveis globais


let musica = document.querySelector('audio');
let indexMusica = 0;
let duracaoMusica = document.querySelector('.fim');
let nomeMusica = document.querySelector('.descricao h2');
let nomeArtista = document.querySelector('.descricao i');
let imagem = document.querySelector('.imagem-topo');

renderizarMusica(indexMusica);

//listas de eventos
document.querySelector('.botao-retomar').addEventListener('click', tocarMusica);
document.querySelector('.botao-pause').addEventListener('click', pausarMusica);
musica.addEventListener('timeupdate', atualizarBarra);
musica.addEventListener('loadeddata', duration);
document.querySelector('.anterior').addEventListener('click', () => {
    indexMusica--;
    if (indexMusica < 0) {
        indexMusica = 2;
    }
    renderizarMusica(indexMusica);
});

document.querySelector('.proxima').addEventListener('click', () => {
    indexMusica++;
    if (indexMusica > 2) {
        indexMusica = 0;
    }
    renderizarMusica(indexMusica);
});

//lista de funções

function renderizarMusica(index) {
    musica.setAttribute('src', musicas[index].src);
    musica.addEventListener('loadeddata', () => {
        nomeMusica.textContent = musicas[index].titulo;
        nomeArtista.textContent = musicas[index].artista;
        imagem.src = musicas[index].img;
        duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));
        
    });
}

function tocarMusica() {
    musica.play();
    document.querySelector('.botao-pause').style.display = 'block';
    document.querySelector('.botao-retomar').style.display = 'none';

}


function atualizarBarra() {
    let barra = document.querySelector('progress')
    barra.style.width = Math.floor((musica.currentTime / musica.duration) * 100) + '%';
    let tempoDecorrido = document.querySelector('.inicio')
    tempoDecorrido.textContent = segundosParaMinutos(Math.floor(musica.currentTime))
    
}
function pausarMusica() {
    musica.pause();
    document.querySelector('.botao-retomar').style.display = 'block';
    document.querySelector('.botao-pause').style.display = 'none';
}

function duration() {
    let duracaoMusica = document.querySelector('.fim');
    duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));
}

function segundosParaMinutos(segundos) {
    let campoMinutos = Math.floor(segundos/60);
    let campoSegundos = segundos % 60;
    
    if (campoSegundos < 10) {
        campoSegundos = '0' + campoSegundos;
    }
    return campoMinutos + ':' + campoSegundos;
}