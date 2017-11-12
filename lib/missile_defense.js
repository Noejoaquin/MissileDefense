import Game from './game';



document.addEventListener('DOMContentLoaded', () => {
  // const modal = document.getElementsByClassName('start-screen')
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const game = new Game(ctx, canvas);
    document.addEventListener('keypress', (e) => {
      debugger
      $('.start-screen').hide();
      game.play(ctx, canvas);
    }) 
  // game.play();
})
