import { COLUMN_RGB_COLORS } from "./constants";

export interface ColumnOption {
  index: number;
}

export class Column {
  protected width: number;
  protected index: number;
  public key: string;
  protected positionX: number;
  protected color: string;

  constructor({ index }: ColumnOption) {
    const { keys, canvasElement } = window.engine;
    this.index = index;
    this.width = canvasElement.width / keys.length;
    this.key = keys[index];
    this.positionX = this.width * this.index;

    switch (this.index) {
      case 0:
      case 5:
        this.color = COLUMN_RGB_COLORS[0];
        break;
      case 1:
      case 4:
        this.color = COLUMN_RGB_COLORS[1];
        break;
      default:
        this.color = COLUMN_RGB_COLORS[2];
        break;
    }
  }
}
