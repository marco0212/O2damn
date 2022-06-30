export {};

declare global {
  interface Window {
    engine: {
      canvasElement: HTMLCanvasElement;
    };
  }
}
