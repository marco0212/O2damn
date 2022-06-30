import { drawRoundRect } from "@libs/util-canvas";
import stripeImage from "../../assets/stripe.png";
import { Column, ColumnOption } from "./Column";
import { RGB_COLORS } from "./constants";

export class Interactor extends Column {
  private opacity = 0;
  private opacityStep = 0.03;
  private height = 75;
  private padding = 5;
  private color: string;
  private backgroundColor = "#002f58";
  private positionY: number;

  constructor(option: ColumnOption) {
    super(option);

    switch (this.index) {
      case 0:
      case 5:
        this.color = RGB_COLORS[0];
        break;
      case 1:
      case 4:
        this.color = RGB_COLORS[1];
        break;
      default:
        this.color = RGB_COLORS[2];
        break;
    }

    this.positionY = window.engine.canvasElement.height - this.height;
    this.activate = this.activate.bind(this);
    this.update = this.update.bind(this);
    this.set();
  }

  private set() {
    window.addEventListener("keydown", this.activate);
  }

  private activate(event: KeyboardEvent) {
    if (event.key === this.key) {
      this.opacity = 1;
    }
  }

  private renderTrack(context: CanvasRenderingContext2D) {
    context.strokeStyle = "white";
    context.beginPath();
    context.moveTo(this.positionX, 0);
    context.lineTo(this.positionX, this.positionY);
    context.stroke();

    const image = new Image();

    image.src = stripeImage;
    context.drawImage(
      image,
      this.positionX,
      this.positionY,
      this.width,
      -this.width / 3
    );
  }

  private renderActive(context: CanvasRenderingContext2D) {
    if (this.opacity !== 0) {
      this.opacity -= this.opacityStep;
    }

    const gradient = context.createLinearGradient(
      this.positionX,
      window.innerHeight,
      this.positionX,
      0
    );

    gradient.addColorStop(0, `rgba(${this.color}, ${this.opacity})`);
    gradient.addColorStop(1, "transparent");

    context.fillStyle = gradient;
    context.fillRect(this.positionX, 0, this.width, window.innerHeight);
  }

  private renderController(context: CanvasRenderingContext2D) {
    context.fillStyle = this.backgroundColor;
    context.fillRect(this.positionX, this.positionY, this.width, this.height);

    drawRoundRect(context, {
      x: this.positionX + this.padding,
      y: this.positionY + this.padding,
      width: this.width - this.padding * 2,
      height: this.height - this.padding * 2,
      strokeColor: "white",
      fillColor: `rgba(${this.color}, ${this.opacity})`,
    });
  }

  public update(context: CanvasRenderingContext2D) {
    this.renderTrack(context);
    this.renderActive(context);
    this.renderController(context);
  }
}
