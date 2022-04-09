# NOrona README.md

# NOrona – Stay negative!

[Link Deploy](http://github.com)

## Description

The year is 2022, and the plague that shall not be named has had its grip on humanity for a while now.

But still, you can't avoid leaving the house forever, so you decide to face the dangers outside and go for a walk in the park. Your  mission: stay  negative!

It's okay – the concentration of the virus is pretty low here, you manage to dodge it quite easily. Maybe you get hit by a little floating virus or two – and you do get damage! – but you survive relatively unscathed. You remember that you need to buy groceries along the way, so you enter the nearest shop. It's definitely harder here to avoid inhaling the microscopic balls of death, the shop is crowded. But you manage. Okay, that wasn't so bad, you think to yourself. You're in a good mood now. Right after paying for your groceries, a friend calls you: they're at a bar nearby, why don't you come have a drink? You decide that yes, seeing friends would be great, so you go. What you didn't quite expect when you enter the bar: it's packed! You have to find your friend and on the way try to steer clear of the numerous viruses flying around. Will you stay negative ...?

- *(Disclaimer: this is not a scientifically correct scenario.)*

## MVP (DOM - Canvas)

**the player**:

– can move freely around the canvas, in every direction, with arrow up/ down/ left/ right keys
– has 5 health points at start of each level
– can collect boosters, which add 1 to his health points

**the viruses**:

– X number of viruses appear as soon as game is started
- number and speed increases per level to make it more difficult
- viruses bounce around the canvas randomly /bounce off the edges of canvas
- collision with virus causes damage to player (reduce health points; small virus by 1)

**the boosters**:

- boosters appear randomly scattered at start of game: 1 in 1st level, 3 in 2nd level, 5 in 3rd level
– when collected by player (equals collision with booster), add 1 to health

**lose/win logic**:

– levels are 30 seconds, player has to reach exit (or goal) to not lose and continue with next level
– win: if player survives until end of 3rd level (= has  more than 0 health and reached green exit in level 3)
– lose: if player runs out of health points (= health points 0) or level time is up and player hasn’t reached exit to continue to next level

## Backlog

- display last 3 scores on game over screen
- create levels that work properly
- viruses + boosters should have minimum distance from each other and player when spawning
- add music/ background noises to levels
- add background images to levels (park, store, bar)
- display small info next to player when colliding with virus or booster (“+ 1 health” or “-1 health)
- be able to move player diagonally
- move stuff from index.js to Game class to make everything cleaner/clearer
- improve overall design

## Data structure

Classes/ methods / functions

**1. index.js**

get DOM elements
create canvas
add event listeners to buttons

functions:

- playerControls()
- startGame() (hides splash screen, shows game screen)
- instructionsCanvas() (displays instructions on canvas)
- playGame() (resets everything, starts timer and starts level 1)
- levelTimer()
- game(level) (initializes game elements + update() (which clears, draws, animates, etc and checks win/lose and starts next level)
- initialize() (creates game elements)
- createViruses() (creates number of viruses per level)
- createBoosters() (creates number of boosters per level)
- animateViruses()
- draw() (draws game elements)
- collisionDetection() (checks if player has collided with virus, booster or goal)
- collectingBooster() (checks if player has collided with booster – if yes, it plays booster sound, removes booster from boosters array, adds health point)
- losingHealthPoints() (checks if player has collided with virus – if yes, plays virus sound, removes virus from viruses array, subtracts health. point, and spawns a new virus so that. number of viruses per level stays the same)
- checkWin() (checks if player has survived all 3 levels and arrived at last exit, if yes – plays win sound and shows game won screen (with gameWon())
- checkLose() (checks if player has 0 health & still time left in level & not reached exit or if player has still health left but time’s up and he hasn’t reached the exit, then plays lose sound and shows game over screen (with gameOver())
- checkLevelDone() (checks if player reached exit, still has health, time left ≥ 0 and levels done are < 3, then resets virus and booster arrays and time left and continues with level 2. or 3)
- clear() (clears canvas)
- reset() (resets everything
- gameOver() (hides game screen, shows game over screen, resets and clears)
- gameWon() (hides game screen, shows game won screen, resets and clears)

**2. background.js** 
- Background {this.canvas, this.ctx, this.image, this.x, this.y}
- draw()

**3. player.js**

- Player () {this.canvas, this.ctx, this.image, this.width, this.height, this.x, this.y, this.playerSpeed, this.health}
- init() (images for up, down, left, right)
- draw()
- moveLeft()
- moveRight()
- moveUp()
- moveDown()
- win() (sound for winning)
- lose() (sound for losing)

**4. viruses.js**

- Virus () {this.ctx, this.image, this.width, this.height, this.x, this.y, this.xSpeed, this.ySpeed, this.damage}
- draw()
- randomXposition()
- randomYposition()
- sneeze() (sound for collision with player)

**5. booster.js**

- Booster() {this.canvas, this.ctx, this.image, this.width, this.height, this.x, this.y, this.healthPoints}
- draw()
- move()
- randomXposition()
- randomYposition()
- boosterShot() (sound for collision with player)

**6. goal.js**

- Goal () {this.canvas, this.ctx, this.width, this.height, this.image, this.x, this.y}
- draw()

## States and States Transitions

Definition of the different states and their transition (transition functions)

- splashScreen
- gameScreen
- gameoverScreen
- winScreen

## Additional Links

### Project

[ClickUp](https://sharing.clickup.com/b/h/6-168885946-2/ca2e129a2d36e5e)

### Slides

[Link Slides.com](http://slides.com)