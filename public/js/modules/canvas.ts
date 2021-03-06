import { IBall } from './ball'
import { IBrick } from './brick'
import { IPaddle } from './paddle'
import { IPlayer } from './player'

export interface ICanvas {
	clear(): void
	detectBrickCollisions(ball: IBall, brick: IBrick, player: IPlayer): void
	detectEdgeCollisions(ball: IBall, paddle: IPaddle, player: IPlayer): void
	resizeDynamically(): void
	getCanvas(): HTMLCanvasElement
	getCtx(): CanvasRenderingContext2D
	getHeight(): number
	getWidth(): number
}

class Canvas implements ICanvas {
	private canvas: HTMLCanvasElement
	private ctx: CanvasRenderingContext2D
	readonly height: number
	readonly width: number

	constructor() {
		this.canvas = document.getElementById('myCanvas') as HTMLCanvasElement
		this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
		this.width = this.canvas.width
		this.height = this.canvas.height
	}

	public clear(): void {
		this.ctx.clearRect(0, 0, this.width, this.height)
	}

	// detect collisions against canvas edges
	public detectEdgeCollisions(
		ball: IBall,
		paddle: IPaddle,
		player: IPlayer
	): void {
		const ballX = ball.getBallX()
		const ballY = ball.getBallY()
		const ballDx = ball.getBallDx()
		const ballDy = ball.getBallDy()
		const ballRadius = ball.getBallRadius()
		const paddleX = paddle.getPaddleX()
		const paddleHeight = paddle.getPaddleHeight()
		const paddleWidth = paddle.getPaddleWidth()
		const playerLives = player.getLives()

		// detect collisions with top edge
		if (ballY + ballDy < ballRadius) {
			ball.setBallDy(-ballDy)
			ball.changeColor()
		} else if (ballY + ballDy >= this.height - paddleHeight) {
			if (ballX >= paddleX && ballX <= paddleX + paddleWidth) {
				// ball collides with the paddle
				ball.setBallDy(-ballDy)
				ball.changeColor()
			} else {
				// ball misses the paddle
				player.setLives(playerLives - 1)
				ball.setBallX(this.width / 2)
				ball.setBallY(this.height - 30)
				ball.setBallDy(-ballDy)
			}
		}
		// detect collision with left and right edges
		if (
			ballX + ballDx < ballRadius ||
			ballX + ballDx > this.width - ballRadius
		) {
			ball.setBallDx(-ballDx)
			ball.changeColor()
		}
	}

	public detectBrickCollisions(
		ball: IBall,
		brick: IBrick,
		player: IPlayer
	): void {
		const ballX = ball.getBallX()
		const ballY = ball.getBallY()
		const ballDy = ball.getBallDy()
		const brickColumnCount = brick.getBrickColumnCount()
		const brickRowCount = brick.getBrickRowCount()
		const bricks = brick.getBricks()
		const brickHeight = brick.getBrickHeight()
		const brickWidth = brick.getBrickWidth()
		const playerScore = player.getScore()

		// compare position of bricks with the ball for every frame
		for (let col = 0; col < brickColumnCount; col++) {
			for (let row = 0; row < brickRowCount; row++) {
				let b = bricks[col][row]

				if (b.status === 1) {
					// a collision with a brick occurs when the center of the ball is inside a brick's coordinates
					// if a collision occurs, change the movement of the ball, a brick's status, score
					if (
						ballX > b.x && // x position of the ball is greater than the x position of the brick
						ballX < b.x + brickWidth && // x position of the ball is less than the x position of the brick plus its width
						ballY > b.y && // y position of the ball is greater than the y position of the brick
						ballY < b.y + brickHeight // y position of the ball is less than the y position of the brick plus its height
					) {
						ball.setBallDy(-ballDy)
						ball.changeColor()
						b.status = 0
						// player.score++
						player.setScore(playerScore + 1)
						brick.setActiveBrickCount()
					}
				}
			}
		}
	}

	public resizeDynamically(): void {
		this.getCanvas().setAttribute('width', `${window.innerWidth * 0.8}`)
	}

	public getCanvas(): HTMLCanvasElement {
		return this.canvas
	}

	public getCtx(): CanvasRenderingContext2D {
		return this.ctx
	}

	public getHeight(): number {
		return this.height
	}

	public getWidth(): number {
		return this.width
	}
}

export default Canvas
