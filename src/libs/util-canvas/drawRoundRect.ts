type RoundRectOption = {
  x: number;
  y: number;
  width: number;
  height: number;
  radius?: number;
  fillColor?: string;
  strokeColor?: string;
};

export function drawRoundRect(
  context: CanvasRenderingContext2D,
  { x, y, width, height, radius = 5, fillColor, strokeColor }: RoundRectOption
) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.lineTo(x + width - radius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + radius);
  context.lineTo(x + width, y + height - radius);
  context.quadraticCurveTo(
    x + width,
    y + height,
    x + width - radius,
    y + height
  );
  context.lineTo(x + radius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - radius);
  context.lineTo(x, y + radius);
  context.quadraticCurveTo(x, y, x + radius, y);
  context.closePath();

  if (fillColor) {
    const prevFillStyle = context.fillStyle;
    context.fillStyle = fillColor;
    context.fill();
    context.fillStyle = prevFillStyle;
  }

  if (strokeColor) {
    const prevStrokeStyle = context.strokeStyle;
    context.strokeStyle = strokeColor;
    context.stroke();
    context.strokeStyle = prevStrokeStyle;
  }
}
