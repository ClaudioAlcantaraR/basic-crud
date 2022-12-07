import './App.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, deleteUser, updateUsername } from './features/Users';
/* Bootstrap */
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';

function App() {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.users.value);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");
  
  return (
      <Container>
        <Row>
          <input type="text" placeholder="Nombre" onChange={(event) => {setName(event.target.value)}}/>
          <input type="text" placeholder="Usuario" onChange={(event) => {setUsername(event.target.value)}}/>
          {/* Botton para añadir usuario y username */}
          <button
            onClick={() => {
              dispatch(
                addUser({
                    id: userList[userList.length - 1].id + 1,
                    name,
                    username,
                  })
                );
              }}>
                Añadir
          </button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Username</th>
              <th>Editar</th>
              <th>Borrar</th>
            </tr>
          </thead>
          <tbody>
            {/* TODO:
            Heading para decir añada un nuevo usuario
            Container width
            Background color
            form control
            botton
            icons */}
          {userList.map((user) => {
              return (
                <>
                <tr>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>
                    <input type="text" placeholder="Editar usuario" onChange={(event) => {setNewUsername(event.target.value)}}/>              
                    <button onClick={() => {
                      dispatch(
                        updateUsername({id: user.id, username: newUsername})
                        );}}>
                      Actualizar
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        dispatch(deleteUser({id: user.id}));}}>
                      Borrar
                  </button>
                  </td>
                </tr> 
                  </>
                );})}
            </tbody>
          </Table>
        </Row>
      </Container>
    );
}

export default App;