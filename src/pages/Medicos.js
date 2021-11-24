import React, { useState, useEffect } from 'react'
import firebase from '../database/firebase'
import { Modal, Button } from 'react-bootstrap';
import { BsPencilFill} from 'react-icons/bs';
import { BsTrashFill} from 'react-icons/bs';
import { FaBriefcaseMedical} from 'react-icons/fa';
import AddMedico from '../components/AddMedico';

export default function Medicos() {

    const [state, setState] = useState([])
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
        firebase.db.collection('medico').onSnapshot((querySnapshot) => {
            const firebase = []
            querySnapshot.docs.forEach((doc) => {
                const { email, nomeMedico, telefone, crm } = doc.data()
                firebase.push({ id: doc.id, email, nomeMedico, telefone, crm })
            })
            setState(firebase)
        })
    }, [])

    console.log(state)


    return (
        

        <>
        <div className="table-title">
        <div className="row">
            <div className="col-sm-6">
                <h2>Adicionar <b>Médicos</b></h2>
            </div>
            <div className="col-sm-6">
                <Button onClick={handleShow} className="btn btn-success" data-toggle="modal"><FaBriefcaseMedical/><span>Agendar</span></Button>					
            </div>
        </div>
    </div>


            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nome Médico</th>
                        <th scope="col">E-mail</th>
                        <th scope="col">Telefone</th>
                        <th scope="col">CRM</th>
                    </tr>
                </thead>
                <tbody>
                    {state.map((item, i) => (
                        <tr key={i}>
                            <th scope="row">{i + 1}</th>
                            <td>{item.nomeMedico}</td>
                            <td>{item.email}</td>
                            <td>{item.telefone}</td>
                            <td>{item.crm}</td>
                            <td> <Button onClick={handleShow}><BsPencilFill /></Button> </td>
                            <td> <Button><BsTrashFill/></Button> </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Adicionar Médico
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddMedico/>
                </Modal.Body>
                <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Fechar
                        </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}