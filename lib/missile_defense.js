import Game from './game';



document.addEventListener('DOMContentLoaded', () => {
  $('.end-screen').hide()
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const game = new Game(ctx, canvas);
    document.addEventListener('keypress', (e) => {
      $('.start-screen').hide();
        game.play(ctx, canvas);
    })
})
