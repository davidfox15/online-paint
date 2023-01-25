import React, { useEffect } from 'react'
import Rect from '../tools/Rect'
import canvasState from '../store/canvasState'
import toolState from '../store/toolState'
import '../styles/toolbar.scss'
import Brush from '../tools/Brush'
import Circle from '../tools/Circle'
import Line from '../tools/Line'
import Eraser from '../tools/Eraser'

const Toolbar = () => {
  return (
    <div className="toolbar" style={{ zIndex: 1 }}>
      <button
        className="toolbar__btn brush"
        onClick={() =>
          toolState.setTool(new Brush(canvasState.canvas))
        }
      />
      <button
        className="toolbar__btn rect"
        onClick={() =>
          toolState.setTool(new Rect(canvasState.canvas))
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
      <button className="toolbar__btn undo" />
      <button className="toolbar__btn redo" />
      <button className="toolbar__btn save" />
    </div>
  )
}

export default Toolbar
