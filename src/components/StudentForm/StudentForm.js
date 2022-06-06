import React, { useState, useCallback, useContext } from 'react'
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
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
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

    const addHandler = useCallback(async () => {
        //useCallback记得添加依赖项
        // console.log(userData)
        console.log(userData)
        try {
            setLoading(true)
            setError(null)
            const res = await fetch("http://localhost:1337/api/students", {
                method: 'post',
                //转换为JSON格式
                body: JSON.stringify({ data: userData }),
                headers: {
                    "Content-type": "application/json"
                }
            })
            if (!res.ok) {
                throw new Error("添加数据失败")
            } else {
                ctx.fetchData()
            }
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
            setUserData({
                name: '',
                age: '',
                gender: '',
                address: ''
            })
        }
    }, [userData])
    const editHandler = async () => {
        try {
            const res = await fetch(`http://localhost:1337/api/students/${props.id}`, {
                method: 'put',
                //转换为JSON格式
                body: JSON.stringify({ data: userData }),
                headers: {
                    "Content-type": "application/json"
                }
            })
            if (!res.ok) {
                throw new Error("更新数据失败")
            } else {
                alert("更新数据成功！")
                props.editButtonHandler()
                ctx.fetchData()
            }
        } catch (error) {
            setError(error)
        }
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
            {loading && <tr>
                <td colSpan={5}>正在添加数据中...</td>
            </tr>}
            {error && <tr>
                <td colSpan={5}>{error.message}</td>
            </tr>}
        </>
    )
}
