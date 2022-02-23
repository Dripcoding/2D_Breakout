import Ball from "../public/js/modules/ball";
import BrickGrid from "../public/js/modules/brickGrid";
import Game from "../public/js/modules/game";
import Paddle from "../public/js/modules/paddle";
import Player from "../public/js/modules/player";
import MockCanvas from "../public/js/modules/__mocks__/canvas";
import Mode from "../public/js/modules/mode";
import { GAME_MODES, modes } from "../public/js/constants";

describe("brick", () => {
  test("brick should have the right properties", () => {
    const mode = new Mode(modes[GAME_MODES.VERY_EASY]);
    const brickGrid = new BrickGrid(mode);

    expect(brickGrid).toHaveProperty("brickColor");
    expect(brickGrid).toHaveProperty("brickRowCount");
    expect(brickGrid).toHaveProperty("brickColumnCount");
    expect(brickGrid).toHaveProperty("brickWidth");
    expect(brickGrid).toHaveProperty("brickHeight");
    expect(brickGrid).toHaveProperty("brickPadding");
    expect(brickGrid).toHaveProperty("brickOffsetTop");
    expect(brickGrid).toHaveProperty("brickOffsetLeft");
    expect(brickGrid).toHaveProperty("bricks");
    expect(brickGrid).toHaveProperty("mode");
    expect(brickGrid).toHaveProperty("calculateActiveBrickCount");
    expect(brickGrid).toHaveProperty("drawBricks");
    expect(brickGrid).toHaveProperty("initializeBrickGrid");
    expect(brickGrid).toHaveProperty("getActiveBrickCount");
    expect(brickGrid).toHaveProperty("getBrickColumnCount");
    expect(brickGrid).toHaveProperty("getBrickRowCount");
    expect(brickGrid).toHaveProperty("getBrickWidth");
    expect(brickGrid).toHaveProperty("getBrickHeight");
    expect(brickGrid).toHaveProperty("getBricks");
    expect(brickGrid).toHaveProperty("getBrickCount");
  });

  test("bricks should be drawn on start", () => {
    const mode = new Mode(modes[GAME_MODES.VERY_EASY]);
    const brickGrid = new BrickGrid(mode);
    const brickRows = brickGrid.getBricks()[0].length;
    const brickColumns = brickGrid.getBricks().length;

    expect(brickRows).toBe(10);
    expect(brickColumns).toBe(7);
  });

  test("brick objects should have the right default values", () => {
    const mode = new Mode(modes[GAME_MODES.VERY_EASY]);
    const brickGrid = new BrickGrid(mode);
    const brickObject = brickGrid.getBricks()[0][0];
    const brickObjectProperties = { x: 0, y: 0, status: 1 };

    expect(brickObject).toEqual(brickObjectProperties);
  });

  test("getBrickCount()", () => {
    const mode = new Mode(modes[GAME_MODES.VERY_EASY]);
    const brickGrid = new BrickGrid(mode);
    const brickRowCount =
      brickGrid.getBrickColumnCount() * brickGrid.getBrickRowCount();

    expect(brickGrid.getBrickCount()).toBe(brickRowCount);
  });

  test("calculateActiveBrickCount()", () => {
    const mode = new Mode(modes[GAME_MODES.VERY_EASY]);
    const brickGrid = new BrickGrid(mode);
    // all bricks are active initially
    expect(brickGrid.calculateActiveBrickCount()).toBe(brickGrid.getBrickCount());
    // simulate brick collision
    brickGrid.getBricks()[0][0].status = 0;

    expect(brickGrid.calculateActiveBrickCount()).toBe(
      brickGrid.getBrickCount() - 1
    );
  });

  test("setActiveBrickCount()", () => {
    const mode = new Mode(modes[GAME_MODES.VERY_EASY]);
    const brickGrid = new BrickGrid(mode);

    brickGrid.setActiveBrickCount();

    expect(brickGrid.getActiveBrickCount()).toBe(brickGrid.getBrickCount());
    // simulate all bricks are broken
    brickGrid.getBricks().forEach(row => {
      row.forEach(brick => {
        brick.status = 0;
      });
    });

    brickGrid.setActiveBrickCount();

    expect(brickGrid.getActiveBrickCount()).toBe(0);
  });

  test("initializeBrickGrid()", () => {
    const mode = new Mode(modes[GAME_MODES.VERY_EASY]);
    const brick = new BrickGrid(mode);
    const brickGrid = brick.initializeBrickGrid();
    const brickColumnCount = brickGrid.length;
    const brickRowCount = brickGrid[0].length;

    expect(brickGrid).not.toBeNull();
    expect(brickGrid.length).toBeGreaterThan(0);
    expect(brickColumnCount * brickRowCount).toBe(70);
  });

  test("getters", () => {
    const mode = new Mode(modes[GAME_MODES.VERY_EASY]);
    const brickGrid = new BrickGrid(mode);

    expect(brickGrid.getBrickColumnCount()).toBe(7);
    expect(brickGrid.getBrickRowCount()).toBe(10);
    expect(brickGrid.getBrickWidth()).toBe(75);
    expect(brickGrid.getBrickHeight()).toBe(20);
    expect(brickGrid.getBricks().length).toBe(7);
  });

  test("change brickGrid color", () => {
    const mode = new Mode(modes[GAME_MODES.VERY_EASY]);
    const brickGrid = new BrickGrid(mode);

    brickGrid.setBrickColor('red')
    expect(brickGrid.getBrickColor()).toBe('red');
  });

  describe("game interactions", () => {
    test("drawBricks should be called while game draws", () => {
      const canvas = new MockCanvas();
      const canvasHeight = canvas.getHeight();
      const canvasWidth = canvas.getWidth();
      const mode = new Mode(modes[GAME_MODES.VERY_EASY]);

      const ball = new Ball(canvasHeight, canvasWidth, mode);
      const brickGrid = new BrickGrid(mode);
      const paddle = new Paddle(canvas);
      const player = new Player(mode);
      const game = new Game(ball, brickGrid, canvas, mode, paddle, player);

      const spy = jest.spyOn(brickGrid, "drawBricks");

      game.draw(ball, brickGrid, canvas, paddle, player);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(canvas);
    });
  });
});
