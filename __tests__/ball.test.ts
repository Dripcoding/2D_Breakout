import Ball from "../public/js/modules/ball";
import BrickGrid from "../public/js/modules/brickGrid";
import Game from "../public/js/modules/game";
import MockCanvas from "../public/js/modules/canvas";
import Mode from "../public/js/modules/mode";
import Paddle from "../public/js/modules/paddle";
import Player from "../public/js/modules/player";
import { GAME_MODES, modes } from "../public/js/constants";

jest.mock("../public/js/modules/canvas");

describe("ball", () => {
  const mode = new Mode(modes[GAME_MODES.EASY]);

  test("ball should have the right properties", () => {
    const ball = new Ball(10, 10, mode);

    expect(ball).toHaveProperty("ballColor");
    expect(ball).toHaveProperty("ballRadius");
    expect(ball).toHaveProperty("dx");
    expect(ball).toHaveProperty("dy");
    expect(ball).toHaveProperty("x");
    expect(ball).toHaveProperty("y");
    expect(ball).toHaveProperty("changeColor");
    expect(ball).toHaveProperty("drawBall");
    expect(ball).toHaveProperty("update");
    expect(ball).toHaveProperty("getBallColor");
    expect(ball).toHaveProperty("getBallRadius");
    expect(ball).toHaveProperty("getBallX");
    expect(ball).toHaveProperty("getBallY");
    expect(ball).toHaveProperty("getBallDx");
    expect(ball).toHaveProperty("getBallDy");
    expect(ball).toHaveProperty("setBallX");
    expect(ball).toHaveProperty("setBallY");
    expect(ball).toHaveProperty("setBallDx");
    expect(ball).toHaveProperty("setBallDy");
  });

  test("ball's initial color should be white", () => {
    const ball = new Ball(10, 10, mode);

    expect(ball.getBallColor()).toBe("white");
  })

  test("changeColor() should change a ball's color", () => {
    const ball = new Ball(10, 10, mode);
    const color = ball.getBallColor();
    expect(color).toBe("white");

    const newColor = ball.changeColor();
    expect(color).not.toBe(newColor);
  });

  test("changeColor() should not change ball color if randomize property false", () => {
    const ball = new Ball(10, 10, mode);

    ball.setRandomizeBallColor(false);
    const color = ball.changeColor();

    expect(color).toBe(ball.getBallColor());
  });

  test("update() should update x and y values", () => {
    const ball = new Ball(10, 10, mode);
    const dx = ball.getBallDx();
    const dy = ball.getBallDy();
    const oldX = ball.getBallX();
    const oldY = ball.getBallY();

    ball.update();
    const newX = ball.getBallX();
    const newY = ball.getBallY();

    expect(newX).toBe(oldX + dx);
    expect(newY).toBe(oldY + dy);
  });

  test("getters and setters", () => {
    const canvas = new MockCanvas();
    const ball = new Ball(canvas.height, canvas.width, mode);
    const color = ball.getBallColor();
    const radius = ball.getBallRadius();
    const x = ball.getBallX();
    const y = ball.getBallY();
    const dx = ball.getBallDx();
    const dy = ball.getBallDy();
    const randomizeBallColor = ball.getRandomizeBallColor();

    expect(color).toBe("white");
    expect(radius).toBe(10);
    expect(x).toBe(canvas.width / 2);
    expect(y).toBe(canvas.height - 30);
    expect(randomizeBallColor).toBe(true);

    ball.setBallX(-x);
    ball.setBallY(-y);
    ball.setBallDx(-dx);
    ball.setBallDy(-dy);
    ball.setBallColor("white");
    ball.setRandomizeBallColor(false);
    ball.setMode(modes[GAME_MODES.MARATHON]);

    expect(ball.getBallX()).toBe(-x);
    expect(ball.getBallY()).toBe(-y);
    expect(ball.getBallDx()).toBe(-dx);
    expect(ball.getBallDy()).toBe(-dy);
    expect(ball.getBallColor()).toBe("white");
    expect(ball.getRandomizeBallColor()).toBe(false);
    expect(ball.getMode()).toBe(modes[GAME_MODES.MARATHON]);
  });

  describe("game interactions", () => {
    test("draw and update methods should be called while game draws", () => {
      const canvas = new MockCanvas();
      const mode = new Mode(modes[GAME_MODES.EASY]);
      const canvasHeight = canvas.getHeight();
      const canvasWidth = canvas.getWidth();

      const ball = new Ball(canvasHeight, canvasWidth, mode);
      const brick = new BrickGrid(mode);
      const paddle = new Paddle(canvas);
      const player = new Player(mode);
      const game = new Game(ball, brick, canvas, mode, paddle, player);

      const spy1 = jest.spyOn(ball, "drawBall");
      const spy2 = jest.spyOn(ball, "update");

      game.draw(ball, brick, canvas, paddle, player);
      expect(spy1).toHaveBeenCalled();
      expect(spy1).toHaveBeenCalledTimes(1);
      expect(spy1).toHaveBeenCalledWith(canvas);

      expect(spy2).toHaveBeenCalled();

      expect(spy2).toHaveBeenCalledTimes(1);
    });
  });
});
