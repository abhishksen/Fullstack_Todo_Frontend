
const TodoItem = ({
    title,
    description,
    createdAt,
    isCompleted,
    updateHandler,
    deleteHandler,
    id
}) => {

    let date = new Date(createdAt).toLocaleTimeString('en-GB') + " " + new Date(createdAt).toLocaleDateString('en-GB');

    return (
        <div className="todo">
            <div>
                <h3>{title}</h3>
                <p>{description}</p>
                <span>{date}</span>
            </div>
            <div className="div2">
                <input onChange={() => updateHandler(id)} type="checkbox" checked={isCompleted} />
                <button onClick={() => deleteHandler(id)}>Delete</button>
            </div>
        </div>
    )
}

export default TodoItem
