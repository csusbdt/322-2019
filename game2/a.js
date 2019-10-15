window.a  = {};

a.canvas  = document.getElementById('canvas');
//a.ctx     = a.canvas.getContext('2d', { alpha: false });
a.ctx     = a.canvas.getContext('2d');
a.objs    = [];
a.t       = 0; // time in seconds (duration into game)
a.fps     = 60;

window.onresize = function() {
  a.canvas.width  = window.innerWidth;
  a.canvas.height = window.innerHeight;
}
onresize();

a.loop = function(millis) {
  const t = millis / 1000.0; // convert time to seconds
  const dt = t - a.t;
  a.fps = a.fps * .99 + 1.0 / dt * .01; // compute fps as running average
  a.t = t; 
  a.ctx.clearRect(0, 0, a.canvas.width, a.canvas.height);
  for (let i = 0; i < a.objs.length; ++i) a.objs[i].update(dt);
  for (let i = 0; i < a.objs.length; ++i) a.objs[i].draw();
  window.requestAnimationFrame(a.loop);
};
a.loop();

a.canvas.addEventListener(
  'mousedown', 
  function(e) {
    e = e || window.event;
    // Convert screen coordinates to canvas coordinates.
    let x = e.clientX - a.canvas.getBoundingClientRect().left;
    let y = e.clientY - a.canvas.getBoundingClientRect().top;
    // Inform all objects until one handles/captures the event.
    for (var i = 0; i < a.objs.length; ++i) {
      if (a.objs[i].mousedown(x, y)) break;
    }
  }, 
  false
);

a.protos             = {};

a.protos.o           = {}
a.protos.o.update    = function( dt ) {};
a.protos.o.draw      = function(    ) {};
a.protos.o.mousedown = function(x, y) { return false; };
a.protos.o.keydown   = function( key) { return false; };

a.protos.t             = Object.create(a.protos.o);
//a.protos.t.constructor = a.protos.t;

a.protos.t.draw = function() {
  const text = this.text || '';
  const x    = this.x    || a.canvas.width / 2.0; 
  const y    = this.y    || a.canvas.height / 2.0;
  const font = this.font || '24px san-serif';
  a.ctx.font = font;
  a.ctx.fillText(text, x, y);
};

a.text = function(text, x, y, font) {
  const t = Object.create(a.protos.t);
  t.text = text || '';
  t.x    = x    || a.canvas.width  / 2.0; 
  t.y    = y    || a.canvas.height / 2.0;
  t.font = font || '24px san-serif';
  return t;
};


