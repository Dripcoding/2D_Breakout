import { ICanvas } from "./canvas";
import { IMode } from "./mode";

export interface IBrickGrid {
  calculateActiveBrickCount(): number;

  changeColor(): string;

  drawBricks(canvas: ICanvas): void;

  initializeBrickGrid(): void;

  getActiveBrickCount(): number;

  getBrickCount(): number;

  getBrickColumnCount(): number;

  getBrickRowCount(): number;

  getBrickWidth(): number;

  getBrickHeight(): number;

  getBricks(): IBrickObject[][];

  setActiveBrickCount(): void;

  setBrickColor(color: string): void;
}

interface IBrickObject {
  status: number;
  x: number;
  y: number;
}

class BrickGrid implements IBrickGrid {
  // @ts-ignore
  private activeBrickCount: number;
  private brickColor: string;
  private brickPadding: number;
  private brickOffsetTop: number;
  private brickOffsetLeft: number;
  private brickColumnCount: number;
  private brickRowCount: number;
  private brickWidth: number;
  private brickHeight: number;
  private bricks: IBrickObject[][];
  private mode: IMode;

  constructor(mode: any) {
    // brickGrid properties
    this.brickColor = "#dc004e";
    this.brickRowCount = 10;
    this.brickColumnCount = 7;
    this.activeBrickCount = this.getBrickCount();
    this.brickWidth = 75;
    this.brickHeight = 20;
    this.brickPadding = 10;
    this.brickOffsetTop = 50;
    this.brickOffsetLeft = 160;
    this.bricks = [];
    this.mode = mode;

    this.initializeBrickGrid();
  }

  public calculateActiveBrickCount(): number {
    let total = 0;
    this.bricks.forEach(row => {
      row.forEach(brick => {
        if (brick.status === 1) {
          total++;
        }
      });
    });

    return total;
  }

  public changeColor(): string {
    const red = Math.random() * 256;
    const green = Math.random() * 256;
    const blue = Math.random() * 256;
    const color = `rgb(${red}, ${green}, ${blue})`;
    this.brickColor = color;
    return this.brickColor;
  }

  public drawBricks(canvas: ICanvas): void {
    const ctx = canvas.getCtx();

    for (let col = 0; col < this.brickColumnCount; col++) {
      for (let row = 0; row < this.brickRowCount; row++) {
        let brick = this.bricks[col][row];
        if (brick.status === 1) {
          // ball did not collide with brick
          let brickX =
            col * (this.brickWidth + this.brickPadding) +
            this.brickOffsetLeft; // offset X position from previous brick
          let brickY =
            row * (this.brickHeight + this.brickPadding) +
            this.brickOffsetTop; // offset Y position from previous brick
          brick.x = brickX;
          brick.y = brickY;
          ctx.beginPath();
          ctx.rect(
            brick.x,
            brick.y,
            this.brickWidth,
            this.brickHeight
          );
          ctx.fillStyle = this.brickColor;
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }

  public initializeBrickGrid(): IBrickObject[][] {
    for (let col = 0; col < this.brickColumnCount; col++) {
      this.bricks[col] = [];
      for (let row = 0; row < this.brickRowCount; row++) {
        this.bricks[col][row] = { x: 0, y: 0, status: 1 }; // default brick properties
      }
    }

    return this.bricks;
  }

  public getBrickColor(): string {
    return this.brickColor;
  }

  public setBrickColor(color: string): void {
    this.brickColor = color;
  }

  public getActiveBrickCount(): number {
    return this.activeBrickCount;
  }

  public setActiveBrickCount(): void {
    this.activeBrickCount = this.calculateActiveBrickCount();
  }

  public getBrickCount(): number {
    return this.getBrickColumnCount() * this.getBrickRowCount();
  }

  public getBrickColumnCount(): number {
    return this.brickColumnCount;
  }

  public getBrickRowCount(): number {
    return this.brickRowCount;
  }

  public getBrickWidth(): number {
    return this.brickWidth;
  }

  public getBrickHeight(): number {
    return this.brickHeight;
  }

  public getBricks(): IBrickObject[][] {
    return this.bricks;
  }

  public getMode(): IMode {
    return this.mode;
  }
}

export default BrickGrid;
