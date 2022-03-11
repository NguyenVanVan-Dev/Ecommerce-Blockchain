
import { Routes, Route} from "react-router-dom";

import Login from "./Components/Manage/Auth/Login";
import Register from "./Components/Manage/Auth/Register";
import MasterLayout from "./Layout/Manage/MasterLayout";
import MasterLayoutUI from "./Layout/User/MasterLayout";
import Dashboard  from "./Components/Manage/Webpage/Dashboard";
import Profile from "./Components/Manage/Webpage/Profile";
import axios  from "axios";
import AddCategory from "./Components/Manage/Webpage/Category/AddCategory";
import ListCategory from "./Components/Manage/Webpage/Category/ListCategory";
import DetailCategory from "./Components/Manage/Webpage/Category/DetailCategory";
import AddProduct from "./Components/Manage/Webpage/Product/AddProduct";
import ListProduct from "./Components/Manage/Webpage/Product/ListProduct";
import DetailProduct from "./Components/Manage/Webpage/Product/DetailProduct";
import ForgotPassword from "./Components/Manage/Auth/ForgotPassword";
import ResetPassword from "./Components/Manage/Auth/ResetPassword";
axios.defaults.baseURL = 'http://localhost:2105/';
axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Accept'] = 'application / json';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers['authorization'] = 'Beaer ' + localStorage.getItem('auth_token')?? 'jhhhhhhhhhhhhhh';

// axios.defaults.withCredentials = true; // bật cái đầu buồi này lên sẽ bị Cors : localhost:3000 sẽ k gửi request lên localhost:2105 được
axios.interceptors.request.use( function(config){
    const token = localStorage.getItem('auth_token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

function App() {
    return (
        <div className="App">
        <Routes>
            {/* <Route path="/" element={<Home/>} /> */}
            <Route path="/" element={<MasterLayoutUI/>} />
            <Route path="/admin/login" element = {<Login/>} />
            <Route path="/admin/register" element = {<Register/>} />
            <Route path="/admin/forgot-password" element = {<ForgotPassword/>} />
            <Route path="/admin/reset-password/:token" element = {<ResetPassword/>} />
            <Route path="/admin" element = {<MasterLayout/>} >
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="profile" element={<Profile/>} />
                <Route path="add-category" element={<AddCategory/>} />
                <Route path="list-category" element={<ListCategory/>} />
                <Route path="category/:id" element={<DetailCategory/>} />
                <Route path="add-product" element={<AddProduct/>} />
                <Route path="list-product" element={<ListProduct/>} />
                <Route path="product/:id" element={<DetailProduct/>} />  
            </Route>
        </Routes>
        </div>
    );
}

export default App;
