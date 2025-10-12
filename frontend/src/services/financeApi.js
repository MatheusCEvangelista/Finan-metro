import API from "./api";

export const getFinances = async () =>{
    const token = localStorage.getItem("token");
    const res = await API.get("/finances",{
        headers: { Authorization: `Bearer ${token}`}
    });
    return res.data
}

export const createFinance = async (data) =>{
    const token = localStorage.getItem("token");
    const res = await API.post("/finances", data,
        {headers: {Authorization: `Bearer ${token}`},
    });
    return res.data;
};
