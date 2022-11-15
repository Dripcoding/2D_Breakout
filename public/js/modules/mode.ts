export interface IGameMode {
	getModeParam(): IModeParam

	setModeParam(mode: IModeParam): void
}

export interface IModeParam {
	dx: number
	dy: number
	lives: number
	maxDx: number
	maxDy: number
	name: string
}

export interface IMode {
	getModeParam: () => IModeParam
	setModeParam: (mode: IModeParam) => void
}

class Mode implements IMode {
	private dx: number
	private dy: number
	private lives: number
	private maxDx: number
	private maxDy: number
	private name: string

	constructor(mode: IModeParam) {
		this.dx = mode.dx
		this.dy = mode.dy
		this.lives = mode.lives
		this.maxDx = mode.maxDx
		this.maxDy = mode.maxDy
		this.name = mode.name
	}

	public getModeParam(): IModeParam {
		return {
			dx: this.dx,
			dy: this.dy,
			lives: this.lives,
			maxDx: this.maxDx,
			maxDy: this.maxDy,
			name: this.name,
		}
	}

	public setModeParam(mode: IModeParam): void {
		const { dx, dy, lives, maxDx, maxDy, name } = mode

		this.dx = dx
		this.dy = dy
		this.lives = lives
		this.maxDx = maxDx
		this.maxDy = maxDy
		this.name = name
	}
}

export default Mode
