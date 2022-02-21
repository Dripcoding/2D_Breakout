import MockCanvas from '../public/js/modules/canvas'
import Ball from '../public/js/modules/ball'
import BrickGrid from '../public/js/modules/brickGrid'
import Game from '../public/js/modules/game'
import Mode from '../public/js/modules/mode'
import Paddle from '../public/js/modules/paddle'
import Player from '../public/js/modules/player'
import {GAME_MODES, modes} from '../public/js/constants'

jest.mock('../public/js/modules/canvas')

describe('canvas', () => {
	test('canvas should have the right properties', () => {
		const canvas = new MockCanvas()

		expect(canvas).toHaveProperty('canvas')
		expect(canvas).toHaveProperty('ctx')
		expect(canvas).toHaveProperty('width')
		expect(canvas).toHaveProperty('height')
		expect(canvas).toHaveProperty('clear')
		expect(canvas).toHaveProperty('detectBrickCollisions')
		expect(canvas).toHaveProperty('resizeDynamically')
		expect(canvas).toHaveProperty('getCanvas')
		expect(canvas).toHaveProperty('getCtx')
		expect(canvas).toHaveProperty('getHeight')
		expect(canvas).toHaveProperty('getWidth')
	})

	test('getters', () => {
		const canvas = new MockCanvas()
		const canvas1 = new MockCanvas()

		expect(canvas.getCanvas()).toEqual(canvas1.getCanvas())
		expect(canvas.getCtx()).toEqual(canvas1.getCtx())
		expect(canvas.getHeight()).toBe(700)
		expect(canvas.getWidth()).toBe(900)
	})

	describe('game interactions', () => {
		test('canvas draw functions should be called when game starts drawing', () => {
			const mode = new Mode(modes[GAME_MODES.VERY_EASY])
			const canvas = new MockCanvas()
			const canvasHeight = canvas.getHeight()
			const canvasWidth = canvas.getWidth()

			const ball = new Ball(canvasHeight, canvasWidth, mode)
			const brick = new BrickGrid(mode)
			const paddle = new Paddle(canvas)
			const player = new Player(mode)
			const game = new Game(ball, brick, canvas, mode, paddle, player)

			const spy1 = jest.spyOn(canvas, 'clear')
			const spy2 = jest.spyOn(canvas, 'detectBrickCollisions')
			const spy3 = jest.spyOn(canvas, 'detectEdgeCollisions')
			const spy4 = jest.spyOn(canvas, 'getWidth')

			game.draw(ball, brick, canvas, paddle, player)
			expect(spy1).toHaveBeenCalled()
			expect(spy1).toHaveBeenCalledTimes(1)

			expect(spy2).toHaveBeenCalled()
			expect(spy2).toHaveBeenCalledTimes(1)

			expect(spy3).toHaveBeenCalled()
			expect(spy3).toHaveBeenCalledTimes(1)

			expect(spy4).toHaveBeenCalled()
			expect(spy4).toHaveBeenCalledTimes(2)
		})
	})
})
