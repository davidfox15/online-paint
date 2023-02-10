import { observer } from 'mobx-react-lite'
import React, { useEffect, useRef, useState } from 'react'
import canvasState from '../store/canvasState'
import toolState from '../store/toolState'
import Brush from '../tools/Brush'
import Rect from '../tools/Rect'
import Modal from './Modal'
import { useParams } from 'react-router-dom'
import '../styles/canvas.scss'

const Canvas = observer(() => {
  const canvasRef = useRef(null)
  const params = useParams()
  const [modalShow, setModalShow] = useState(true)

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current)
    fetch(`http://localhost:12000/image?id=${params.id}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        const ctx = canvasRef.current.getContext('2d')
        const img = new Image()
        img.src = data
        img.onload = () => {
          ctx.clearRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height,
          )
          ctx.drawImage(
            img,
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height,
          )
        }
      })
  }, [])

  useEffect(() => {
    if (canvasState.username) {
      const socket = new WebSocket('ws://192.168.0.118:12000/')
      toolState.setTool(
        new Brush(canvasRef.current, socket, params.id),
      )
      canvasState.setSocket(socket)
      canvasState.setSessionId(params.id)
      socket.onopen = () => {
        console.log('Подключение...')
        socket.send(
          JSON.stringify({
            id: params.id,
            username: canvasState.username,
            method: 'connection',
          }),
        )

        socket.onmessage = event => {
          const msg = JSON.parse(event.data)
          switch (msg.method) {
            case 'text':
              console.log(msg.text)
              break
            case 'connection':
              console.log(`Пользователь ${msg.username} подключился`)
              break
            case 'draw':
              drawHandler(msg)
              break
          }
        }
      }
    }
  }, [canvasState.username])

  const drawHandler = msg => {
    const figure = msg.figure
    const ctx = canvasRef.current.getContext('2d')
    switch (figure.type) {
      case 'brush':
        Brush.draw(ctx, figure)
        break
      case 'rect':
        Rect.staticDraw(
          ctx,
          figure.x,
          figure.y,
          figure.width,
          figure.height,
          figure.color,
        )
        break
      case 'finish':
        ctx.beginPath()
        break
    }
  }

  const mouseDownHandler = () => {
    canvasState.clearRedo()
    canvasState.pushToUndo(canvasRef.current.toDataURL())
  }

  const mouseUpHandler = () => {
    console.log('Загрузка холста...')
    fetch(`http://localhost:12000/image?id=${params.id}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        img: canvasRef.current.toDataURL(),
      }),
    })
      .then(response => response.json())
      .then(data => console.log(data.message))
      .catch(error => console.error(error))
  }

  return (
    <div className="canvas">
      {modalShow && (
        <Modal
          setModalShow={setModalShow}
          setUsername={canvasState.setUsername.bind(canvasState)}
        />
      )}
      <canvas
        onMouseDown={() => mouseDownHandler()}
        onMouseUp={() => mouseUpHandler()}
        ref={canvasRef}
        width={600}
        height={400}
      ></canvas>
    </div>
  )
})

export default Canvas
