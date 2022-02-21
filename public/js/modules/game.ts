import Ball, { IBall } from './ball'

import { IBrick } from './brick'
import { ICanvas } from './canvas'
import { IGameMode } from './mode'
import { IPaddle } from './paddle'
import { IPlayer } from './player'
import Player from './player'
import {
	easyMode,
	hardMode,
	marathonMode,
	mediumMode,
	veryHardMode,
	controlsModalLink,
	gameModeSelect,
	aboutModalLink,
	settingsModalLink,
	gameEndModalTitle,
	gameEndModalBody,
	playBtn,
	pauseBtn,
	resetBtn,
	pastelOneRadio,
	pastelTwoRadio,
	pastelThreeRadio,
	pastelDefaultRadio,
} from '../constants'
import { createScore, setScore, drawScoreBoardEntry } from '../services/score'
import { changeGameTheme } from '../services/theme'

class Game {
	private rightPressed: boolean
	private leftPressed: boolean
	private pause: boolean
	private playPressed: boolean
	private requestId: number

	constructor(
		public ball: IBall,
		public brick: IBrick,
		public canvas: ICanvas,
		public mode: IGameMode,
		public paddle: IPaddle,
		public player: IPlayer
	) {
		this.ball = ball
		this.brick = brick
		this.canvas = canvas
		this.paddle = paddle
		this.rightPressed = false
		this.leftPressed = false
		this.mode = mode
		this.player = player
		this.playPressed = false
		this.pause = true
		this.requestId = 0

		// listen for key press and key release
		window.addEventListener('keydown', this.keyDownHandler, false)
		window.addEventListener('keyup', this.keyUpHandler, false)
		// listen for mouse movement
		window.addEventListener('mousemove', this.mouseMoveHandler, false)
		// listen for clicks on modal links
		aboutModalLink?.addEventListener('click', this.mouseClickHandler, false)
		controlsModalLink?.addEventListener(
			'click',
			this.mouseClickHandler,
			false
		)
		gameModeSelect?.addEventListener('change', this.selectGameMode, false)
		settingsModalLink?.addEventListener(
			'click',
			this.mouseClickHandler,
			false
		)
		// bootstrap events
		$('#aboutModal').on('hidden.bs.modal', () => {
			this.resumeGame()
		})
		$('#controlsModal').on('hidden.bs.modal', () => {
			this.resumeGame()
		})
		$('#settingsModal').on('hidden.bs.modal', () => {
			this.resumeGame()
		})
		$('#gameEndModal').on('hidden.bs.modal', () => {
			document.location.reload()
		})
		// list for tool bar events
		playBtn?.addEventListener('click', this.mouseClickHandler, false)
		pauseBtn?.addEventListener('click', this.mouseClickHandler, false)
		resetBtn?.addEventListener('click', this.mouseClickHandler, false)
		// listen for theme changes
		pastelOneRadio?.addEventListener('click', this.mouseClickHandler, false)
		pastelTwoRadio?.addEventListener('click', this.mouseClickHandler, false)
		pastelThreeRadio?.addEventListener(
			'click',
			this.mouseClickHandler,
			false
		)
		pastelDefaultRadio?.addEventListener(
			'click',
			this.mouseClickHandler,
			false
		)
		// draw scoreboard on page load
		drawScoreBoardEntry()
	}

	// initialize the game objects and the game loop
	public init(): void {
		this.requestId = requestAnimationFrame(() =>
			this.draw(
				this.ball,
				this.brick,
				this.canvas,
				this.paddle,
				this.player
			)
		)
	}

	// main draw function of the game - initiates game loop
	public draw(
		ball: IBall,
		brick: IBrick,
		canvas: ICanvas,
		paddle: IPaddle,
		player: IPlayer
	): void {
		const activeBrickCount = brick.getActiveBrickCount()
		const brickCount = brick.getBrickCount()
		const modeName = this.mode.getMode().name
		const paddleX = paddle.getPaddleX()
		const paddleWidth = paddle.getPaddleWidth()
		const playerLives = player.getLives()
		const playerScore = player.getScore()
		// clear canvas before drawing
		canvas.clear()
		canvas.getCtx().beginPath()
		paddle.drawPaddle(canvas)
		brick.drawBricks(canvas)
		ball.drawBall(canvas)
		player.drawScore(canvas)
		player.drawLives(canvas)
		this.drawCurrentGameMode(this.mode)
		canvas.detectBrickCollisions(ball, brick, player)
		canvas.detectEdgeCollisions(ball, paddle, player)

		// game over
		if (playerLives === 0) {
			this.showGameEndModal('Game Over', 'You lost. Game Over!')
		}

		// player wins - all bricks broken
		if (playerScore == brickCount && modeName !== 'marathon') {
			this.showGameEndModal('You Win', 'You Win! Congrats!')
		}

		// marathon mode - reset brick grid when all bricks broken
		if (activeBrickCount === 0 && modeName === 'marathon') {
			brick.initializeBrickGrid()
			brick.changeColor()
		}

		// move paddle right until the right edge of the canvas
		if (this.rightPressed && paddleX < canvas.getWidth() - paddleWidth) {
			paddle.update(7)
		} else if (this.leftPressed && paddleX > 0) {
			paddle.update(-7)
		}
		// update ball's position
		ball.update()

		if (this.pause === false) {
			// animation loops
			this.requestId = requestAnimationFrame(() => {
				this.draw(
					this.ball,
					this.brick,
					this.canvas,
					this.paddle,
					this.player
				)
			})
		} else {
			cancelAnimationFrame(this.requestId)
		}
	}

	public drawCurrentGameMode(mode: IGameMode): void {
		const ctx = this.canvas.getCtx()
		const canvasWidth = this.canvas.getWidth()
		ctx.font = '24px Arial'
		ctx.fillStyle = '#0095DD'
		ctx.fillText('Mode: ' + mode.getMode().name, canvasWidth / 2 - 90, 20)
	}

	// check if a key was pressed
	public keyDownHandler = (e: KeyboardEvent): number => {
		if (e.keyCode === 39) {
			// right cursor key pressed
			this.rightPressed = true
		} else if (e.keyCode === 37) {
			// left cursor key pressed
			this.leftPressed = true
		} else if (e.keyCode === 80) {
			// pause key pressed
			this.pauseGame()
		} else if (e.keyCode === 81) {
			this.showGameEndModal('Game Over', 'You quit. Game Over!')
		}

		return e.keyCode
	}

	// check if a key was released
	public keyUpHandler = (e: KeyboardEvent): number => {
		// reset key state to default
		if (e.keyCode === 39) {
			// right cursor key released
			this.rightPressed = false
		} else if (e.keyCode === 37) {
			// right cursor key released
			this.leftPressed = false
		}

		return e.keyCode
	}

	public mouseClickHandler = (e: Event): string => {
		const { id } = <HTMLElement>e?.target

		if (id === 'playBtn') {
			this.resumeGame()
		} else if (id === 'resetBtn') {
			document.location.reload()
		} else if (
			id === 'settingsModalLink' ||
			id === 'controlsModalLink' ||
			id === 'aboutModalLink' ||
			id === 'pauseBtn'
		) {
			this.pauseGame()
		} else if (
			id === 'pastelOneRadio' ||
			id === 'pastelTwoRadio' ||
			id === 'pastelThreeRadio' ||
			id === 'pastelDefaultRadio'
		) {
			changeGameTheme(id)
		}
		return id
	}

	// move paddle relative to the mouse position within canvas
	public mouseMoveHandler = (e: MouseEvent): void => {
		if (this.pause) {
			return
		}
		const canvas = this.canvas.getCanvas()
		const canvasWidth = this.canvas.getWidth()
		const paddleWidth = this.paddle.getPaddleWidth()

		let relativeX = e.clientX - canvas.offsetLeft
		if (relativeX > 0 && relativeX < canvasWidth) {
			const paddleX = relativeX - paddleWidth / 2
			this.paddle.setPaddleX(paddleX)
		}
	}

	public pauseGame = (): boolean => {
		this.pause = true
		this.playPressed = false
		return this.pause
	}

	public resumeGame = (): boolean => {
		this.pause = false
		if (!this.playPressed) {
			this.init()
		}
		this.playPressed = true
		return this.pause
	}

	public selectGameMode = (e: Event): IGameMode => {
		const { value } = <HTMLSelectElement>e.target
		const canvasWidth = this.canvas.getHeight()
		const canvasHeight = this.canvas.getWidth()

		if (value === 'Easy') {
			this.mode.setMode(easyMode)
		} else if (value === 'Medium') {
			this.mode.setMode(mediumMode)
		} else if (value === 'Hard') {
			this.mode.setMode(hardMode)
		} else if (value === 'Very Hard') {
			this.mode.setMode(veryHardMode)
		} else if (value === 'Marathon') {
			this.mode.setMode(marathonMode)
		}

		this.ball = new Ball(canvasHeight, canvasWidth, this.mode)
		this.player = new Player(this.mode)

		this.drawCurrentGameMode(this.mode)
		return this.mode
	}

	// tells user they either won, quit, or the game is over
	public showGameEndModal = (title: string, message: string): void => {
		setScore(createScore(this.player.getScore(), this.mode.getMode().name))
		gameEndModalTitle ? (gameEndModalTitle.textContent = title) : null
		gameEndModalBody
			? (gameEndModalBody.innerHTML = `<p>${message}</p>`)
			: null
		$('#gameEndModal').modal('toggle')
		this.pauseGame()
	}
}

export default Game
