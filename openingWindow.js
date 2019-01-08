function addWindowButton(main, button, filename, x, y) {
    button.addEventListener('click', () => {
      main.openWindow(filename, x, y);
    }, false);
  }