import Brush from './Brush'

export default class Eraser extends Brush {
  constructor(canvas) {
    super(canvas)
    this.color = this.ctx.strokeStyle
  }

  mouseUpHandle(e) {
    super.mouseUpHandle(e)
    this.ctx.strokeStyle = this.color
  }

  mouseDownHandle(e) {
    super.mouseDownHandle(e)
    this.ctx.strokeStyle = '#FFFFFF'
  }
}
