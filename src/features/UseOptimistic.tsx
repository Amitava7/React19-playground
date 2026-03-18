import React, { useOptimistic, useState, useTransition } from "react"
import { fakeRequest } from "../fakeserver"

interface Todo {
    id: number
    text: string
    done: boolean
}
const initialTodos: Todo[] = [
    { id: 1, text: 'Learn React 19', done: false },
    { id: 2, text: 'Build a demo app', done: false },
    { id: 3, text: 'Ship to production', done: false },
]

function UseOptimistic() {
    const [todos, setTodos] = useState(initialTodos);
    const [optTodos, setOptTodos] = useOptimistic(todos)

    async function submitAction(formData: FormData) {
        const newTodo = String(formData.get('todo') ?? "")

        setOptTodos(prev => [...prev, { id: prev.length + 1, text: newTodo, done: false }])
        try {
            await fakeRequest(123, Math.random() > .5)
            setTodos((prev => [...prev, { id: prev.length + 1, text: newTodo + 'server', done: false }]))
        } catch {
            console.log("error")
        }

    }
    return (
        <>
            <form action={submitAction}>
                <input type="text" name="todo" />
                <button type="submit" >Submit</button>
            </form>
            {
                optTodos.map(todo =>
                    <div key={todo.id}>{todo.text}</div>
                )
            }
        </>
    )
}

export default UseOptimistic
