import { ICanvas } from "./canvas";
import { IMode, IModeParam } from "./mode";

interface IPoint {
  x: number;

  y: number;
}

export interface IBall {
  changeColor(): void;

  drawBall(canvas: ICanvas): void;

  update(): void;

  getBallColor(): string;

  getBallRadius(): number;

  getBallDx(): number;

  getBallDy(): number;

  getBallX(): number;

  getBallY(): number;

  getRandomizeBallColor(): boolean;

  getModeParam(): IModeParam;

  setRandomizeBallColor(randomize: boolean): boolean;

  setBallColor(color: string): string;

  setBallX(x: number): void;

  setBallY(y: number): void;

  setBallDx(dx: number): void;

  setBallDy(dy: number): void;

  setModeParam(mode: IModeParam): void;
}

class Ball implements IBall {
  private ballColor: string;
  private ballRadius: number;
  private dx: number;
  private dy: number;
  private x: number;
  private y: number;
  private randomizeBallColor: boolean;
  private modeParam: IModeParam;

  constructor(public height: number, public width: number, public mode: IMode) {
    this.ballColor = "white";
    this.ballRadius = 10;
    this.mode = mode;
    this.modeParam = this.mode.getModeParam();
    // starting position
    this.x = width / 2;
    this.y = height - 30;
    // starting velocity
    this.dx = Math.random() * (this.modeParam.maxDx - this.modeParam.dx) + this.modeParam.dx;
    this.dy = (Math.random() * (this.modeParam.maxDy - this.modeParam.dy) + this.modeParam.dy) * -1;
    this.randomizeBallColor = true;
  }

  public changeColor(): string {
    if (this.getRandomizeBallColor()) {
      const red = Math.random() * 256;
      const green = Math.random() * 256;
      const blue = Math.random() * 256;
      const color = `rgb(${red}, ${green}, ${blue})`;
      this.setBallColor(color);
    }
    return this.ballColor;
  }

  public drawBall(canvas: ICanvas): void {
    const ctx = canvas.getCtx();

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = this.ballColor;
    ctx.fill();
    ctx.closePath();
  }

  public update(): IPoint {
    this.x += this.dx;
    this.y += this.dy;
    return { x: this.x, y: this.y };
  }

  public getBallColor(): string {
    return this.ballColor;
  }

  public getBallRadius(): number {
    return this.ballRadius;
  }

  public getBallX(): number {
    return this.x;
  }

  public getBallY(): number {
    return this.y;
  }

  public getBallDx(): number {
    return this.dx;
  }

  public getBallDy(): number {
    return this.dy;
  }

  public getRandomizeBallColor(): boolean {
    return this.randomizeBallColor;
  }

  public getModeParam(): IModeParam {
    return this.modeParam;
  }

  public setRandomizeBallColor(randomizeBallColor: boolean): boolean {
    return this.randomizeBallColor = randomizeBallColor;
  }

  public setBallColor(ballColor: string): string {
    return this.ballColor = ballColor;
  }

  public setBallX(x: number): void {
    this.x = x;
  }

  public setBallY(y: number): void {
    this.y = y;
  }

  public setBallDx(dx: number): void {
    this.dx = dx;
  }

  public setBallDy(dy: number): void {
    this.dy = dy;
  }

  public setModeParam(mode: IModeParam):void {
    this.modeParam = mode;
    this.dx = mode.maxDx;
    this.dy = mode.maxDy;
  }
}

export default Ball;
