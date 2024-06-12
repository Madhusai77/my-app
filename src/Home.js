import React,{useEffect, useState} from 'react';
import {Navbar,Table,Container,Row,Col,Button,ButtonGroup, Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {addUser, deleteUser, loadSingleUser, loadUsers, updateuser} from "./redux/actions";
import {toast} from "react-toastify";

const initialState ={
  name:"",
  email:"",
  contact:"",
  address:""
}

const Home = () => {
  const [state, setState] = useState(initialState);
  const [editMode, setEditMode] = useState(false);
  const [userId, setUserId] = useState(null);
  const dispatch = useDispatch();
  const {users,msg,} = useSelector ((state) => state.data);

  const{name, email, contact, address} = state;

    useEffect(() => {
      dispatch(loadUsers());

    }, []);

    useEffect(() =>{
      if(msg){
        toast.success(msg);
      }
    }, [msg])

    const handleChange = (e) => {
      let {name,value} = e.target;
      setState({ ...state, [name]:value});
    };


    const handleSubmit = (e) => {
      e.preventDefault();
      if(!name || !email || !contact || !address) {
        toast.error ("please fill all input field");
      }else{if(!editMode){
        dispatch(addUser(state));
        setState({name:"",email:"",contact:"",address:""});

      }else {
        dispatch(updateuser(state,userId));
        setState({name:"",email:"",contact:"",address:""});
        setEditMode(false);
        setUserId(null);


      }

      

      }
      

    };

    const handleDelete = (id) => {
      if(window.confirm("are you wanted to delete?")){
        dispatch(deleteUser(id));

      }
    };

    const handleUpdate = (id) => {
      dispatch(loadSingleUser(id));
      setUserId(id);
      setEditMode(true);
    }

  return (
    <>
    <Navbar bg="primary" variant="dark" className="justify-content-center">
        <Navbar.Brand> python flask mongodb redux CRUD application</Navbar.Brand>
        </Navbar>
        <Container style={{ marginTop:"70px"}}>
          <Row>
            <Col md={4}>
            <Form onSubmit = {handleSubmit}>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={handleChange || ""}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>email</Form.Label>
                <Form.Control
                type="email"
                placeholder="email"
                name="email"
                value={email}
                onChange={handleChange || "" }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>contact</Form.Label>
                <Form.Control
                type="number"
                placeholder="contact"
                name="contact"
                value={contact}
                onChange={handleChange || ""}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>address</Form.Label>
                <Form.Control
                type="text"
                placeholder="address"
                name="address"
                value={address}
                onChange={handleChange || ""}
                />
              </Form.Group>
              <div className='d-grid gap-2 mt-2'>
                <Button type='submit' variant="primary" size ="1g">{editMode ? "update": "submit"}</Button>
              </div>
              

            </Form>
            
            
            </Col>
            <Col md={8}>
            <Table bordered hover>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>contact</th>
                  <th>address</th>
                  <th>action</th>
                </tr>
              </thead>
              {users && users.map((item, index) => (
                <tbody key={index}>
                  <tr>

                    <td>{index+1}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.contact}</td>
                    <td>{item.address}</td>
                    <td>
                      <ButtonGroup>
                        <Button style={{marginRight: "5px"}} variant="danger"
                        onClick={()=> handleDelete(item._id)}
                        
                        
                        >Delete</Button>
                        <Button variant="secondary"
                        onClick={() => handleUpdate(item._id)}
                        
                        >update</Button>
                      </ButtonGroup>
                    </td>
                  </tr>

                </tbody>
              ))}

            </Table>
            </Col>
          </Row>
            
        </Container>
        </>
  );
};

export default Home;