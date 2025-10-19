import { useEffect, useState } from "react";
import { getFinances } from "../services/financeApi";
import FinanceForm from "../components/FinanceForm";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function Dashboard() {
  const [finances, setFinances] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [totals, setTotals] = useState({ income: 0, expense: 0 });
  const [filters, setFilters] = useState({ month: "all", type: "all" });

  const fetchFinances = async () => {
  try {
    const data = await getFinances();
    setFinances(data);
    applyFilters(data, filters);
  } catch (error) {
    alert("Erro ao carregar finanças");
  }
};

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getFinances();
        setFinances(data);
        setFiltered(data);
        calculateTotals(data);
      } catch (error) {
        alert("Erro ao carregar finanças");
      }
    }
    fetchData();
  }, []);

  const calculateTotals = (data) => {
    const income = data
      .filter((f) => f.type === "income")
      .reduce((acc, f) => acc + f.amount, 0);
    const expense = data
      .filter((f) => f.type === "expense")
      .reduce((acc, f) => acc + f.amount, 0);
    setTotals({ income, expense });
  };

  const handleAddFinance = (newFinance) => {
    const newData = [newFinance, ...finances];
    setFinances(newData);
    applyFilters(newData, filters);
  };

 const handleDelete = async (id) => {
  try {
    const token = localStorage.getItem("token");
    await API.delete(`/finances/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchFinances();
  } catch (error) {
    alert("Erro ao deletar lançamento");
  }
};

  const handleEdit = (finance) =>{
    
  }

  const applyFilters = (data, newFilters) => {
    let filteredData = [...data];

    if (newFilters.month !== "all") {
      filteredData = filteredData.filter((f) => {
        const date = new Date(f.date);
        return date.getMonth() + 1 === parseInt(newFilters.month);
      });
    }

    if (newFilters.type !== "all") {
      filteredData = filteredData.filter((f) => f.type === newFilters.type);
    }

    setFiltered(filteredData);
    calculateTotals(filteredData);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    applyFilters(finances, newFilters);
  };

  const dataPie = [];
  const categories = {};

  filtered.forEach((f) => {
    if (!categories[f.category]) categories[f.category] = 0;
    categories[f.category] += f.amount;
  });
  for (const key in categories) {
    dataPie.push({ name: key, value: categories[key] });
  }

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A"];

  return (
    <div>
      <h2>Dashboard do Financometro</h2>

      <div>
        <label>
          Mês:{" "}
          <select name="month" value={filters.month} onChange={handleFilterChange}>
            <option value="all">Todos</option>
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString("pt-BR", { month: "long" })}
              </option>
            ))}
          </select>
        </label>

        <label style={{ marginLeft: "20px" }}>
          Tipo:{" "}
          <select name="type" value={filters.type} onChange={handleFilterChange}>
            <option value="all">Todos</option>
            <option value="income">Receitas</option>
            <option value="expense">Despesas</option>
          </select>
        </label>
      </div>

      <div style={{ marginTop: "20px", display: "flex", gap: "20px" }}>
      <div style={{color: "green"}}> Receitas: R$ {totals.income}</div>
      <div style={{color: "red"}}>Despesas: R$ {totals.expense}</div>
      <div style = {{color : totals.income - totals.expense >= 0 ?"green": "red"}}>
        Saldo: R$ {totals.income - totals.expense} 
      </div>
      </div>

      <FinanceForm onAdd={handleAddFinance} />

      <h3>Lista de Finanças</h3>
      <ul>
        {filtered.map((f) => (
          <li key={f._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            margin: "5px 0",
            borderRadius: "5px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"}}>
            [{f.type === "income" ? "Receita" : "Despesa"}] {f.category} - R${" "}
            {f.amount} ({new Date(f.date).toLocaleDateString()}) - {f.description}
            <button onClick={() => handleEdit(f)}>Editar</button>
            <button onClick={() => handleDelete(f._id)}>Deletar</button>
          </li>
        ))}
      </ul>

      <h3>Distribuição por Categoria</h3>
      {dataPie.length > 0 && (
        <PieChart width={400} height={300}>
          <Pie
            data={dataPie}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {dataPie.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      )}
    </div>
  );
}
