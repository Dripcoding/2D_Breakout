import Ball from '../public/js/modules/ball'
import BrickGrid from '../public/js/modules/brickGrid'
import Game from '../public/js/modules/game'
import Paddle from '../public/js/modules/paddle'
import Player from '../public/js/modules/player'
import MockCanvas from '../public/js/modules/__mocks__/canvas'
import Mode from '../public/js/modules/mode'
import {GAME_MODES, modes} from '../public/js/constants'

describe('brick', () => {
	test('brick should have the right properties', () => {
		const mode = new Mode(modes[GAME_MODES.VERY_EASY])
		const brick = new BrickGrid(mode)

		expect(brick).toHaveProperty('brickColor')
		expect(brick).toHaveProperty('brickRowCount')
		expect(brick).toHaveProperty('brickColumnCount')
		expect(brick).toHaveProperty('brickWidth')
		expect(brick).toHaveProperty('brickHeight')
		expect(brick).toHaveProperty('brickPadding')
		expect(brick).toHaveProperty('brickOffsetTop')
		expect(brick).toHaveProperty('brickOffsetLeft')
		expect(brick).toHaveProperty('bricks')
		expect(brick).toHaveProperty('mode')
		expect(brick).toHaveProperty('calculateActiveBrickCount')
		expect(brick).toHaveProperty('drawBricks')
		expect(brick).toHaveProperty('initializeBrickGrid')
		expect(brick).toHaveProperty('getActiveBrickCount')
		expect(brick).toHaveProperty('getBrickColumnCount')
		expect(brick).toHaveProperty('getBrickRowCount')
		expect(brick).toHaveProperty('getBrickWidth')
		expect(brick).toHaveProperty('getBrickHeight')
		expect(brick).toHaveProperty('getBricks')
		expect(brick).toHaveProperty('getBrickCount')
	})

	test('bricks should be drawn on start', () => {
		const mode = new Mode(modes[GAME_MODES.VERY_EASY])
		const brick = new BrickGrid(mode)
		const brickRows = brick.getBricks()[0].length
		const brickColumns = brick.getBricks().length

		expect(brickRows).toBe(10)
		expect(brickColumns).toBe(7)
	})

	test('brick objects should have the right default values', () => {
		const mode = new Mode(modes[GAME_MODES.VERY_EASY])
		const brick = new BrickGrid(mode)
		const brickObject = brick.getBricks()[0][0]
		const brickObjectProperties = { x: 0, y: 0, status: 1 }

		expect(brickObject).toEqual(brickObjectProperties)
	})

	test('getBrickCount()', () => {
		const mode = new Mode(modes[GAME_MODES.VERY_EASY])
		const brick = new BrickGrid(mode)
		const brickRowCount =
			brick.getBrickColumnCount() * brick.getBrickRowCount()

		expect(brick.getBrickCount()).toBe(brickRowCount)
	})

	test('calculateActiveBrickCount()', () => {
		const mode = new Mode(modes[GAME_MODES.VERY_EASY])
		const brick = new BrickGrid(mode)
		// all bricks are active initially
		expect(brick.calculateActiveBrickCount()).toBe(brick.getBrickCount())
		// simulate brick collision
		brick.getBricks()[0][0].status = 0

		expect(brick.calculateActiveBrickCount()).toBe(
			brick.getBrickCount() - 1
		)
	})

	test('setActiveBrickCount()', () => {
		const mode = new Mode(modes[GAME_MODES.VERY_EASY])
		const brick = new BrickGrid(mode)

		brick.setActiveBrickCount()

		expect(brick.getActiveBrickCount()).toBe(brick.getBrickCount())
		// simulate all bricks are broken
		brick.getBricks().forEach(row => {
			row.forEach(brick => {
				brick.status = 0
			})
		})

		brick.setActiveBrickCount()

		expect(brick.getActiveBrickCount()).toBe(0)
	})

	test('initializeBrickGrid()', () => {
		const mode = new Mode(modes[GAME_MODES.VERY_EASY])
		const brick = new BrickGrid(mode)
		const brickGrid = brick.initializeBrickGrid()
		const brickColumnCount = brickGrid.length
		const brickRowCount = brickGrid[0].length

		expect(brickGrid).not.toBeNull()
		expect(brickGrid.length).toBeGreaterThan(0)
		expect(brickColumnCount * brickRowCount).toBe(70)
	})

	test('getters', () => {
		const mode = new Mode(modes[GAME_MODES.VERY_EASY])
		const brick = new BrickGrid(mode)

		expect(brick.getBrickColumnCount()).toBe(7)
		expect(brick.getBrickRowCount()).toBe(10)
		expect(brick.getBrickWidth()).toBe(75)
		expect(brick.getBrickHeight()).toBe(20)
		expect(brick.getBricks().length).toBe(7)
	})

	describe('game interactions', () => {
		test('drawBricks should be called while game draws', () => {
			const canvas = new MockCanvas()
			const canvasHeight = canvas.getHeight()
			const canvasWidth = canvas.getWidth()
			const mode = new Mode(modes[GAME_MODES.VERY_EASY])

			const ball = new Ball(canvasHeight, canvasWidth, mode)
			const brick = new BrickGrid(mode)
			const paddle = new Paddle(canvas)
			const player = new Player(mode)
			const game = new Game(ball, brick, canvas, mode, paddle, player)

			const spy = jest.spyOn(brick, 'drawBricks')

			game.draw(ball, brick, canvas, paddle, player)
			expect(spy).toHaveBeenCalled()
			expect(spy).toHaveBeenCalledTimes(1)
			expect(spy).toHaveBeenCalledWith(canvas)
		})
	})
})
