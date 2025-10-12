import {useState} from "react";
import API from "../services/api.js"

export default function RegisterForm(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            console.log({name, email, password});
            const res = await API.post("/users/register", {name, email, password});
            setMessage(`Usuário ${res.data.name} registrado com sucesso`);
            localStorage.setItem("token", res.data.token);
        }catch (error){
            setMessage(error.response?.data?.message || "Erro no registro");
        }
    };
    return(
        <form onSubmit={handleSubmit}>
            <h2>Cadastro</h2>
            <input placeholder = "Nome" value = {name} onChange = {(e)=> setName(e.target.value)} />
            <input placeholder = "Email" type = "email" value = {email} onChange = {(e)=> setEmail(e.target.value)}/>
            <input placeholder = "Senha" type = "password" value ={password} onChange={(e)=> setPassword(e.target.value)}/>
            <button type="submit">Cadastrar</button>
            <p>{message}</p>
        </form>
    );
}