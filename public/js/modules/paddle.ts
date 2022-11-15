import { ICanvas } from './canvas'

export interface IPaddle {
	canvas: ICanvas

	drawPaddle(canvas: ICanvas): void

	update(x: number): void

	getPaddleColor(): string

	getPaddleHeight(): number

	getPaddleWidth(): number

	getPaddleX(): number

	setPaddleX(x: number): void

	setPaddleColor(color: string): void
}

class Paddle implements IPaddle {
	private paddleColor: string
	private paddleHeight: number
	private paddleWidth: number
	private paddleX: number

	constructor(public canvas: ICanvas) {
		this.canvas = canvas
		this.paddleColor = '#0095DD'
		this.paddleHeight = 10
		this.paddleWidth = 75
		this.paddleX = (this.canvas.getWidth() - this.paddleWidth) / 2
	}

	public drawPaddle(canvas: ICanvas): void {
		const canvasHeight = canvas.getHeight()
		const ctx = this.canvas.getCtx()

		ctx.beginPath()
		ctx.rect(
			this.paddleX,
			canvasHeight - this.paddleHeight,
			this.paddleWidth,
			this.paddleHeight
		)
		ctx.fillStyle = this.paddleColor
		ctx.fill()
		ctx.closePath()
	}

	public update(x: number): void {
		this.paddleX += x
	}

	public getPaddleColor(): string {
		return this.paddleColor
	}

	public getPaddleHeight(): number {
		return this.paddleHeight
	}

	public getPaddleWidth(): number {
		return this.paddleWidth
	}

	public getPaddleX(): number {
		return this.paddleX
	}

	public setPaddleX(x: number): void {
		this.paddleX = x
	}

	public setPaddleColor(color: string): void {
		this.paddleColor = color
	}
}

export default Paddle
