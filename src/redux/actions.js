import * as types from "./actionTypes";
import axios from "axios";

const API = " http://127.0.0.1:5000"

const getUsers = (users) => ({
    type: types.GET_USERS,
    payload: users
});

const getUser = (users) => ({
    type: types.GET_SINGLE_USER,
    payload: users
});


const userAdded = (msg) => ({
    type: types.ADD_USER,
    payload: msg
});

const userDelete = (msg) => ({
    type: types.DELETE_USER,
    payload: msg
});

const userUpdate = (msg) => ({
    type: types.UPDATE_USER,
    payload: msg
});

export const loadUsers = () => {
    return function(dispatch) {
        axios
        .get('${API}/users')
        .then((resp) => dispatch(getUsers(resp.data)))
        .catch(err => console.log(err));
    };
};

export const addUser = (users) => {
    return function(dispatch) {
        axios
        .post('${API}/users',users)
        .then((resp) => {
              dispatch(userAdded(resp.data.msg));
              dispatch(loadUsers());
        })
            .catch((err) => console.log(err));
    };
};

export const deleteUser = (id) => {
    return function(dispatch) {
        axios
        .delete('${API}/users/${id}')
        .then((resp) => {
              dispatch(userDelete(resp.data.msg));
              dispatch(loadUsers());
        })
            .catch((err) => console.log(err));
    };
};

export const loadSingleUser = (id) => {
    return function(dispatch) {
        axios
        .get('${API}/users/${id}')
        .then((resp) => {
              dispatch(getUser(resp.data));
              
        })
            .catch((err) => console.log(err));
    };
};

export const updateuser = (users,id) => {
    return function(dispatch) {
        axios
        .put('${API}/users/${id}',users)
        .then((resp) => {
              dispatch(userUpdate(resp.data.msg));
              dispatch(loadUsers());
        })
            .catch((err) => console.log(err));
    };
};
