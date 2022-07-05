import { MILISECOND } from "./constants";
import { Interactor } from "./Interactor";
import { Note } from "./Note";

type RowNotes = { key: string; time: number };

export class Engine {
  private canvasElement: HTMLCanvasElement;
  private speed = 300;
  private now = Date.now();
  private delta = Date.now();
  private time = 0;
  private context: CanvasRenderingContext2D;
  private keys = ["a", "s", "d", "j", "k", "l"];
  private notes?: Note[];
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

    this.update = this.update.bind(this);
    this.attempToScore = this.attempToScore.bind(this);
    this.removeNote = this.removeNote.bind(this);

    this.interactors = this.keys.map(
      (key) => new Interactor({ key, onPress: this.attempToScore })
    );
  }

  public initialize(rowNotes: RowNotes[]) {
    if (rowNotes.length === 0) {
      throw new Error("최소 하나 이상 노트가 있어야 합니다");
    }

    const noteArray = rowNotes.map(
      ({ key, time }) => new Note({ key, time, onDestroy: this.removeNote })
    );
    const notes = noteArray.sort((prev, next) => prev.time - next.time);

    this.notes = notes;
    this.start();
  }

  public start() {
    this.update();
  }

  private attempToScore(key: string) {
    if (!this.notes) {
      throw new Error("initialized가 실행되어야 합니다.");
    }

    const targetNote = this.notes.find((note) => note.key === key);

    if (!targetNote) {
      return;
    }

    const diffTimeBetweenExactNoteAndInputPressed = Math.abs(
      targetNote.time - this.time
    );
    const randomDifficulty = 1000;
    const preAttemptableTime = this.speed / randomDifficulty;
    const isJudgeable =
      diffTimeBetweenExactNoteAndInputPressed < preAttemptableTime;

    if (!isJudgeable) {
      return;
    }

    const calculatedStat = "excellent";

    // this.onScored(calculatedStat);
    this.removeNote(targetNote);
  }

  private removeNote(targetNote: Note) {
    if (!this.notes) {
      throw new Error("initialized가 실행되어야 합니다.");
    }

    this.notes = this.notes.filter((note) => note !== targetNote);
  }

  private renderNotes() {
    if (!this.notes) {
      throw new Error("initialized가 실행되어야 합니다.");
    }

    this.notes.forEach((note) =>
      note.update(this.context, this.now, this.delta, this.time)
    );
  }

  private renderInteractor() {
    this.interactors.forEach((interactor) => interactor.update(this.context));
  }
  public update() {
    this.now = Date.now();
    this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    this.time += (this.now - this.delta) / MILISECOND;

    this.context.font = "40px serif";
    this.context.fillText(`time: ${this.time}`, 50, 50);
    this.renderNotes();
    this.renderInteractor();

    window.requestAnimationFrame(this.update);

    this.delta = this.now;
  }
}
