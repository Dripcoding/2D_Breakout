import { IBall } from "./ball";
import { IBrickGrid, IBrickObject } from "./brickGrid";
import { IPaddle } from "./paddle";
import { IPlayer } from "./player";

export interface ICanvas {
  clear(): void;

  detectBrickCollisions(ball: IBall, brickGrid: IBrickGrid, player: IPlayer): void;

  detectEdgeCollisions(ball: IBall, paddle: IPaddle, player: IPlayer): void;

  getCanvas(): HTMLCanvasElement;

  getCtx(): CanvasRenderingContext2D;

  getHeight(): number;

  getWidth(): number;

  getBorderOn(): boolean;

  setBorderOn(): void;
}

class Canvas implements ICanvas {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  readonly height: number;
  readonly width: number;
  private borderOn: boolean;

  constructor() {
    this.canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.borderOn = false;
  }

  public clear(): void {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  public detectEdgeCollisions(
    ball: IBall,
    paddle: IPaddle,
    player: IPlayer
  ): void {
    const ballDx = ball.getBallDx();
    const ballDy = ball.getBallDy();
    const paddleHeight = paddle.getPaddleHeight();
    const playerLives = player.getLives();

    if (this.isCollidingWithTopEdge(ball) || (this.isApproachingBottomEdge(ball, paddleHeight) && this.isCollidingWithPaddle(ball, paddle))) {
      ball.setBallDy(-ballDy);
      ball.changeColor();
    } else if (this.isApproachingBottomEdge(ball, paddleHeight)) {
        player.setLives(playerLives - 1);
        ball.setBallX(this.width / 2);
        ball.setBallY(this.height - 30);
        ball.setBallDy(-ballDy);
    }

    if (this.isCollidingWithSides(ball)) {
      ball.setBallDx(-ballDx);
      ball.changeColor();
    }
  }

  private isCollidingWithPaddle(ball: IBall, paddle: IPaddle): boolean {
    const ballX = ball.getBallX();
    const paddleX = paddle.getPaddleX();
    const paddleWidth = paddle.getPaddleWidth();

    return ballX >= paddleX && ballX <= paddleX + paddleWidth;
  }

  private isApproachingBottomEdge(ball: IBall, paddleHeight: number): boolean {
    const ballY = ball.getBallY();
    const ballDy = ball.getBallDy();

    return ballY + ballDy >= this.height - paddleHeight;
  }

  private isCollidingWithSides(ball: IBall): boolean {
    const ballX = ball.getBallX();
    const ballDx = ball.getBallDx();
    const ballRadius = ball.getBallRadius();

    return ballX + ballDx < ballRadius || ballX + ballDx > this.width - ballRadius
  }

  private isCollidingWithTopEdge(ball: IBall): boolean {
    const ballY = ball.getBallY();
    const ballDy = ball.getBallDy();
    const ballRadius = ball.getBallRadius();

    return ballY + ballDy < ballRadius;
  }

  public detectBrickCollisions(
    ball: IBall,
    brickGrid: IBrickGrid,
    player: IPlayer
  ): void {
    const ballDy = ball.getBallDy();
    const brickColumnCount = brickGrid.getBrickColumnCount();
    const brickRowCount = brickGrid.getBrickRowCount();
    const bricks = brickGrid.getBricks();
    const playerScore = player.getScore();

    // compare position of bricks with the ball for every frame
    for (let col = 0; col < brickColumnCount; col++) {
      for (let row = 0; row < brickRowCount; row++) {
        const brick = bricks[col][row];

        if (brick.status === 1) {
          // a collision with a brick occurs when the center of the ball is inside a brick's coordinates
          // if a collision occurs, change the movement of the ball, a brick's status, score
          if (this.isCollidingWithBrick(ball, brick, brickGrid)) {
            ball.setBallDy(-ballDy);
            if (ball.getRandomizeBallColor()) {
              ball.changeColor();
            }
            brick.status = 0;
            player.setScore(playerScore + 1);
            brickGrid.setActiveBrickCount();
          }
        }
      }
    }
  }

  private isCollidingWithBrick(ball: IBall, brick: IBrickObject, brickGrid: IBrickGrid) {
    return this.isCollidingWithBrickLeftAndRightEdge(ball.getBallX(), brick.x, brickGrid.getBrickWidth()) &&
            this.isCollidingWithBrickTopAndBottomEdge(ball.getBallY(), brick.y, brickGrid.getBrickHeight());
  }

  private isCollidingWithBrickLeftAndRightEdge(ballX: number, brickX: number, brickWidth: number): boolean {
    return ballX > brickX && ballX < brickX + brickWidth;
  }

  private isCollidingWithBrickTopAndBottomEdge(ballY: number, brickY: number, brickHeight: number) {
    return ballY > brickY && ballY < brickY + brickHeight;
  }

  public getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }

  public getCtx(): CanvasRenderingContext2D {
    return this.ctx;
  }

  public getHeight(): number {
    return this.height;
  }

  public getWidth(): number {
    return this.width;
  }

  public getBorderOn(): boolean {
    return this.borderOn;
  }

  public setBorderOn(): void {
    this.borderOn = !this.borderOn;
  }
}

export default Canvas;
