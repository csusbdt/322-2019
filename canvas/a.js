(function() {
  window.a   = {}; // application object
  const ctx  = a_canvas.getContext('2d'); //, { alpha: false });

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
    if (w === undefined) this.w = 100; else this.w = w;
    if (h === undefined) this.h = 100; else this.h = h;
    this.color = color || "#000000"    ;
  }

  Box.prototype.draw = function(dt) {
    if (this.hasOwnProperty('death')) {
      this.death -= dt;
    } else {
      this.y += 100 * dt; // dt approx === .017 for 60 fps
    }
    if (this.y > a_canvas.height) {
      a.objs    = a.objs.filter(function(item) { return item !== this; });
      a.enemies = a.enemies.filter(function(item) { return item !== this; });
    } else {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.w, this.h);
    }
  }

  function Missile(y) {
    this.x = 0;
    this.y = y;
    this.w = 70;
    this.h = 20;
  }

  Missile.prototype.draw = function(dt) {
    this.x += 200 * dt;
    ctx.fillStyle = '#000000';
    ctx.fillRect(this.x, this.y, this.w, this.h);
    for (let i = 0; i < a.enemies.length; ++i) {
      let e = a.enemies[i];
      if (
        e.x < this.x + this.w &&
        e.x + e.w > this.x    &&
        e.y < this.y + this.h &&
        e.y + e.h > this.y
      ) {
        e.death = 3;
      }
    }
    a.enemies = a.enemies.filter(function(e) { return typeof(e.death) === 'undefined'; });
  }

  let t = 0;
  const objs = [];

  function loop(millis) {
    // compute time elapsed since last frame
    const dt = millis / 1000 - t;
    t = millis / 1000;

    // clear viewport
    //ctx.fillStyle = 'white';
    //ctx.fillRect(0, 0, a_canvas.width, a_canvas.height);
    ctx.clearRect(0, 0, a_canvas.width, a_canvas.height);

    // draw the game objects
    for (let i = a.objs.length - 1; i >= 0; --i) {
      const o = a.objs[i];
      o.draw(dt);
    }
    a.objs = a.objs.filter(function(o) { return !o.hasOwnProperty('death') || o.death > 0; });

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

