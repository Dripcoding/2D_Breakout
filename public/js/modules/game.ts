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
  pastelDefaultRadio,
  ballColorSelect,
  paddleColorSelect,
  brickColorSelect,
  scoreBoardResetBtn,
  borderColorCheckBox,
  IPastelDict
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

    drawScoreBoardEntry();
  }

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

    canvas.clear();

    // start drawing
    canvas.getCtx().beginPath();
    paddle.drawPaddle(canvas);
    brickGrid.drawBricks(canvas);
    ball.drawBall(canvas);
    player.drawScore(canvas);
    player.drawLives(canvas);
    this.drawCurrentGameMode(this.mode);

    // game loop logic
    canvas.detectBrickCollisions(ball, brickGrid, player);
    canvas.detectEdgeCollisions(ball, paddle, player);

    if (playerLives === 0) {
      this.showGameEventModal("Game Over", "You lost. Game Over!");
    }

    if (this.hasPlayerWon(playerScore, brickCount, modeName)) {
      this.showGameEventModal("You Win", "You Win! Congrats!");
    }

    if (this.hasPlayerWonMarathonMode(activeBrickCount, modeName)) {
      brickGrid.initializeBrickGrid();
      brickGrid.changeColor();
    }

    // move paddle right until the right edge of the canvas
    if (this.hasPlayerMovedRight(paddleX, paddleWidth, canvas.getWidth())) {;
      paddle.update(7);
    } else if (this.hasPlayerMovedLeft(paddleX)) {
      paddle.update(-7);
    }

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

  private hasPlayerMovedRight(paddleX: number, paddleWidth: number, canvasWidth: number): boolean {
    return this.rightPressed && paddleX < canvasWidth - paddleWidth;
  }

  private  hasPlayerMovedLeft(paddleX: number): boolean {
    return this.leftPressed && paddleX > 0;
  }

  private hasPlayerWon(playerScore: number, brickCount: number, modeName: string): boolean {
    return playerScore == brickCount && modeName !== "marathon"
  }

  private hasPlayerWonMarathonMode(activeBrickCount: number, modeName: string): boolean {
    return activeBrickCount === 0 && modeName === "marathon";
  }

  public drawCurrentGameMode(mode: IGameMode): void {
    const ctx = this.canvas.getCtx();
    const canvasWidth = this.canvas.getWidth();
    ctx.font = "24px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Mode: " + mode.getModeParam().name, canvasWidth / 2 - 90, 20);
  }

  public keyDownHandler = (e: KeyboardEvent): string => {
    if (e.key === "ArrowRight") {
      this.rightPressed = true;
    } else if (e.key === "ArrowLeft") {
      this.leftPressed = true;
    } else if (e.key === "p") {
      this.pauseGame();
    } else if (e.key === "q") {
      this.showGameEventModal("Game Over", "You quit. Game Over!");
    }

    return e.key;
  };

  public keyUpHandler = (e: KeyboardEvent): string => {
    if (e.key === "ArrowRight") {
      this.rightPressed = false;
    } else if (e.key === "ArrowLeft") {
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
    } else if (this.shouldPauseGame(id)) {
      this.pauseGame();
    } else if (this.shouldChangeTheme(id)) {
      changeGameTheme(id as keyof IPastelDict);
    }

    return id;
  };

  public shouldPauseGame(id: string): boolean {
    return id === "settingsModalLink" ||
      id === "controlsModalLink" ||
      id === "aboutModalLink" ||
      id === "pauseBtn";
  }

  public shouldChangeTheme(id: string): boolean {
    return id === "pastelOneRadio" ||
      id === "pastelTwoRadio" ||
      id === "pastelThreeRadio" ||
      id === "pastelDefaultRadio"
  }

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
