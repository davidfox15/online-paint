import Tool from './Tool'

export default class Rect extends Tool {
  constructor(canvas) {
    super(canvas)
    this.listen()
    console.log('line constructor')
  }

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandle.bind(this)
    this.canvas.onmousedown = this.mouseDownHandle.bind(this)
    this.canvas.onmouseup = this.mouseUpHandle.bind(this)
  }

  mouseUpHandle(e) {
    this.mouseDown = false
  }

  mouseDownHandle(e) {
    this.mouseDown = true
    this.startX = e.pageX - e.target.offsetLeft
    this.startY = e.pageY - e.target.offsetTop
    this.saved = this.canvas.toDataURL()
  }

  mouseMoveHandle(e) {
    if (this.mouseDown) {
      let currentX = e.pageX - e.target.offsetLeft
      let currentY = e.pageY - e.target.offsetTop
      this.draw(this.startX, this.startY, currentX, currentY)
    }
  }

  draw(x, y, endX, endY) {
    const img = new Image()
    img.src = this.saved
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx.drawImage(
        img,
        0,
        0,
        this.canvas.width,
        this.canvas.height,
      )
      this.ctx.beginPath()
      this.ctx.moveTo(this.startX, this.startY)
      this.ctx.lineTo(endX, endY)
      this.ctx.fill()
      this.ctx.stroke()
    }
  }
}
