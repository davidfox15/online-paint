import Tool from './Tool'

export default class Circle extends Tool {
  constructor(canvas) {
    super(canvas)
    this.listen()
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
    this.ctx.beginPath()
    this.startX = e.pageX - e.target.offsetLeft
    this.startY = e.pageY - e.target.offsetTop
    this.saved = this.canvas.toDataURL()
  }

  mouseMoveHandle(e) {
    if (this.mouseDown) {
      let currentX = e.pageX - e.target.offsetLeft
      let currentY = e.pageY - e.target.offsetTop
      let width = currentX - this.startX
      let height = currentY - this.startY
      this.draw(
        this.startX,
        this.startY,
        width > height ? width : height,
      )
    }
  }

  draw(x, y, rad) {
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
      this.ctx.arc(x, y, rad < 0 ? rad * -1 : rad, 0, 2 * Math.PI)
      this.ctx.fill()
      this.ctx.stroke()
    }
  }
}
