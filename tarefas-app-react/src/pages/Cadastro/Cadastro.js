import React from 'react'
import Api from '../../api/api';
import { useNavigate } from 'react-router-dom';

const Cadastro = () => {
  const navigate = useNavigate();
  
  const handleSubmit = async (evento) => {
    evento.preventDefault();
    // target = quem disparou o evento
    console.log(evento.target);
    const titulo = evento.target.titulo.value;
    const descricao = evento.target.descricao.value;
    const prioridade = evento.target.prioridade.value;
    const pstatus = evento.target.pstatus.value;
    const prazo = evento.target.prazo.value;

    const tarefa = {
      titulo,
      descricao,
      prioridade,
      pstatus,
      prazo
    }

    const request = await Api.fetchPost(tarefa);
    if(request.status === 500) {
      alert('ERRO NO SERVIDOR')
    }
    const result = await request.json();
    if(result.error) {
      console.log(result.error);
    }else {
      alert(result.message);
      navigate('/');
    }
  }

  return (
    <div className="container">
      <div className="card mt-4">
        <div className="card-title">
          <div className="row">
            <div className="col">
              <h3 className="mx-3 my-3">Cadastro de tarefa</h3>
            </div>
          </div>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row mb-4">
              <div className="col-4">
                <div className="form-group">
                  <label htmlFor="titulo">Nome da Tarefa:</label>
                  <input id="titulo" className="form-control" type="text" placeholder="Titulo da Tarefa" name="titulo"/>
                </div>
              </div>
              <div className="col-4">
                <div className="form-group">
                  <label htmlFor="descricao">Descrição:</label>
                  <input id="descricao" type="text" className="form-control" placeholder="Descrição da Tarefa" name="descricao"/>
                </div>
              </div>
              <div className="col-4">
                <div className="form-group">
                  <label htmlFor="prioridade">Prioridade:</label>
                  <div class="input-field col s12 m4">
                <select name="prioridade">
                  <option value="" disabled selected>Prioridade</option>
                  <option value="Baixa">Baixa</option>
                  <option value="Media">Media</option>
                  <option value="Alta">Alta</option>
                </select>
          </div>                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <div className="form-group">
                  <label htmlFor="pstatus">Status da Tarefa:</label>
                  <input id="pstatus" type="text" className="form-control" placeholder="URL da capa do album" name="pstatus"/>
                </div>
              </div>
              <div className="col-4">
                <div className="form-group">
                  <label htmlFor="prazo">Prazo da Tarefa:</label>
                  <input id="prazo" type="date" className="form-control" placeholder="Duraçao da tarefa" name="prazo"/>
                </div>
              </div>
              <div className="col-4 d-flex align-items-end justify-content-around">
                <button type="submit" className="btn btn-success">Enviar</button>
                <button type="button" className="btn btn-danger">Voltar</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Cadastro