import { drawRoundRect } from "@libs/util-canvas";
import { Column, ColumnOption } from "./Column";

interface NoteOption extends ColumnOption {
  time: number;
}

const milisecond = 1000;

export class Note extends Column {
  private time: number;
  private speed: number;
  private height: number;
  private positionY = 0;
  private _mounted = false;

  constructor({ time, ...option }: NoteOption) {
    super(option);
    this.time = time;
    this.speed = window.engine.speed;
    this.height = this.width / 3;
    this.positionY = window.innerHeight - this.height - this.time * this.speed;
  }

  private get mounted() {
    return this._mounted;
  }

  private set mounted(value: boolean) {
    if (this._mounted === value) {
      return;
    }

    this._mounted = value;
    this.onMount();
  }

  private get shouldRender() {
    if (this.positionY < -this.height) {
    }

    if (
      this.positionY < -this.height ||
      this.positionY > window.engine.canvasElement.height
    ) {
      return false;
    }

    if (!this.mounted) {
      this.mounted = true;
    }

    return true;
  }

  public update(
    context: CanvasRenderingContext2D,
    currentTime: number,
    deltaTime: number
  ) {
    this.positionY =
      this.positionY + ((currentTime - deltaTime) / milisecond) * this.speed;

    if (!this.shouldRender) {
      return;
    }

    context.fillStyle = `rgb(${this.color})`;
    this.render(context);
  }

  public onDestroy() {
    console.log("unmounted");
  }

  public onMount() {
    console.log("mounted");
  }

  private render(context: CanvasRenderingContext2D) {
    context.fillRect(this.positionX, this.positionY, this.width, this.height);
    drawRoundRect(context, {
      x: this.positionX,
      y: this.positionY,
      width: this.width,
      height: this.height,
      fillColor: `rgb(${this.color})`,
    });
  }
}
