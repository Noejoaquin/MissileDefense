import Game from './game';



document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.querySelector('canvas');
  // canvas.onclick = function(e) {
  //     console.log('clicked')
  //     debugger
  // }

  const ctx = canvas.getContext('2d');
  let game = new Game(ctx, canvas);
  game.play();
})
