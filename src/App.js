import './App.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, deleteUser, updateUsername } from './features/Users';
/* Bootstrap */
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
/* Icons */
import { BsTrash } from "react-icons/bs";
import { BsFillPencilFill } from "react-icons/bs";

function App() {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.users.value);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");
  /* Modal */
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
      <Container className="main-container">
        <Col className="mt-3 mb-4">
          <h1>CRUD React & Redux</h1>
          <h5>Crea, añade, edita o elimina nombres y usuarios.</h5>
        </Col>
        <Row className="justify-content-center">          
          <Col md={5} sm="12">
            <Form.Group>
              <Form.Control className="mb-2" type="text" placeholder="Nombre" onChange={(event) => {setName(event.target.value)}}/>
              <Form.Control className="mb-2" type="text" placeholder="Usuario" onChange={(event) => {setUsername(event.target.value)}}/>
            </Form.Group>
            <div className='d-grid gap-2'>
              {/* ADD DATA */}
              <Button variant="dark" onClick={() => {
                dispatch(
                  addUser({
                    id: userList[userList.length - 1].id + 1,
                    name,
                    username,
                  })
                );
              }}>
              Añadir
              </Button>
            </div>         
          </Col>
        </Row>
        <Table className="mt-4" striped bordered hover>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Username</th>
              <th>Editar username</th>
              <th>Borrar</th>
            </tr>
          </thead>
          <tbody>
            {/* TODO:
            Container width
            Background color
             */}
          {userList.map((user) => {
              return (
              <>
                <tr>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td className="text-center">
                    {/* MODAL */}
                    <Button variant="outline-primary"  onClick={handleShow}><BsFillPencilFill /></Button>
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Editar usuario</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form.Control type="text" onChange={(event) => {setNewUsername(event.target.value)}}/>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="outline-primary" className="ms-3" onClick={() => {
                          dispatch(
                            updateUsername({id: user.id, username: newUsername})
                            );}}>
                              Actualizar
                        </Button>
                        <Button variant="success" onClick={handleClose}>Guardar y cerrar</Button>
                      </Modal.Footer>
                    </Modal>
                  </td>
                  {/* DELETE DATA */}
                  <td className="text-center">
                    <Button variant="outline-danger" onClick={() => {
                        dispatch(deleteUser({id: user.id}));}}>
                      <BsTrash />
                  </Button>
                  </td>
                </tr> 
              </>
              );})}
          </tbody>
        </Table>
      </Container>
    );
}

export default App;