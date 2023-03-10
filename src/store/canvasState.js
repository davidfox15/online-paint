import { makeAutoObservable } from 'mobx'

class CanvasState {
  canvas = null
  redoList = []
  undoList = []
  username = ''
  socket = ''
  sessionid = ''

  constructor() {
    makeAutoObservable(this)
  }

  setUsername(username) {
    this.username = username
  }

  setSocket(socket) {
    this.socket = socket
  }

  setSessionId(sessionid) {
    this.sessionid = sessionid
  }

  setCanvas(canvas) {
    this.canvas = canvas
  }

  pushToUndo(data) {
    this.undoList.push(data)
  }

  pushToRedo(data) {
    this.redoList.push(data)
  }

  clearRedo() {
    this.redoList = []
  }

  undo() {
    let ctx = this.canvas.getContext('2d')
    if (this.undoList.length > 0) {
      this.pushToRedo(this.canvas.toDataURL())
      let dataUrl = this.undoList.pop()
      let img = new Image()
      img.src = dataUrl
      img.onload = () => {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        ctx.drawImage(
          img,
          0,
          0,
          this.canvas.width,
          this.canvas.height,
        )
      }
    } else {
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
  }

  redo() {
    let ctx = this.canvas.getContext('2d')
    if (this.redoList.length > 0) {
      let dataUrl = this.redoList.pop()
      let img = new Image()
      img.src = dataUrl
      img.onload = () => {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        ctx.drawImage(
          img,
          0,
          0,
          this.canvas.width,
          this.canvas.height,
        )
      }
      this.pushToUndo(this.canvas.toDataURL())
    }
  }
}

export default CanvasState = new CanvasState()
