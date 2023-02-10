import React from 'react'
import Rect from '../tools/Rect'
import canvasState from '../store/canvasState'
import toolState from '../store/toolState'
import '../styles/toolbar.scss'
import Brush from '../tools/Brush'
import Circle from '../tools/Circle'
import Line from '../tools/Line'
import Eraser from '../tools/Eraser'

const Toolbar = () => {
  const download = () => {
    const dataUrl = canvasState.canvas.toDataURL()
    const a = document.createElement('a')
    a.href = dataUrl
    a.download = canvasState.sessionid + '.jpg'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <div className="toolbar" style={{ zIndex: 1 }}>
      <button
        className="toolbar__btn brush"
        onClick={() =>
          toolState.setTool(
            new Brush(
              canvasState.canvas,
              canvasState.socket,
              canvasState.sessionid,
            ),
          )
        }
      />
      <button
        className="toolbar__btn rect"
        onClick={() =>
          toolState.setTool(
            new Rect(
              canvasState.canvas,
              canvasState.socket,
              canvasState.sessionid,
            ),
          )
        }
      />
      <button
        className="toolbar__btn circle"
        onClick={() =>
          toolState.setTool(new Circle(canvasState.canvas))
        }
      />
      <button
        className="toolbar__btn eraser"
        onClick={() => {
          toolState.setTool(new Eraser(canvasState.canvas))
        }}
      />
      <button
        className="toolbar__btn line"
        onClick={() => {
          toolState.setTool(new Line(canvasState.canvas))
        }}
      />
      <input
        type="color"
        className="toolbar__btn"
        onChange={e => {
          toolState.setFillColor(e.target.value)
          toolState.setStrokeColor(e.target.value)
        }}
      />
      <button
        className="toolbar__btn undo"
        onClick={() => canvasState.undo()}
      />
      <button
        className="toolbar__btn redo"
        onClick={() => canvasState.redo()}
      />
      <button
        className="toolbar__btn save"
        onClick={() => download()}
      />
    </div>
  )
}

export default Toolbar
