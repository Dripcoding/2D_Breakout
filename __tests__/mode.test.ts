import Mode from '../public/js/modules/mode'
import {GAME_MODES, modes} from '../public/js/constants'

describe('mode', () => {
	const mode = new Mode(modes[GAME_MODES.VERY_EASY])

	test('mode should have the right properties', () => {
		expect(mode).toHaveProperty('dx')
		expect(mode).toHaveProperty('dy')
		expect(mode).toHaveProperty('lives')
		expect(mode).toHaveProperty('name')
		expect(mode).toHaveProperty('getMode')
		expect(mode).toHaveProperty('setMode')
		expect(mode).toHaveProperty('maxDx')
		expect(mode).toHaveProperty('maxDy')
	})

	test('getters and setter', () => {
		expect(mode.getMode()).toEqual({
			dx: 1.5,
			dy: -1.5,
			lives: 5,
			maxDx: 2,
			maxDy: -2,
			name: 'veryEasy',
		})

		const newMode = {
			dx: 5,
			dy: 5,
			lives: 5,
			name: 'someMode',
			maxDx: 9,
			maxDy: -9,
		}
		mode.setMode(newMode)
		expect(mode.getMode()).toEqual(newMode)
	})
})
