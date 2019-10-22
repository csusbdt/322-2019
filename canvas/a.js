(function() {
  window.a = {}; // application object

  const canvas = document.getElementById('game');
  const ctx    = canvas.getContext('2d');

  function Text(text, x, y, color, font) {
    this.text  = text  || ''           ;
    this.x     = x     || 0            ;
    this.y     = y     || 0            ;
    this.color = color || "#000000"    ;
    this.font  = font  || "24px serif" ;
  }

  Text.prototype.draw = function(dt) {
    ctx.fillStyle = this.color;
    ctx.font      = this.font;
    ctx.fillText(this.text, this.x, this.y);
  }

  function Box(x, y, w, h, color) {
    this.x     = x     || 0            ;
    this.y     = y     || 0            ;
    this.w     = w     || 100          ;
    this.h     = h     ||  50          ;
    this.color = color || "#000000"    ;
  }

  Box.prototype.draw = function(dt) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }

  function Missile() {
    this.x = 0;
    this.y = 100;
    this.w = 50;
    this.h = 50;
  }

  Missile.prototype.draw = function(dt) {
    this.x += 200 * dt;
    ctx.fillStyle = '#000000';
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }

  let t = 0;
  const objs = [];

  function loop(millis) {
    // compute time elapsed since last frame
    const dt = millis / 1000 - t;
    t = millis / 1000;

    // clear viewport
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // draw the game objects
    for (let i = 0; i < objs.length; ++i) {
      const o = objs[i];
      o.draw(dt);
    }

    // continue loop
    requestAnimationFrame(loop);
  }

  requestAnimationFrame(function(millis) { 
    t = millis / 1000; 
    requestAnimationFrame(loop);
  });

  a.objs     = objs     ;
  a.Text     = Text     ;
  a.Box      = Box      ;
  a.Missile  = Missile  ;

})();

