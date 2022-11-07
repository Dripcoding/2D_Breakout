import Ball from "../public/js/modules/ball";
import BrickGrid from "../public/js/modules/brickGrid";
import Game from "../public/js/modules/game";
import Paddle from "../public/js/modules/paddle";
import Player from "../public/js/modules/player";
import MockCanvas from "../public/js/modules/__mocks__/canvas";
import Mode from "../public/js/modules/mode";
import { GAME_MODES, modes } from "../public/js/constants";

jest.mock("../public/js/modules/canvas");

describe("paddle", () => {
  const canvas = new MockCanvas();
  test("paddle should have the right properties", () => {
    const paddle = new Paddle(canvas);

    expect(paddle).toHaveProperty("paddleColor");
    expect(paddle).toHaveProperty("paddleHeight");
    expect(paddle).toHaveProperty("paddleWidth");
    expect(paddle).toHaveProperty("paddleX");
    expect(paddle).toHaveProperty("drawPaddle");
    expect(paddle).toHaveProperty("update");
    expect(paddle).toHaveProperty("getPaddleColor");
    expect(paddle).toHaveProperty("getPaddleHeight");
    expect(paddle).toHaveProperty("getPaddleWidth");
    expect(paddle).toHaveProperty("getPaddleX");
    expect(paddle).toHaveProperty("setPaddleX");
  });

  test("update() should update the paddleX value ", () => {
    const paddle = new Paddle(canvas);
    const oldPaddleX = paddle.getPaddleX();

    paddle.update(10);
    expect(paddle.getPaddleX()).toBe(oldPaddleX + 10);
  });

  test("getters and setters", () => {
    const paddle = new Paddle(canvas);
    const paddleX = (canvas.getWidth() - paddle.getPaddleWidth()) / 2;

    expect(paddle.getPaddleColor()).toBe("#0095DD");
    expect(paddle.getPaddleHeight()).toBe(10);
    expect(paddle.getPaddleWidth()).toBe(75);
    expect(paddle.getPaddleX()).toBe(paddleX);

    paddle.setPaddleX(10);
    expect(paddle.getPaddleX()).toBe(10);

    paddle.setPaddleColor("red");
    expect(paddle.getPaddleColor()).toBe("red");
  });

  describe("game interactions", () => {
    test("draw and update invocations while game draws", () => {
      const canvas = new MockCanvas();
      const mode = new Mode(modes[GAME_MODES.EASY]);
      const canvasHeight = canvas.getHeight();
      const canvasWidth = canvas.getWidth();

      const ball = new Ball(canvasHeight, canvasWidth, mode);
      const brick = new BrickGrid(mode.getModeParam());
      const paddle = new Paddle(canvas);
      const player = new Player(mode.getModeParam());
      const game = new Game(ball, brick, canvas, mode, paddle, player);

      const spy1 = jest.spyOn(paddle, "drawPaddle");
      const spy2 = jest.spyOn(paddle, "update");

      game.draw(ball, brick, canvas, paddle, player);
      expect(spy1).toHaveBeenCalled();
      expect(spy1).toHaveBeenCalledTimes(1);
      expect(spy1).toHaveBeenCalledWith(canvas);

      expect(spy2).not.toHaveBeenCalled();
    });
  });
});
