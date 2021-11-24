import React from 'react';
import { Link } from 'react-router-dom';

const Card = (props) => {
  
  const tarefa = props.data;
  return (
    <Link to={`/view/${tarefa._id}`} className="col">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{tarefa.titulo}</h5>
          <span className="badge bg-primary">{tarefa.descricao}</span>
          <p>{tarefa.prioridade}</p>
          <p>{tarefa.pstatus}</p>
          <p>{tarefa.prazo}</p>
        </div>
      </div>
    </Link>
  )
}

export default Card;