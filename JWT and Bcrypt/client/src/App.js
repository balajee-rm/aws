import axios from "axios";
import { useState } from "react";

function App ({store}) {

    // const [msg, setMsg] = useState("fail");
    // const [token, setToken] = useState(null);
    const [a,setA] = useState(5);

    function handleButton() {
        setA(10);
        console.log(a);
    }

    function  loginButton() {
        axios.post('http://localhost:8081/login', {
            un: "USER 1",
            pw: "PASS 1"
        }).then((res) => {
            console.log(res.data);
            localStorage.setItem('msg', res.data.message);
            localStorage.setItem('token', res.data.token);
            if (localStorage.getItem('token')) {
                console.log("condition true: " + localStorage.getItem('token'))
                store.dispatch({type: "login", data:{un:"USER 1", role:document.getElementById("role").value}})
                store.dispatch({type:"change", data:"This is a Changed Home Page"})
            }
            else {
                store.dispatch({type:"change", data:"This is a Login Page"})
            }
        });
    }

    function logoutButton() {
        store.dispatch({type: "logout"})
        store.dispatch({type:"change", data:"This is a Login Page"})
        localStorage.removeItem('token')
        localStorage.removeItem('msg')
    }

    function homeButton() {
        if(store.getState().AuthReducer[1] == 1 || store.getState().AuthReducer[1] == 2) {
            store.dispatch({type:"change", data:"This is a Changed Home Page"})
        }
        else {
            store.dispatch({type:"change", data:"Error Page"})
        }
    }

    function page1Button() {
        if(store.getState().AuthReducer[1] == 1 || store.getState().AuthReducer[1] == 2) {
            store.dispatch({type:"change", data:"This is Page 1"})
            axios.post('http://localhost:8081/page1', {}, {
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Accept' : 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((res) => {
                console.log(res.data);
            });
        }
        else {
            store.dispatch({type:"change", data:"Error Page"})
        }
    }

    function page2Button() {
        if(store.getState().AuthReducer[1] == 1) {
            store.dispatch({type:"change", data:"This is Page 2"})
        }
        else {
            store.dispatch({type:"change", data:"Error Page"})
        }
    }

    return(
        <div>
            Navigation Bar
            <button onClick={homeButton}>Home</button>
            <button onClick={page1Button}>Page 1</button>
            <button onClick={page2Button}>Page 2</button>
            <br/>
            <br/>

            <div id="page"> {store.getState().NavReducer} </div>
            <br/>
            <br/>

            The a value is {a}
            <button onClick={handleButton}>Change a to 10</button>
            <br/>
            <br/>

            <select id="role">
                <option value = {1}> Manager </option>
                <option value = {2}> Employee </option>
            </select>
            <button onClick={loginButton}>Login</button>
            <button onClick={logoutButton}>Logout</button>
            <br/>
            The AuthRedecer State value is {store.getState().AuthReducer.map(p => (
                <div>
                    {JSON.stringify(p)}
                </div>
            ))}
        </div>
    );
}

export default App