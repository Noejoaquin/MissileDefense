import Game from './game';



document.addEventListener('DOMContentLoaded', () => {
  $('.end-screen').hide()
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
