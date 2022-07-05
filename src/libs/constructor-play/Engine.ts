import { StatusLevel } from "@libs/provider-play";
import { MILISECOND } from "./constants";
import { Interactor } from "./Interactor";
import { Note } from "./Note";

type RowNotes = { key: string; time: number };
type EngineOption = {
  onScore: (level: StatusLevel) => void;
};

export class Engine {
  private canvasElement: HTMLCanvasElement;
  private speed = 300;
  private difficulty = 1000; // 값이 클수록 판정의 감도가 높아집니다
  private now = Date.now();
  private delta = Date.now();
  private time = 0;
  private context: CanvasRenderingContext2D;
  private keys = ["a", "s", "d", "j", "k", "l"];
  private notes?: Note[];
  private interactors: Interactor[];
  private onScore: (level: StatusLevel) => void;

  constructor(element: HTMLCanvasElement, { onScore }: EngineOption) {
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

    this.onScore = onScore;
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
    const preAttemptableTime = this.speed / this.difficulty;
    const isJudgeable =
      diffTimeBetweenExactNoteAndInputPressed < preAttemptableTime;

    if (!isJudgeable) {
      return;
    }

    const calculatedStat = this.calculateScoreStat(
      diffTimeBetweenExactNoteAndInputPressed
    );

    this.onScore(calculatedStat);
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

  private calculateScoreStat(diffTime: number): StatusLevel {
    const maxTimeToScore = this.speed / this.difficulty;

    if (diffTime <= maxTimeToScore / 3) {
      return "excellent";
    }

    if (diffTime <= maxTimeToScore / 2) {
      return "good";
    }

    return "off beat";
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
