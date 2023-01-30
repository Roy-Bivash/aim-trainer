// Create the circle
const circle = app.stage.addChild(new PIXI.Graphics()
  .beginFill(0xabebc6)
  // .lineStyle({ color: 0x111111, alpha: 0.87, width: 10 })
  .drawCircle(0, 0, 8)
  .endFill()
);
circle.position.set(app.screen.width / 2, app.screen.height / 2);
// Enable interactivity!
app.stage.interactive = true;
// Make sure the whole canvas area is interactive, not just the circle.
app.stage.hitArea = app.screen;
// Follow the pointer
app.stage.addEventListener('pointermove', (e) => {
  circle.position.copyFrom(e.global);
});