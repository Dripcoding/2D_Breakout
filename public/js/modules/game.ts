import { IBall } from "./ball";

import { IBrickGrid } from "./brickGrid";
import { ICanvas } from "./canvas";
import { IGameMode } from "./mode";
import { IPaddle } from "./paddle";
import { IPlayer } from "./player";
import {
  controlsModalLink,
  gameModeSelect,
  aboutModalLink,
  settingsModalLink,
  gameEndModalTitle,
  gameEndModalBody,
  modes,
  playBtn,
  pauseBtn,
  resetBtn,
  pastelOneRadio,
  pastelTwoRadio,
  pastelThreeRadio,
  pastelDefaultRadio, ballColorSelect, paddleColorSelect, brickColorSelect, scoreBoardResetBtn, borderColorCheckBox
} from "../constants";
import { createScore, setScore, drawScoreBoardEntry, resetScoreBoard } from "../services/score";
import { changeGameTheme } from "../services/theme";

class Game {
  private rightPressed: boolean;
  private leftPressed: boolean;
  private pause: boolean;
  private playPressed: boolean;
  private requestId: number;

  constructor(
    public ball: IBall,
    public brickGrid: IBrickGrid,
    public canvas: ICanvas,
    public mode: IGameMode,
    public paddle: IPaddle,
    public player: IPlayer
  ) {
    this.ball = ball;
    this.brickGrid = brickGrid;
    this.canvas = canvas;
    this.paddle = paddle;
    this.rightPressed = false;
    this.leftPressed = false;
    this.mode = mode;
    this.player = player;
    this.playPressed = false;
    this.pause = true;
    this.requestId = 0;

    this.addEventListeners();
    // draw scoreboard on page load
    drawScoreBoardEntry();
  }

  // initialize the game objects and the game loop
  public init(): void {
    this.requestId = requestAnimationFrame(() =>
      this.draw(
        this.ball,
        this.brickGrid,
        this.canvas,
        this.paddle,
        this.player
      )
    );
  }

  // main draw function of the game - initiates game loop
  public draw(
    ball: IBall,
    brickGrid: IBrickGrid,
    canvas: ICanvas,
    paddle: IPaddle,
    player: IPlayer
  ): void {
    const activeBrickCount = brickGrid.getActiveBrickCount();
    const brickCount = brickGrid.getBrickCount();
    const modeName = this.mode.getModeParam().name;
    const paddleX = paddle.getPaddleX();
    const paddleWidth = paddle.getPaddleWidth();
    const playerLives = player.getLives();
    const playerScore = player.getScore();
    // clear canvas before drawing
    canvas.clear();
    canvas.getCtx().beginPath();
    paddle.drawPaddle(canvas);
    brickGrid.drawBricks(canvas);
    ball.drawBall(canvas);
    player.drawScore(canvas);
    player.drawLives(canvas);
    this.drawCurrentGameMode(this.mode);
    canvas.detectBrickCollisions(ball, brickGrid, player);
    canvas.detectEdgeCollisions(ball, paddle, player);

    // game over
    if (playerLives === 0) {
      this.showGameEventModal("Game Over", "You lost. Game Over!");
    }

    // player wins - all bricks broken
    if (playerScore == brickCount && modeName !== "marathon") {
      this.showGameEventModal("You Win", "You Win! Congrats!");
    }

    // marathon mode - reset brick grid when all bricks broken
    if (activeBrickCount === 0 && modeName === "marathon") {
      brickGrid.initializeBrickGrid();
      brickGrid.changeColor();
    }

    // move paddle right until the right edge of the canvas
    if (this.rightPressed && paddleX < canvas.getWidth() - paddleWidth) {
      paddle.update(7);
    } else if (this.leftPressed && paddleX > 0) {
      paddle.update(-7);
    }
    // update ball's position
    ball.update();

    if (!this.pause) {
      // animation loops
      this.requestId = requestAnimationFrame(() => {
        this.draw(
          this.ball,
          this.brickGrid,
          this.canvas,
          this.paddle,
          this.player
        );
      });
    } else {
      cancelAnimationFrame(this.requestId);
    }
  }

  public drawCurrentGameMode(mode: IGameMode): void {
    const ctx = this.canvas.getCtx();
    const canvasWidth = this.canvas.getWidth();
    ctx.font = "24px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Mode: " + mode.getModeParam().name, canvasWidth / 2 - 90, 20);
  }

  // check if a key was pressed
  public keyDownHandler = (e: KeyboardEvent): string => {
    if (e.key === "ArrowRight") {
      // right cursor key pressed
      this.rightPressed = true;
    } else if (e.key === "ArrowLeft") {
      // left cursor key pressed
      this.leftPressed = true;
    } else if (e.key === "p") {
      // pause key pressed
      this.pauseGame();
    } else if (e.key === "q") {
      this.showGameEventModal("Game Over", "You quit. Game Over!");
    }

    return e.key;
  };

  // check if a key was released
  public keyUpHandler = (e: KeyboardEvent): string => {
    // reset key state to default
    if (e.key === "ArrowRight") {
      // right cursor key released
      this.rightPressed = false;
    } else if (e.key === "ArrowLeft") {
      // left cursor key released
      this.leftPressed = false;
    }

    return e.key;
  };

  public mouseClickHandler = (e: Event): string => {
    const { id } = <HTMLElement>e?.target;

    if (id === "playBtn") {
      this.resumeGame();
    } else if (id === "resetBtn") {
      document.location.reload();
    } else if (
      id === "settingsModalLink" ||
      id === "controlsModalLink" ||
      id === "aboutModalLink" ||
      id === "pauseBtn"
    ) {
      this.pauseGame();
    } else if (
      id === "pastelOneRadio" ||
      id === "pastelTwoRadio" ||
      id === "pastelThreeRadio" ||
      id === "pastelDefaultRadio"
    ) {
      changeGameTheme(id);
    }
    return id;
  };

  // move paddle relative to the mouse position within canvas
  public mouseMoveHandler = (e: MouseEvent): void => {
    if (this.pause) {
      return;
    }
    const canvas = this.canvas.getCanvas();
    const canvasWidth = this.canvas.getWidth();
    const paddleWidth = this.paddle.getPaddleWidth();

    let relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvasWidth) {
      const paddleX = relativeX - paddleWidth / 2;
      this.paddle.setPaddleX(paddleX);
    }
  };

  public pauseGame = (): boolean => {
    this.pause = true;
    this.playPressed = false;
    return this.pause;
  };

  public resumeGame = (): boolean => {
    this.pause = false;
    if (!this.playPressed) {
      this.init();
    }
    this.playPressed = true;
    return this.pause;
  };

  public selectGameMode = (e: Event): IGameMode => {
    this.pauseGame();

    const { value } = <HTMLSelectElement>e.target;
    const newMode = modes[value];

    this.mode.setModeParam(newMode);
    this.ball.setModeParam(newMode);
    this.player.setModeParam(newMode);

    this.drawCurrentGameMode(this.mode);

    return this.mode;
  };

  public selectBallColor = (e: Event): string => {
    const { value } = <HTMLSelectElement>e.target;

    this.ball.setRandomizeBallColor(false);
    this.ball.setBallColor(value);

    return value;
  };

  public selectPaddleColor = (e: Event): string => {
    const { value } = <HTMLSelectElement>e.target;

    this.paddle.setPaddleColor(value);

    return value;
  };

  public selectBrickColor = (e: Event): string => {
    const { value } = <HTMLSelectElement>e.target;

    this.brickGrid.setBrickColor(value);

    return value;
  };

  public resetScoreBoard = () => {
    resetScoreBoard();
  };

  public toggleBorder = () => {
    const myCanvas = document.querySelector("#myCanvas");

    this.canvas.setBorderOn();

    this.canvas.getBorderOn() ? myCanvas?.classList.add("canvas--showBorder")
      : myCanvas?.classList.remove("canvas--showBorder");
  };

  // tells user they either won, quit, or the game is over
  public showGameEventModal = (title: string, message: string): void => {
    setScore(createScore(this.player.getScore(), this.mode.getModeParam().name));
    gameEndModalTitle ? (gameEndModalTitle.textContent = title) : null;
    gameEndModalBody
      ? (gameEndModalBody.innerHTML = `<p>${message}</p>`)
      : null;
    $("#gameEndModal").modal("toggle");
    this.pauseGame();
  };

  public addEventListeners = (): void => {
    // listen for key press and key release
    window.addEventListener("keydown", this.keyDownHandler.bind(this), false);
    window.addEventListener("keyup", this.keyUpHandler.bind(this), false);
    // listen for mouse movement
    window.addEventListener("mousemove", this.mouseMoveHandler.bind(this), false);
    // listen for clicks on modal links
    aboutModalLink?.addEventListener("click", this.mouseClickHandler.bind(this), false);
    controlsModalLink?.addEventListener(
      "click",
      this.mouseClickHandler.bind(this),
      false
    );
    // game object settings changes
    gameModeSelect?.addEventListener("change", this.selectGameMode.bind(this), false);
    settingsModalLink?.addEventListener(
      "click",
      this.mouseClickHandler.bind(this),
      false
    );
    ballColorSelect?.addEventListener("change", this.selectBallColor.bind(this), false);
    paddleColorSelect?.addEventListener("change", this.selectPaddleColor.bind(this), false);
    brickColorSelect?.addEventListener("change", this.selectBrickColor.bind(this), false);
    // bootstrap events
    $("#gameEndModal").on("hidden.bs.modal", () => {
      document.location.reload();
    });
    // list for tool bar events
    playBtn?.addEventListener("click", this.mouseClickHandler.bind(this), false);
    pauseBtn?.addEventListener("click", this.mouseClickHandler.bind(this), false);
    resetBtn?.addEventListener("click", this.mouseClickHandler.bind(this), false);
    // listen for theme changes
    pastelOneRadio?.addEventListener("click", this.mouseClickHandler.bind(this), false);
    pastelTwoRadio?.addEventListener("click", this.mouseClickHandler.bind(this), false);
    pastelThreeRadio?.addEventListener(
      "click",
      this.mouseClickHandler.bind(this),
      false
    );
    pastelDefaultRadio?.addEventListener(
      "click",
      this.mouseClickHandler.bind(this),
      false
    );
    scoreBoardResetBtn?.addEventListener("click", this.resetScoreBoard.bind(this), false);
    borderColorCheckBox?.addEventListener("change", this.toggleBorder.bind(this), false);
  };
}

export default Game;
