import React, { useState, useCallback, useContext } from 'react'
import useFetch from '../../hooks/useFetch'
import studentContext from '../../store/studentContext'
import './StudentForm.css'

export default function StudentForm(props) {
    const [userData, setUserData] = useState({
        name: props.name ? props.name : '',
        age: props.age ? props.age : '',
        gender: props.gender ? props.gender : '男',
        address: props.address ? props.address : ''
    })
    const ctx = useContext(studentContext)
    // const [isLoading, setIsLoading] = useState(false)
    // const [isError, setIsError] = useState(null)
    const nameChangeHandler = (e) => {
        setUserData({ ...userData, name: e.target.value })
    }
    const ageChangeHandler = (e) => {
        setUserData({ ...userData, age: +e.target.value })
    }
    const addressChangeHandler = (e) => {
        setUserData({ ...userData, address: e.target.value })
    }
    const genderChangeHandler = (e) => {
        setUserData({ ...userData, gender: e.target.value })
    }

    const { isError, isLoading, fetchData: addStu } = useFetch({
        method: 'post',
        url: 'students',
        body: userData
    }, () => {
        setUserData({
            name: '',
            age: '',
            gender: '',
            address: ''
        })
        ctx.fetchData()
    })

    const { fetchData: editStu } = useFetch({
        method: 'put',
        url: `students/${props.id}`,
        body: userData
    }, () => {
        alert("更新数据成功！")
        props.editButtonHandler()
        ctx.fetchData()
    })

    const addHandler = () => {
        addStu(userData)
    }

    const editHandler = () => {
        editStu(userData)
    }

    return (
        <>
            <tr className='StudentForm'>
                <td><input type="text" placeholder='姓名' value={userData.name} onChange={(e) => nameChangeHandler(e)} /></td>
                <td>
                    <select value={userData.gender} onChange={(e) => genderChangeHandler(e)}>
                        <option value="男">男</option>
                        <option value="女">女</option>
                    </select>
                </td>
                <td><input type="text" placeholder='年龄' value={userData.age} onChange={(e) => ageChangeHandler(e)} /></td>
                <td><input type="text" placeholder='住址' value={userData.address} onChange={(e) => addressChangeHandler(e)} /></td>
                <td>
                    {props.isEdit ?
                        <>
                            <button onClick={editHandler}>确认</button>
                            <button onClick={props.editButtonHandler}>取消</button>
                        </>
                        :
                        <button onClick={addHandler}>添加</button>}
                </td>
            </tr>
            {isLoading && <tr>
                <td colSpan={5}>正在添加数据中...</td>
            </tr>}
            {isError && <tr>
                <td colSpan={5}>{isError.message}</td>
            </tr>}
        </>
    )
}
