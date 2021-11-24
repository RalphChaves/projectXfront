import React, { useState, useEffect } from 'react'
import Card from '../Card';
import Api from '../../../api/api';

const ListTarefa = () => {
 
  const [tarefas, setTarefas] = useState([]);
  
  useEffect(() => {
    getTarefas();
  }, [])


  const getTarefas = async () => {
    const request = await Api.fetchGetAll();
    // data = recebe os dados da api (tarefas).
    const data = await request.json();
    // atualizo meu estado em memoria com as tarefas - para atualizar no DOM.
    setTarefas(data);
  }

  return (
    <div className="row row-cols-1 row-cols-md-6 mt-3 g-4">
      
      {tarefas.map((tarefa) => (
        <Card data={tarefa} key={tarefa._id}/>
      ))}
    </div>
  )
}

export default ListTarefa;