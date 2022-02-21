import Ball from '../public/js/modules/ball'
import BrickGrid from '../public/js/modules/brickGrid'
import Game from '../public/js/modules/game'
import Paddle from '../public/js/modules/paddle'
import Player from '../public/js/modules/player'
import MockCanvas from '../public/js/modules/__mocks__/canvas'
import Mode from '../public/js/modules/mode'
import {GAME_MODES, modes} from '../public/js/constants'

describe('player', () => {
	test('player should have the right properties', () => {
		const mode = { name: 'very easy', dx: 1.5, dy: -1.5, lives: 5 }
		const player = new Player(mode)

		expect(player).toHaveProperty('lives')
		expect(player).toHaveProperty('mode')
		expect(player).toHaveProperty('score')
		expect(player).toHaveProperty('drawLives')
		expect(player).toHaveProperty('getLives')
		expect(player).toHaveProperty('getMode')
		expect(player).toHaveProperty('getScore')
		expect(player).toHaveProperty('setLives')
		expect(player).toHaveProperty('setScore')
	})

	test('getters and setters', () => {
		const mode = { name: 'very easy', dx: 1.5, dy: -1.5, lives: 5 }
		const player = new Player(mode)

		expect(player.getLives()).toBe(5)
		expect(player.getScore()).toBe(0)

		player.setScore(100)
		expect(player.getScore()).toBe(100)

		player.setLives(5)
		expect(player.getLives()).toBe(5)
	})

	describe('game interactions', () => {
		test('draw functions should be called when game draws', () => {
			const canvas = new MockCanvas()
			const canvasHeight = canvas.getHeight()
			const canvasWidth = canvas.getWidth()
			const mode = new Mode(modes[GAME_MODES.VERY_EASY])

			const ball = new Ball(canvasHeight, canvasWidth, mode)
			const brick = new BrickGrid(mode)
			const paddle = new Paddle(canvas)
			const player = new Player(mode)
			const game = new Game(ball, brick, canvas, mode, paddle, player)

			const spy1 = jest.spyOn(player, 'drawScore')
			const spy2 = jest.spyOn(player, 'drawLives')

			game.draw(ball, brick, canvas, paddle, player)

			expect(spy1).toHaveBeenCalled()
			expect(spy1).toHaveBeenCalledTimes(1)
			expect(spy1).toHaveBeenCalledWith(canvas)

			expect(spy2).toHaveBeenCalled()
			expect(spy2).toHaveBeenCalledTimes(1)
			expect(spy2).toHaveBeenCalledWith(canvas)
		})
	})
})
