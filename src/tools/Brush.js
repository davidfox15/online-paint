import Tool from './Tool'

export default class Brush extends Tool {
  constructor(canvas, socket, id) {
    super(canvas, socket, id)
    this.listen()
  }

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandle.bind(this)
    this.canvas.onmousedown = this.mouseDownHandle.bind(this)
    this.canvas.onmouseup = this.mouseUpHandle.bind(this)
  }

  mouseUpHandle(e) {
    this.mouseDown = false
    this.socket.send(
      JSON.stringify({
        method: 'draw',
        id: this.id,
        figure: {
          type: 'finish',
        },
      }),
    )
  }

  mouseDownHandle(e) {
    this.mouseDown = true
    this.ctx.beginPath()
    this.ctx.moveTo(
      e.pageX - e.target.offsetLeft,
      e.pageY - e.target.offsetTop,
    )
  }

  mouseMoveHandle(e) {
    if (this.mouseDown) {
      this.socket.send(
        JSON.stringify({
          method: 'draw',
          id: this.id,
          figure: {
            type: 'brush',
            x: e.pageX - e.target.offsetLeft,
            y: e.pageY - e.target.offsetTop,
            color: this.ctx.fillStyle,
          },
        }),
      )
    }
  }

  static draw(ctx, figure) {
    ctx.strokeStyle = figure.color
    ctx.lineTo(figure.x, figure.y)
    ctx.stroke()
  }
}
