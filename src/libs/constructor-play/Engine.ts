import { Interactor } from "./Interactor";
import { Note } from "./Note";

export class Engine {
  private canvasElement: HTMLCanvasElement;
  private speed = 500;
  private now = Date.now();
  private delta = Date.now();
  private time = 0;
  private context: CanvasRenderingContext2D;
  private keys = ["a", "s", "d", "j", "k", "l"];
  private notes: Note[] = [];
  private interactors: Interactor[];

  constructor(element: HTMLCanvasElement) {
    window.engine = {
      canvasElement: element,
      keys: this.keys,
      speed: this.speed,
    };

    const context = element.getContext("2d");

    if (!context) {
      throw new Error("Not found context");
    }

    const containerElement = element.parentElement;
    const width = containerElement?.clientWidth ?? 300;
    const height = containerElement?.clientHeight ?? window.innerHeight - 90;

    this.canvasElement = element;
    this.context = context;

    this.canvasElement.width = width;
    this.canvasElement.height = height;

    this.interactors = this.keys.map((key) => new Interactor({ key }));

    this.start = this.start.bind(this);
    this.update = this.update.bind(this);
  }

  public start() {
    this.notes = [
      new Note({
        key: "a",
        time: 1,
      }),
    ];

    this.update();
  }

  public update() {
    this.now = Date.now();
    this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.notes.forEach((note) =>
      note.update(this.context, this.now, this.delta)
    );
    this.interactors.forEach((interactor) => interactor.update(this.context));
    this.time += this.now - this.delta;
    this.delta = this.now;

    window.requestAnimationFrame(this.update);
  }
}
