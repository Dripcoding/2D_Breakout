export interface IGameMode {
  getMode(): IMode;

  setMode(mode: IMode): void;
}

export interface IMode {
  dx: number;
  dy: number;
  lives: number;
  maxDx: number;
  maxDy: number;
  name: string;
}

class Mode {
  private dx: number;
  private dy: number;
  private lives: number;
  private maxDx: number;
  private maxDy: number;
  private name: string;

  constructor(mode: IMode) {
    this.dx = mode.dx;
    this.dy = mode.dy;
    this.lives = mode.lives;
    this.maxDx = mode.maxDx;
    this.maxDy = mode.maxDy;
    this.name = mode.name;
  }

  public getMode(): IMode {
    return {
      dx: this.dx,
      dy: this.dy,
      lives: this.lives,
      maxDx: this.maxDx,
      maxDy: this.maxDy,
      name: this.name
    };
  }

  public setMode(mode: IMode): void {
    const { dx, dy, lives, maxDx, maxDy, name } = mode;

    this.dx = dx;
    this.dy = dy;
    this.lives = lives;
    this.maxDx = maxDx;
    this.maxDy = maxDy;
    this.name = name;
  }
}

export default Mode;
