import '../css/index.css'

import Ball from './modules/ball'
import Brick from './modules/brick'
import Canvas from './modules/canvas'
import Game from './modules/game'
import Mode from './modules/mode'
import Paddle from './modules/paddle'
import Player from './modules/player'
import { veryEasyMode } from './constants'

// canvas
const canvas = new Canvas()
const canvasHeight = canvas.getHeight()
const canvasWidth = canvas.getWidth()
const mode = new Mode(veryEasyMode)
// game objects
const ball = new Ball(canvasHeight, canvasWidth, mode)
const brick = new Brick(mode)
const paddle = new Paddle(canvas)
const player = new Player(mode)
const g = new Game(ball, brick, canvas, mode, paddle, player) // instantiate a game

g.init() // start the game loop
