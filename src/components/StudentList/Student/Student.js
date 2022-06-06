import React, { useState, useContext } from 'react'
import useFetch from '../../../hooks/useFetch'
import studentContext from '../../../store/studentContext'
import StudentForm from '../../StudentForm/StudentForm'

export default function Student(props) {
    const { name, age, gender, address, id } = props
    const [isEdit, setIsEdit] = useState(false)
    const ctx = useContext(studentContext)
    const { isLoading, isError, fetchData: delData } = useFetch({
        method: 'delete',
        url: `students/${id}`
    }, ctx.fetchData)

    const deleteButtonHandler = () => {
        delData()
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
