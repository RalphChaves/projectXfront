import React from 'react'
import ListTarefa from '../../src/components/structure/ListTarefa';

const Home = () => {
  return (
    <div className="container">
      <h1 className="text-center h1">Lista de Tarefas</h1>
      <ListTarefa/>
    </div>
  )
}

export default Home;