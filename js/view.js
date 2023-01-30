let app = new PIXI.Application({ width: (window.innerWidth * 0.8), height: (window.innerHeight * 0.8), background: '#ffffff' });
let view = document.getElementById('view');
view.appendChild(app.view);
view.style.cursor = "pointer";

function changeCursor(type) {
  view.style.cursor = type;
}

function destroyView() {
  view.removeChild(app.view);
  app.destroy();
}