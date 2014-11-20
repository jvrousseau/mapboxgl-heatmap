var webgl_heatmap = require('./bin/webgl-heatmap');
var req_anim_frame = window.requestAnimationFrame || window.mozRequestAnimationFrame;

function HM(map) {
    var heatmap_canvas = document.createElement('canvas');
    heatmap_canvas.classList.add('heatmap-canvas');
    heatmap_canvas.style.position = 'absolute';
    heatmap_canvas.style.top = '0px';
    heatmap_canvas.style.bottom = '0px';
    heatmap_canvas.style.width = '100%';
    heatmap_canvas.style.height = '100%';
    map.container.appendChild(heatmap_canvas);

    map.on('move', (this._resetHeatmap).bind(this));
    map.on('movestart', (this._resetHeatmap).bind(this));
    map.on('moveend', (this._resetHeatmap).bind(this));
    map.on('zoom', (this._resetHeatmap).bind(this));
    map.on('resize', (this._resetHeatmap).bind(this));


    this.heatmap = webgl_heatmap.createWebGLHeatmap({
        canvas: heatmap_canvas
    });

    req_anim_frame((this._updateHeatmap).bind(this));
};

HM.prototype._updateHeatmap = function () {
    this.heatmap.multiply(.99925);
    this.heatmap.clamp(0.0, 1.0);
    this.heatmap.blur();
    this.heatmap.update();
    this.heatmap.display();
    req_anim_frame((this._updateHeatmap).bind(this));
}

HM.prototype._resetHeatmap = function (event) {
    this.heatmap.multiply(0.5);
    this.heatmap.update();
    this.heatmap.display();
    this.heatmap.clamp(0.0, 1.0);
    this.heatmap.blur();
}
HM.prototype.addPoint = function (x, y, size, intensity) {
    this.heatmap.addPoint(x, y, size, intensity);
}

module.exports.HeatMap = HM;

module.exports.heatmap = function (map) {
    return new HM(map);
}
