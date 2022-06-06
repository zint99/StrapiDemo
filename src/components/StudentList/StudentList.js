import React, { useContext } from 'react'
import studentContext from '../../store/studentContext'
import StudentForm from '../StudentForm/StudentForm'
import Student from './Student/Student'
export default function StudentList(props) {
    const ctx = useContext(studentContext)
    return (
        <>
            <button onClick={ctx.fetchData}>更新数据</button>
            <table>
                <caption>学生列表</caption>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>gender</th>
                        <th>age</th>
                        <th>address</th>
                        <th>删除</th>
                    </tr>
                </thead>
                <tbody>
                    {props.stus.map((stu) => <Student key={stu.id} {...stu.attributes} id={stu.id} />)}
                </tbody>
                <tfoot>
                    <StudentForm />
                </tfoot>
            </table>
        </>
    )
}
