export interface ColumnOption {
  index: number;
  width: number;
  key: string;
}

export class Column {
  protected index: number;
  protected width: number;
  protected key: string;
  protected positionX: number;

  constructor({ index, width, key }: ColumnOption) {
    this.index = index;
    this.width = width;
    this.key = key;
    this.positionX = this.width * this.index;
  }
}
