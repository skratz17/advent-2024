export class WordBuilder {
  private x: number;
  private y: number;
  private grid: string[];
  private word: string;

  constructor(grid: string[], x: number, y: number) {
    this.grid = grid;
    this.x = x;
    this.y = y;
    if(x >= 0 && x < grid.length && y >= 0 && y < grid[x].length) {
      this.word = grid[x].charAt(y);
    } else {
      this.word = '';
    }
  }

  public navigate(xOffset: number, yOffset: number) {
    this.x += xOffset;
    this.y += yOffset;
    if(this.x >= 0 && this.x < this.grid.length && this.y >= 0 && this.y < this.grid[this.x].length) {
      this.word += this.grid[this.x][this.y];
    }
    return this;
  }

  public getWord() {
    return this.word;
  }
}