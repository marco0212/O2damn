import { drawRoundRect } from "@libs/util-canvas";
import { Column, ColumnOption } from "./Column";
import { MILISECOND } from "./constants";

interface NoteOption extends ColumnOption {
  time: number;
  onMiss: (note: Note) => void;
}

export class Note extends Column {
  public time: number;
  private speed: number;
  private height: number;
  private positionY = 0;
  private _mounted = false;
  private onMiss: (note: Note) => void;

  constructor({ time, onMiss, ...option }: NoteOption) {
    super(option);
    this.time = time;
    this.speed = window.engine.speed;
    this.height = this.width / 3;
    const interactorHeight = 75;
    this.positionY =
      window.engine.canvasElement.height -
      interactorHeight -
      this.height -
      this.time * this.speed;
    this.onMiss = onMiss;
  }

  private get mounted() {
    return this._mounted;
  }

  private set mounted(value: boolean) {
    if (this._mounted === value) {
      return;
    }

    this._mounted = value;
  }

  private get shouldRender() {
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
    now: number,
    delta: number,
    currentTime: number
  ) {
    const extraTimeForAnimation = this.height / this.speed; // time = distance / speed
    const isLateToInteract = currentTime > this.time + extraTimeForAnimation;

    if (isLateToInteract) {
      this.onMiss(this);
    }

    const diffTimeBetweenAnimationFrame = (now - delta) / MILISECOND;

    this.positionY += diffTimeBetweenAnimationFrame * this.speed; // distance += time * speed

    if (!this.shouldRender) {
      return;
    }

    context.fillStyle = `rgb(${this.color})`;
    this.render(context);
  }

  private render(context: CanvasRenderingContext2D) {
    const sideBorderWidth = 2;

    drawRoundRect(context, {
      x: this.positionX + sideBorderWidth,
      y: this.positionY,
      width: this.width - sideBorderWidth * 2,
      height: this.height,
      fillColor: `rgb(${this.color})`,
    });
  }
}
