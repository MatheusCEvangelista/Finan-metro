import { useState } from "react";
import { createFinance } from "../services/financeApi";

export default function FinanceForm({onAdd}){
    const [type, setType] = useState("income");
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(!category || !amount) return;

        const data = {type, category, amount: parseFloat(amount), description};
        try{
            const newFinance = await createFinance(data);
            onAdd(newFinance);
            setCategory("");
            setAmount("");
            setDescription("");
        }
        catch (error) {
            alert(error.response?.data?.message || "Erro ao adcionar finança")
        }
    };

    return(
        <form onSubmit={handleSubmit}>
            <h3>Adicionar finanças</h3>
            <select value = {type} onChange={(e)=> setType(e.target.value)}>
                <option value = "income">Receita</option>
                <option value = "expense">Despesa</option>
            </select>
            <input
            type = "text"
            placeholder="Categoria"
            value = {category}
            onChange={(e)=> setCategory(e.target.value)}/>
            <input
            type="number"
            placeholder="Valor"
            value = {amount}
            onChange={(e) => setAmount(e.target.value)}/>
            <input
            type="text"
            placeholder="Descrição"
            value = {description}
            onChange={(e)=> setDescription(e.target.value)}/>
            <button type="submit">Adcionar Finança</button>
        </form>
    );
}