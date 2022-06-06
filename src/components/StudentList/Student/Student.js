import React, { useState, useContext } from 'react'
import studentContext from '../../../store/studentContext'
import StudentForm from '../../StudentForm/StudentForm'

export default function Student(props) {
    const { name, age, gender, address, id } = props
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(null)
    const [isEdit, setIsEdit] = useState(false)
    const ctx = useContext(studentContext)
    const deleteButtonHandler = async () => {
        try {
            setIsLoading(true)
            setIsError(null)
            //删除数据
            const res = await fetch(`http://localhost:1337/api/students/${id}`, {
                method: 'delete'
            })
            if (!res.ok) {
                throw new Error("删除数据失败！")
            } else {
                ctx.fetchData()
            }
        } catch (error) {
            setIsError(error)
        } finally {
            setIsLoading(false)
        }
    }
    const editButtonHandler = () => {
        setIsEdit(preIsEdit => !preIsEdit)
    }
    return (
        <>
            {
                isEdit ?
                    <StudentForm {...props} isEdit={isEdit} editButtonHandler={editButtonHandler} />
                    :
                    (
                        <>
                            <tr>
                                <td>{name}</td>
                                <td>{gender}</td>
                                <td>{age}</td>
                                <td>{address}</td>
                                <td>
                                    <button onClick={deleteButtonHandler}>删除</button>
                                    <button onClick={editButtonHandler}>修改</button>
                                </td>
                            </tr>
                            {isLoading && <tr>
                                <td colSpan={5}>正在删除数据中...</td>
                            </tr>}
                            {isError && <tr>
                                <td colSpan={5}>{isError.message}</td>
                            </tr>}
                        </>
                    )}
        </>
    )
}
