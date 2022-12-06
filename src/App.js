import './App.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, deleteUser, updateUsername } from './features/Users';
/* Bootstrap */
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.users.value);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");
  
  return (
    <div>
      <Container>
      <div>
        <input type="text" placeholder="Nombre" onChange={(event) => {
          setName(event.target.value)
          }}
          />
        <input type="text" placeholder="Usuario" onChange={(event) => {
          setUsername(event.target.value)
          }}
          />
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
      </div>
      <div className="displayUsers">
          {userList.map((user) => {
            return (
              <div>
                {/* Mostrar el nombre y username */}
                <h1>{user.name}</h1>
                <h3>{user.username}</h3>
                {/* Actualizar el username */}
                <input type="text" placeholder="Editar usuario" onChange={(event) => {
                  setNewUsername(event.target.value)
                }}
                />
                <button onClick={() => {
                  dispatch(
                    updateUsername({id: user.id, username: newUsername})
                    );
                }}
                >
                  Actualizar
                </button>
                <Button>React button</Button>
                <button
                  onClick={() => {
                    dispatch(deleteUser({id: user.id}));
                }}>
                  Borrar
                </button>
              </div>
              );
          })}
      </div>
      </Container>
    </div>
  );
}

export default App;
