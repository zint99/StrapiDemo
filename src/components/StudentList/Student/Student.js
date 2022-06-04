import React, { useState, useContext } from 'react'
import studentContext from '../../../store/studentContext'

export default function Student(props) {
    const { name, age, gender, address, id } = props
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const ctx = useContext(studentContext)
    const deleteButtonHandler = async () => {
        try {
            setLoading(true)
            //删除数据
            const res = await fetch(`http://localhost:1337/api/student/${id}`, {
                method: 'delete'
            })
            if (!res.ok) {
                throw new Error("删除数据失败！")
            } else {
                ctx.fetchData()
            }
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            <tr>
                <td>{name}</td>
                <td>{gender}</td>
                <td>{age}</td>
                <td>{address}</td>
                <td>
                    <button onClick={deleteButtonHandler}>删除</button>
                </td>
            </tr>
            {loading && <tr>
                <td colSpan={5}>正在删除数据中...</td>
            </tr>}
            {error && <tr>
                <td colSpan={5}>{error.message}</td>
            </tr>}
        </>
    )
}
