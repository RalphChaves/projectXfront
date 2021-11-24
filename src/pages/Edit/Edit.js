import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Api from "../../src/api/api";

const Edit = () => {
  const navigate = useNavigate();
  //declarar o estado da tarefa
  const [tarefa, setTarefa] = useState({
    titulo: '',
    descricao: '',
    prioridade: '',
    pstatus: '',
    prazo: ''
  });
  
  useEffect(() => {
    getTarefaById();
  }, []);

  // buscar a tarefa que ja foi cadastrado no banco.
  // buscar a tarefa pelo o id passado via parametro da url.
  const { id } = useParams();

  //buscar a tarefa por id;
  const getTarefaById = async () => {
    const request = await Api.fetchGetById(id);
    const tarefa = await request.json();
    setMusica(tarefa);
  };

  const handleFieldsChange = (evento) => {
    // copio o objeto do estado.
    const tarefaEdit = { ...tarefa };
    // tarefaEdit['titulo'] = 'novo valor'
    // atualiza os campos do objeto de forma dinamica de acordo com o input que o usuario digitou
    tarefaEdit[evento.target.name] = evento.target.value;
    // atualzo estado tarefa
    setMusica(tarefaEdit);
  }

  const handleSubmit = async (evento) => {
    evento.preventDefault();
    const request = await Api.fetchPut(tarefa, id);
    const data = await request.json();
    alert(data.message);
    navigate(`/view/${id}`);
  }

  return (
    <div className="container">
      <div className="card mt-4">
        <div className="card-title">
          <div className="row">
            <div className="col">
              <h3 className="mx-3 my-3">Edição da Tarefa</h3>
            </div>
          </div>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row mb-4">
              <div className="col-4">
                <div className="form-group">
                  <label htmlFor="titulo">Titulo da Tarefa:</label>
                  <input
                    id="titulo"
                    className="form-control"
                    type="text"
                    placeholder="Titulo da Tarefa"
                    value={tarefa.titulo}
                    onChange={handleFieldsChange}
                    name="titulo"
                  />
                </div>
              </div>
              <div className="col-4">
                <div className="form-group">
                  <label htmlFor="descricao">Descrição da Tarefa:</label>
                  <input
                    id="descricao"
                    type="text"
                    className="form-control"
                    placeholder="Descrição da Tarefa"
                    onChange={handleFieldsChange}
                    value={tarefa.descricao}
                    name="descricao"
                  />
                </div>
              </div>
              <div className="col-4">
                <div className="form-group">
                  <label htmlFor="prioridade">Prioridade da Tarefa:</label>
                  <input
                    id="prioridade"
                    type="text"
                    className="form-control"
                    onChange={handleFieldsChange}
                    value={tarefa.prioridade}
                    placeholder="Prioridade da Tarefa"
                    name="prioridade"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <div className="form-group">
                  <label htmlFor="pstatus">Status da Tarefa:</label>
                  <input
                    id="pstatus"
                    type="text"
                    onChange={handleFieldsChange}
                    value={tarefa.pstatus}
                    className="form-control"
                    placeholder="status da tarefa"
                    name="pstatus"
                  />
                </div>
              </div>
              <div className="col-4">
                <div className="form-group">
                  <label htmlFor="prazo">Prazo da Tarefa:</label>
                  <input
                    id="prazo"
                    type="time"
                    onChange={handleFieldsChange}
                    value={tarefa.prazo}
                    className="form-control"
                    min="00:00"
                    max="10:00"
                    placeholder="Prazo da Tarefa"
                    name="prazo"
                  />
                </div>
              </div>
              <div className="col-4 d-flex align-items-end justify-content-around">
                <button type="submit" className="btn btn-success">
                  Enviar
                </button>
                <button type="button" className="btn btn-danger">
                  Voltar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;