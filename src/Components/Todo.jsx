import "../App.css";
import React from "react";
import { useEffect } from "react";
import { useState } from "react"

const Todo = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const getData = async (p=1) => {
    setLoading(true);
    try {
      let data = await fetch(
        `https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=10`
      );
      data = await data.json();
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      console.log(data);
      setData(data);
    } catch (err) {
      setLoading(false);
      setError(true);
      console.log(err);
    }
  };

  const handleDelete = (id) => {
    let newData = data.filter((el) => 
      el.id!==id
    );
    setData(newData)
  };

  useEffect(() => {
    getData(page);
  }, [page]);

  if (loading) {
    return <h1>Loading....</h1>;
  }
  if (error) {
    return <h1>Error...</h1>;
  }
  
  // const handleAdd = () => {
  //   setTodos([...todos, text]);
  //   setText("");
  // };
  

  return (
    <div className="App">
      {/* <button onClick={getData}>fetch</button> */}
      {/* <input onChange={(e)=>setText(e.target.value)} value={text} placeholder="Write Something ..." />
      <button onClick={handleAdd}>Add</button>
      <br/> */}
      <h1>Todos</h1>
      <div>
      <button onClick={()=>setPage(page-1)} disabled={page===1}>Prev</button>
      <span style={{padding:"0.5rem"}}>{page}</span>
  
      <button onClick={()=>setPage(page+1)}>Next</button>
      </div>
      <br/>
      {data.map((item) => (
        <div
          key={item.id}
          style={{ display: "flex",
           marginLeft: "200px",
           border:"1px solid red",
           width:"70%",
           justifyContent:"space-between"

         }}
          className="App"
        >
          <h1>{item.id}</h1>
          <h1>{item.title}</h1>
          <h1>{item.status?"Done":"Not Done"}</h1>
          <button className="btn" onClick={()=>handleDelete(item.id)}>Delete</button>
          
        </div>
      ))}
    </div>
  );
};

export default Todo;
