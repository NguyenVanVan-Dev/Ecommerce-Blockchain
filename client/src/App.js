
import { Routes, Route, Link ,Navigate} from "react-router-dom";

import Home from "./Components/User/Home";
import Login from "./Components/Manage/Auth/Login";
import Register from "./Components/Manage/Auth/Register";
import axios  from "axios";
axios.defaults.baseURL = 'http://localhost:2105/';
axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post ['Accept'] = 'application / json';
axios.defaults.headers.post['Access-Control-Allow-Origin']= '*';

axios.defaults.withCredentials = true;
axios.interceptors.request.use( function(config){
    const token = localStorage.getItem('auth_token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

function App() {
    return (
        <div className="App">
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/admin/login" element = {<Login/>} />
            <Route path="/admin/register" element = {<Register/>} />
        </Routes>
        </div>
    );
}

export default App;
