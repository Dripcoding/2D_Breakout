import Ball from "../public/js/modules/ball";
import BrickGrid from "../public/js/modules/brickGrid";
import Game from "../public/js/modules/game";
import Paddle from "../public/js/modules/paddle";
import Player from "../public/js/modules/player";
import MockCanvas from "../public/js/modules/__mocks__/canvas";
import Mode from "../public/js/modules/mode";
import { GAME_MODES, modes } from "../public/js/constants";

describe("brickGrid", () => {
    const mode = new Mode(modes[GAME_MODES.EASY]);
  test("brickGrid should have the right properties", () => {
    const brickGrid = new BrickGrid(mode.getModeParam());

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
    const brickGrid = new BrickGrid(mode.getModeParam());
    const brickRows = brickGrid.getBricks()[0].length;
    const brickColumns = brickGrid.getBricks().length;

    expect(brickRows).toBe(10);
    expect(brickColumns).toBe(7);
  });

  test("brick objects should have the right default values", () => {
    const brickGrid = new BrickGrid(mode.getModeParam());
    const brickObject = brickGrid.getBricks()[0][0];
    const brickObjectProperties = { x: 0, y: 0, status: 1 };

    expect(brickObject).toEqual(brickObjectProperties);
  });

  test("brick grid should have a default color value", () => {
    const brickGrid = new BrickGrid(mode.getModeParam());

    expect(brickGrid.getBrickColor()).toBe("#dc004e");
  })

  test("getBrickCount()", () => {
    const brickGrid = new BrickGrid(mode.getModeParam());
    const brickRowCount =
      brickGrid.getBrickColumnCount() * brickGrid.getBrickRowCount();

    expect(brickGrid.getBrickCount()).toBe(brickRowCount);
  });

  test("calculateActiveBrickCount()", () => {
    const brickGrid = new BrickGrid(mode.getModeParam());
    // all bricks are active initially
    expect(brickGrid.calculateActiveBrickCount()).toBe(brickGrid.getBrickCount());
    // simulate brick collision
    brickGrid.getBricks()[0][0].status = 0;

    expect(brickGrid.calculateActiveBrickCount()).toBe(
      brickGrid.getBrickCount() - 1
    );
  });

  test("setActiveBrickCount()", () => {
    const brickGrid = new BrickGrid(mode.getModeParam());

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
    const brick = new BrickGrid(mode.getModeParam());
    const brickGrid = brick.initializeBrickGrid();
    const brickColumnCount = brickGrid.length;
    const brickRowCount = brickGrid[0].length;

    expect(brickGrid).not.toBeNull();
    expect(brickGrid.length).toBeGreaterThan(0);
    expect(brickColumnCount * brickRowCount).toBe(70);
  });

  test("getters", () => {
    const brickGrid = new BrickGrid(mode.getModeParam());

    expect(brickGrid.getBrickColumnCount()).toBe(7);
    expect(brickGrid.getBrickRowCount()).toBe(10);
    expect(brickGrid.getBrickWidth()).toBe(75);
    expect(brickGrid.getBrickHeight()).toBe(20);
    expect(brickGrid.getBricks().length).toBe(7);
  });

  test("change brickGrid color", () => {
    const brickGrid = new BrickGrid(mode.getModeParam());

    brickGrid.setBrickColor('red')
    expect(brickGrid.getBrickColor()).toBe('red');
  });

  describe("game interactions", () => {
    test("drawBricks should be called while game draws", () => {
      const canvas = new MockCanvas();
      const canvasHeight = canvas.getHeight();
      const canvasWidth = canvas.getWidth();
      const mode = new Mode(modes[GAME_MODES.EASY]);

      const ball = new Ball(canvasHeight, canvasWidth, mode);
      const brickGrid = new BrickGrid(mode.getModeParam());
      const paddle = new Paddle(canvas);
      const player = new Player(mode.getModeParam());
      const game = new Game(ball, brickGrid, canvas, mode, paddle, player);

      const spy = jest.spyOn(brickGrid, "drawBricks");

      game.draw(ball, brickGrid, canvas, paddle, player);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(canvas);
    });
  });
});
