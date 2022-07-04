export {};

declare global {
  interface Window {
    engine: {
      canvasElement: HTMLCanvasElement;
      keys: string[];
      speed: number;
    };
  }
}
