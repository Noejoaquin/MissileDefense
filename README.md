## MissileDefense

![MissileDefense](https://noejoaquin.github.io/MissileDefense/)

### Instructions

The player is a lone gunner, protecting the surrounding cities from falling missiles. Missiles are destroyed when they are hit by a bullet, or by the bullet's blast radius. There are six cities that must be protected, and the gunner can only be hit three times. The game is over if any of these numbers are met. ![Have fun!](https://noejoaquin.github.io/MissileDefense/)


### Technologies and Languages

The primary languages used in the creation of MissileDefense are JavaScript, HTML5, and CSS3. The primary technology used for the rendering of animations and graphics is HTML5Canvas. jQuery is implemented to grab the canvas element at the game's start, as well as update game stats, while keymaster.js is a micro-library used for defining keyboard shortcuts.


### Technical Implementation

The biggest difficulty in creating MissileDefense was the implementation of collision detection. I decided to use circles so that I only had to check the distance between the colliding objects centers, and compare that length to the combined length of their radii. The second part of implementing collision concerned the detonation of the bullet upon reaching its destination. It required redrawing that  bullet with a new radius,
![bullet_draw.png]('./assets/images/bullet_draw.png')
![remove_bullet.png]('./assets/images/remove_bullet.png')

 as well as taking it out of the bullets array in my game class and placing it in my exploded objects array. This was crucial for clearing the exploded objects from the canvas, which occurs every two seconds.

### TODOS and Future Features

I must refactor my game class. It is too large, and the check collision method can be broken up, and its responsibility shared by the gunner, bullet, city, and missile objects. It is also imperative to refactor the implementation of `requestAnimationFrame` and the play function so that new levels can be created with ease. My missile, gunner, and bullet classes are all sharing functions that should extracted and held in a parent `CollidingObjects` class.

Some future features I would like to implement include sprites, more robust levels, and sound effects.
