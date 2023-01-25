import React from 'react'
import toolState from '../store/toolState'

const SettingBar = () => {
  return (
    <div className="toolbar" style={{ top: 40 }}>
      <label htmlFor="line-width">Толщина линий</label>
      <input
        style={{ margin: '0 10px' }}
        id="line-width"
        type="number"
        defaultValue={1}
        min={1}
        max={50}
        onChange={e => {
          toolState.setLineWidth(e.target.value)
        }}
      />
      <label htmlFor="stroke-color">Цвет обводки</label>
      <input
        id="stroke-color"
        type="color"
        onChange={e => toolState.setStrokeColor(e.target.value)}
      />
    </div>
  )
}

export default SettingBar
