import { Interactor } from "./Interactor";
import { Note } from "./Note";

export class Engine {
  private canvasElement: HTMLCanvasElement;
  private width: number;
  private cellWidth: number;
  private speed = 500;
  private now = Date.now();
  private delta = Date.now();
  private time = 0;
  private context: CanvasRenderingContext2D;
  private keys = ["a", "s", "d", "j", "k", "l"];
  private notes: Note[] = [];
  private interactors: Interactor[];

  constructor(element: HTMLCanvasElement) {
    const context = element.getContext("2d");

    if (!context) {
      throw new Error("Not found context");
    }

    const containerElement = element.parentElement;
    const width = containerElement?.clientWidth ?? 300;
    const height = containerElement?.clientHeight ?? window.innerHeight - 90;

    window.engine = {
      canvasElement: element,
    };

    this.canvasElement = element;
    this.context = context;

    this.width = width;
    this.canvasElement.height = height;
    this.cellWidth = this.width / this.keys.length;

    this.interactors = this.keys.map(
      (key, index) => new Interactor({ key, index, width: this.cellWidth })
    );

    this.start = this.start.bind(this);
    this.update = this.update.bind(this);
  }

  public setNotes(notes: Note[]) {
    this.notes = notes.slice();
  }

  public start() {
    this.setNotes([
      new Note({
        key: "a",
        time: 10,
        width: this.cellWidth,
        index: 0,
        speed: this.speed,
      }),
    ]);
    this.update();
  }

  public update() {
    this.now = Date.now();
    this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.interactors.forEach((interactor) => interactor.update(this.context));
    this.notes.forEach((note) =>
      note.update(this.context, this.now, this.delta)
    );

    this.time += this.now - this.delta;
    this.delta = this.now;

    window.requestAnimationFrame(this.update);
  }
}
