import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, settodo] = useState("");
  const [todolist, settodolist] = useState([]);
  const [showFinished, setshowFinished] = useState(true);

  const toggleFinished = (e) => {
    setshowFinished(!showFinished);
  };

  useEffect(() => {
    let todoString = localStorage.getItem("todolist");
    if (todoString) {
      let todolist = JSON.parse(localStorage.getItem("todolist"));
      settodolist(todolist);
    }
  }, []);

  const saveToLS = (e) => {
    localStorage.setItem("todolist", JSON.stringify(todolist));
  };
  useEffect(() => {
    saveToLS();
  });

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && todo.length > 0) {
      handleAdd();
    }
  };

  const handleInput = (e) => {
    settodo(e.target.value);
  };

  const handleAdd = () => {
    settodolist([...todolist, { id: uuidv4(), todo, isCompleted: false }]);
    settodo("");
    saveToLS();
  };

  const handleEdit = (e, id) => {
    let t = todolist.filter((i) => i.id === id);
    settodo(t[0].todo);
    let newtodolist = todolist.filter((item) => {
      return item.id !== id;
    });
    settodolist(newtodolist);
    saveToLS();
  };

  const handleDelete = (e, id) => {
    let ask = confirm("Are you sure ?");
    if (ask) {
      let newtodolist = todolist.filter((item) => {
        return item.id !== id;
      });
      settodolist(newtodolist);
    }
    saveToLS();
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todolist.findIndex((item) => {
      return item.id === id;
    });
    let newtodolist = [...todolist];
    newtodolist[index].isCompleted = !newtodolist[index].isCompleted;
    settodolist(newtodolist);
    saveToLS();
  };

  return (
    <>
      <Navbar />

      <div className="container  h-[95vh] bg-red-50 py-[30px] min-w-full">
        <div className="box w-[50vw] m-auto h-[80vh] bg-red-200 rounded-xl py-1 overflow-y-auto">
          <h1 className=" text-xl w-[400px] m-auto font-bold">
            iTask - Manage your todolist at one place
          </h1>
          <h2 className="addTodo mx-[23px] my-[10px] font-bold">Add a Todo</h2>
          <div>
            <input
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              value={todo}
              className="rounded-xl mx-[15px] w-[700px] p-[3px]  "
              type="text"
            />

            <button
              onClick={handleAdd}
              disabled={todo.length < 1}
              className="bg-red-600 rounded-xl py-1 mx-[35px]  px-3 my-[10px] w-[650px]"
            >
              Add
            </button>
          </div>
          <input
            className="mx-4 my-5"
            onChange={toggleFinished}
            type="checkbox"
            checked={showFinished}
            name=""
            id=""
          />{" "}
          Show Finished
          <hr className="mx-[40px] my-[10px] border border-black " />
          <h1 className=" text-xl mx-[23px] font-bold my-[10px]">
            Your todolist
          </h1>
          <div className="todolist">
            <div className="mx-6">
              {todolist.length === 0 && <div>No todos to display</div>}
            </div>
            {todolist.map((item) => {
              return (
                (showFinished || !item.isCompleted) && (
                  <div
                    key={item.id}
                    className="todo flex mx-[23px] my-2 justify-between gap-14"
                  >
                    <input
                      name={item.id}
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
                      id="checkbox"
                    />
                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}
                    </div>

                    <div className="buttons flex gap-2">
                      <button
                        onClick={(e) => {
                          handleEdit(e, item.id);
                        }}
                        className="bg-red-600 rounded-xl px-3 w-[40px] h-[25px]"
                      >
                        <FaEdit />
                      </button>

                      <button
                        onClick={(e) => {
                          handleDelete(e, item.id);
                        }}
                        className="bg-red-600 rounded-xl px-3 w-[40px] h-[25px]"
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
