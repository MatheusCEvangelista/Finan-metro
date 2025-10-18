import { useState } from "react";
import API from "../services/api.js"
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const res = await API.post("/users/login", {email, password});
            setMessage(`Bem vindo ao Finançômetro, ${res.data.name}`);
            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");

        } catch (error){
            setMessage(error.response?.data?.message || 'Erro no login.');
        }
    }


return(
    <form onSubmit = {handleSubmit}>
        <h2>Login</h2>
        <input placeholder = "Email" type = "email" value = {email} onChange = {(e)=> setEmail(e.target.value)}/>
        <input placeholder = "Senha" type = "password" value = {password} onChange = {(e)=> setPassword(e.target.value)}/>
        <button type = "submit">Entrar</button>
        <p>Não tem conta?{" "}
            <span onClick = {()=> navigate("/register")} style={{cursor: "pointer", color : "blue"}}
            >Cadastre-se</span>
        </p>
        <p>{message}</p>
    </form>
    );
}