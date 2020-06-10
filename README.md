# Extreme Easter Egg

Built with Cocos Creator (Type Script)

Build can be located at /web_build folder. This is built by using cocos creator web-desktop build option.

## Current features
- Count Down Timer
- Number of Players can be set as a property of Server Script
- Number of Maximum Eggs on screen can be set as a property on Server Script 
- Player can move with arrow key and collect egg. 
- Eggs color is generated randomly. 
- New Eggs are generated everytime one is collected.
- Player have animation on left right and up
- Score is recorded everytime player collect egg
- Timer can be set in Game Script. 

## Features not complete

- AI Remote Player - I have already getting the coordinate of the eggs the players on the map. Need sometime for a quick path finding solution for the remote player to move around. 

- Simulate Server - Currently, the egg is spawned base on the maximum egg at the moment, and in random color. The 0.1 - 0.5 seconds is not implemented. A Record of current Game State can be implemented to send to the Server. 
- No Collision on Wall Map.
## Some enhancements
- Proper collision with wall map. 
- Animation can be added to all remote players.
- Sound has not yet been implemented.
- Eggs can have growing animation. 

## Challenges

- Firt time using Cocos Creator and Typescript. Spend 1 day to grasp the basic.
- Need to Spend 1 day for asset, 1 day for proper collision learning
- The rest are used to implement interaction between nodes. 
