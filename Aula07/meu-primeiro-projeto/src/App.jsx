import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function Saudacao() {
  return (
    <div style={{backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '8px', marginBottom: '10px'}}>
      <h2 style={{ color: '#007bff'}}>Olá, Alunos!</h2>
      <p>Este componente foi criado separadamente.</p>
    </div>
  )
}

function Boia({tamanho}) {
  return (
    <div style={{backgroundColor: '#e93838', padding: '3px', borderRadius: '76px', marginBottom: '40px'}}>
      <h1 style={{ color: '#259dd4'}}>Boia</h1>
      <h2>A boia tem {tamanho}</h2>
      <p>Este componente foi criado separadamente.</p>
    </div>
  )
}

function Samambaia() {
  return (
    <div style={{backgroundColor: '#1c8b00', padding: '68px', borderRadius: '3px', marginBottom: '5px'}}>
      <h2 style={{ color: '#7fc400'}}>Samambaia</h2>
      <p>Planta.</p>
    </div>
  )
}


function App() {
  return (
    <div>
      <h1>Olá, React!</h1>
      <p>Estou alterando meu primeiro componente.</p>

      <div style={{padding: '20px'}}>
        <h1>Minha primeira aula de react</h1>
        <hr/>

        <Saudacao />
        <Saudacao />
        <Saudacao />
        <Samambaia/>
        <Boia tamanho = "20cm"/>

        {/*Comentario*/}

        <p>Note que posso repetir o componente quantas vezes eu quiser</p>
      </div>
    </div>

    // fora da div
  )
}

export default App