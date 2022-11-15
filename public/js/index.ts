import '../css/index.css'

import Ball from './modules/ball'
import BrickGrid from './modules/brickGrid'
import Canvas from './modules/canvas'
import Game from './modules/game'
import Mode from './modules/mode'
import Paddle from './modules/paddle'
import Player from './modules/player'
import { GAME_MODES, modes } from './constants'

// canvas
const canvas = new Canvas()
const canvasHeight = canvas.getHeight()
const canvasWidth = canvas.getWidth()
const mode = new Mode(modes[GAME_MODES.MEDIUM])

// game objects
const ball = new Ball(canvasHeight, canvasWidth, mode)
const brickGrid = new BrickGrid(mode.getModeParam())
const paddle = new Paddle(canvas)
const player = new Player(mode.getModeParam())
const game = new Game(ball, brickGrid, canvas, mode, paddle, player)

game.init()
