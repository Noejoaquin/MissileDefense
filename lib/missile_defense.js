import Game from './game';



document.addEventListener('DOMContentLoaded', () => {
  $('.end-screen').hide()
  const startAudio = new Audio(['assets/sound/Chopin - Nocturne op.9 No.2.mp3'])
  startAudio.load();
  debugger
  startAudio.play();
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const game = new Game(ctx, canvas);
  let inPlay = true;
    document.addEventListener('keypress', (e) => {
      if ( e.code === 'Space' && inPlay === true){
        $('.start-screen').hide();
        inPlay = false;
        game.play(ctx, canvas);
      }
    })
})
