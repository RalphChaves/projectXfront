import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import Api from '../../api/api';

const View = () => {
  // inicializa o estado tarefa para poder fazer as alteracoes do dom.
  const [tarefa, setTarefa] = useState({});
  // crio o estado de abertura do modal;
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  // funcoes de abertura e fechamento do modal
  const AbreModal = () => setOpen(true);
  const FechaModal = () => setOpen(false);

  // chama o use effect sem parametro de dependencia (executa uma vez ao renderizar o componente)
  // chamando a funcao getTarefaById
  useEffect(() => {
    getTarefaById();
  }, [])

  // acessa o id no parametro da url;
  const { id } = useParams();
  console.log(id);

  // faz a chamada para a api passando o id como parametro para buscar o objeto da tarefa (invidual por id)
  const getTarefaById = async () => {
    const request = await Api.fetchGetById(id);
    const tarefa = await request.json();
    setTarefa(tarefa);
  }

  const handleDelete = async() => {
    const response = await Api.fetchDelete(id);
    const data = await response.json();
    if(data.message) {
      console.log('excluido', data.message);
      navigate('/');
    }else {
      alert(data.error);
    }
  }

  return (
    <div className="Item-field">
      <div className="row my-5">
          <div className="col-6">
          <div className="card my-5">
            <h1 className="text-center my-4"><b>Titulo: </b>{tarefa.titulo}</h1>
            <h2 className="text-center"><b>Descrição: </b>{tarefa.descricao}</h2>
            <h3 className="text-center"><b>Prioridade: </b> {tarefa.prioridade}</h3>
            <h4 className="text-center"><b>Status: </b>{tarefa.pstatus}</h4>
            <h5 className="text-center"><b>Prazo: </b>{tarefa.prazo}</h5>
            <h6 className="text-center"><b>Data de Criação: </b>{tarefa.dataCriacao}</h6>
            <div className="btn-group mt-3 w-100">
              <Link to={`/edit/${tarefa._id}`} className="btn btn-info">Editar</Link>
              <button className="btn btn-danger" onClick={AbreModal}>Excluir</button>
            </div>
          </div>
        </div>
      </div>
      <Modal open={open} onClose={FechaModal} center showCloseIcon={false}>
        <h2 className="my-4">Deseja Realmente Excluir ?</h2>
        <div className="d-flex w-50 mx-auto justify-content-around">
          <button className="btn btn-danger mr-2" onClick={FechaModal}>Não</button>
          <button className="btn btn-success" onClick={handleDelete}>Sim</button>
        </div>
      </Modal>
    </div>
  )
}

export default View;