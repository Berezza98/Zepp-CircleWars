export default class Text {
  constructor(options) {
    this.options = options;
    this.widget = null;
  }

  set(options) {
    this.options = {
      ...this.options,
      ...options,
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
    };
  }

  clear() {
    hmUI.deleteWidget(this.widget);
    this.widget = null;
  }

  update() {
    if (!this.widget) return this.draw();
    
    this.widget.setProperty(hmUI.prop.MORE, {
      ...this.options,
      x: this.options.x - this.options.w / 2,
      y: this.options.y - this.options.h / 2,
    });
  }

  draw() {
    this.widget = hmUI.createWidget(hmUI.widget.TEXT, {
      ...this.options,
      x: this.options.x - this.options.w / 2,
      y: this.options.y - this.options.h / 2,
    });
  }
}