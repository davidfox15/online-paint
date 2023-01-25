import Tool from './Tool'
import Brush from './Brush'

export default class Eraser extends Brush {
  constructor(canvas) {
    super(canvas)
    this.listen()
  }

  listen() {
    super.listen()
    this.ctx.lineWidth = 10
    this.ctx.strokeStyle = '#FFFFFF'
  }
}
