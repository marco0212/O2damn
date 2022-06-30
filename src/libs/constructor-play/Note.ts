import { Column, ColumnOption } from "./Column";

interface NoteOption extends ColumnOption {
  time: number;
  speed: number;
}

const milisecond = 1000;

export class Note extends Column {
  private time: number;
  private speed: number;
  private height = 30;
  private positionY = 0;
  private isAlive = true;

  constructor({ time, speed, ...option }: NoteOption) {
    super(option);
    this.time = time;
    this.speed = speed;
    this.positionY = window.innerHeight - this.height - this.time * this.speed;
  }

  public update(
    context: CanvasRenderingContext2D,
    currentTime: number,
    deltaTime: number
  ) {
    if (!this.isAlive) {
      return;
    }

    context.fillStyle = "yellow";

    this.positionY =
      this.positionY + ((currentTime - deltaTime) / milisecond) * this.speed;
    this.draw(context);

    if (this.positionY > window.innerHeight) {
      this.isAlive = false;
    }
  }

  private draw(context: CanvasRenderingContext2D) {
    context.fillRect(this.positionX, this.positionY, this.width, this.height);
  }
}
