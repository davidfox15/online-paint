import React, { useRef, useState } from 'react'
import '../styles/modal.scss'

const Modal = ({ setModalShow, setUsername }) => {
  const nameInput = useRef()

  return (
    <div className="background">
      <div className="modal">
        <h3>Введите ваше имя</h3>
        <input ref={nameInput} className="modal__input" type="text" />
        <button
          className="modal__button"
          onClick={() => {
            console.log(nameInput.current.value)
            if (nameInput.current.value) {
              setUsername(nameInput.current.value)
              setModalShow(false)
            }
          }}
        >
          OK
        </button>
      </div>
    </div>
  )
}
export default Modal
