import { ICanvas } from './canvas'
import { IModeParam } from './mode'

export interface IPlayer {
	drawScore(canvas: ICanvas): void

	drawLives(canvas: ICanvas): void

	getLives(): number

	getMode(): IModeParam

	getScore(): number

	setLives(lives: number): void

	setScore(score: number): void

	setModeParam(mode: IModeParam): void
}

class Player implements IPlayer {
	private lives: number
	private score: number

	constructor(public mode: IModeParam) {
		this.lives = mode.lives
		this.mode = mode
		this.score = 0
	}

	public drawScore(canvas: ICanvas): number {
		const ctx = canvas.getCtx()

		ctx.font = '24px Arial'
		ctx.fillStyle = '#0095DD'
		ctx.fillText('Score: ' + this.score, 8, 20)
		return this.score
	}

	public drawLives(canvas: ICanvas): number {
		const ctx = canvas.getCtx()
		const canvasWidth = canvas.getWidth()

		ctx.font = '24px Arial'
		ctx.fillStyle = '#0095DD'
		ctx.fillText('Lives: ' + this.lives, canvasWidth - 90, 20)
		return this.lives
	}

	public getLives(): number {
		return this.lives
	}

	public getMode(): IModeParam {
		return this.mode
	}

	public getScore(): number {
		return this.score
	}

	public setLives(lives: number): void {
		this.lives = lives
	}

	public setScore(score: number): void {
		this.score = score
	}

	public setModeParam(mode: IModeParam): void {
		this.mode = mode
		this.lives = this.mode.lives
	}
}

export default Player
