const DISPLAY_HEIGHT = 0.23;
const BUTTON_ROWS = 5;
const BUTTON_COLUMNS = 5;

export function displayPosition(canvasBox) {
  return {
    x: canvasBox.x + canvasBox.width * 0.05,
    y: canvasBox.y + canvasBox.height * 0.05,
    width: canvasBox.width * 0.90,
    height: canvasBox.height * (DISPLAY_HEIGHT - 0.07)
  };
}

export function keyboardPosition(canvasBox, row, column) {
  const keyboardY = canvasBox.y + canvasBox.height * DISPLAY_HEIGHT;
  const keyboardHeight = canvasBox.height * (1 - DISPLAY_HEIGHT);

  const buttonWidth = canvasBox.width / BUTTON_COLUMNS;
  const buttonHeight = keyboardHeight / BUTTON_ROWS;

  const x = canvasBox.x + column * buttonWidth + buttonWidth * 0.1;
  const y = keyboardY + row * buttonHeight + buttonHeight * 0.1;
  const width = buttonWidth * 0.8;
  const height = buttonHeight * 0.8;

  return { x, y, width, height };
}

const keyboardButtons = new Map([
  ['MC', [0, 0]], ['MR', [0, 1]], ['M+', [0, 2]], ['M-',[0,3]], ['C/CE',[0,4]],
  ['7', [1, 0]], ['8', [1, 1]], ['9', [1, 2]], ['/',[1,3]], ['√',[1,4]],
  ['4', [2, 0]], ['5', [2, 1]], ['6', [2, 2]], ['*',[2,3]], ['%',[2,4]],
  ['1', [3, 0]], ['2', [3, 1]], ['3', [3, 2]], ['-',[3,3]], ['1/x',[3,4]],
  ['0', [4, 0]], ['.', [4, 1]], ['+/-', [4, 2]], ['+',[4,3]], ['=',[4,4]],
]);

export function keyboardLabel(canvasBox, label) {
  const button = keyboardButtons.get(label);
  if (!button) throw new Error(`Unknown button: "${label}"`);
  
  const [row, column] = button;
  return keyboardPosition(canvasBox, row, column);
}

export function centerOfButton(mid) {
  return { x: mid.x + mid.width * 0.45 , y: mid.y + mid.height * 0.45 };
}