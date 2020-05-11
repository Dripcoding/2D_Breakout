import Paddle from '../public/js/modules/paddle'

describe('paddle', () => {
	test('paddle should have the right properties', () => {
		const paddle = new Paddle({
			canvas: {},
			ctx: jest.fn(),
			width: 900,
			height: 700,
		})

		expect(paddle).toHaveProperty('paddleColor')
		expect(paddle).toHaveProperty('paddleHeight')
		expect(paddle).toHaveProperty('paddleWidth')
		expect(paddle).toHaveProperty('paddleX')
	})

	test('update() should update the paddleX value ', () => {
		const paddle = new Paddle({
			canvas: {},
			ctx: jest.fn(),
			width: 900,
			height: 700,
		})
		const oldPaddleX = paddle.paddleX

		paddle.update(10)
		expect(paddle.paddleX).toBe(oldPaddleX + 10)
	})
})
