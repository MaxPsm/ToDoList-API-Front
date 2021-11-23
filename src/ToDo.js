import React from 'react';
import './ToDo.css'

const ToDo = ({todo, handleToggle}) => {
    return (
        <div id={todo.id} name="todo" value={todo.is_complete} onClick={() => handleToggle(todo.id, !todo.is_complete)} className={todo.is_complete ? "todo strike" : "todo"}>
            {todo.name}
        </div>
    );
};

export default ToDo;