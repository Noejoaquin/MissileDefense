import Game from './game';



document.addEventListener('DOMContentLoaded', () => {
  $('.end-screen').hide()
  const startAudio = new Audio(['assets/sound/Chopin - Nocturne op.9 No.2.mp3'])
  startAudio.load();
  startAudio.play();
  startAudio.loop = true;
  startAudio.muted = true;
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const game = new Game(ctx, canvas);
  let inPlay = true;
  let button = document.getElementById('sound-button')
  button.addEventListener('click', (e) => {
    if (startAudio.muted){
      startAudio.muted = false;
      game.muted = false;
      $('i.fa-microphone').toggleClass('sound')
    } else {
      startAudio.muted = true;
      game.muted = true;
      $('i.fa-microphone').toggleClass('sound')
    }
  })

  let button2 = document.getElementById('sound-button2')
  button2.addEventListener('click', (e) => {
    if (startAudio.muted){
      startAudio.muted = false;
      game.muted = false;
      $('i.fa-microphone').toggleClass('sound')
    } else {
      startAudio.muted = true;
      game.muted = true;
      $('i.fa-microphone').toggleClass('sound')
    }
  })

    document.addEventListener('keypress', (e) => {
      if ( e.code === 'Space' && inPlay === true){
        $('.start-screen').hide();
        game.muted = true;
        game.play(ctx, canvas);
        inPlay = false;
      }
    })
})
