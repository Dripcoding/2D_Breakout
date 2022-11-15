import { createCanvas } from 'canvas'

const canvas = createCanvas(900, 700)

const MockCanvas = jest.fn().mockImplementation(() => {
	return {
		canvas: canvas,
		ctx: canvas.getContext('2d'),
		width: canvas.width,
		height: canvas.height,
		clear: jest.fn(),
		detectBrickCollisions: jest.fn(),
		detectEdgeCollisions: jest.fn(),
		resizeDynamically: jest.fn(),
		getCanvas: function () {
			return this.canvas
		},
		getCtx: function () {
			return this.ctx
		},
		getHeight: function () {
			return this.height
		},
		getWidth: function () {
			return this.width
		},
	}
})

export default MockCanvas
