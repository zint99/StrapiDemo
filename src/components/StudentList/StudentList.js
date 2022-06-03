import React from 'react'
import Student from './Student/Student'
export default function StudentList(props) {
    return (
        <table>
            <caption>学生列表</caption>
            <thead>
                <tr>
                    <th>name</th>
                    <th>gender</th>
                    <th>age</th>
                    <th>address</th>
                </tr>
            </thead>

            <tbody>
                {props.stus.map((stu) => <Student key={stu.id} {...stu.attributes} />)}
            </tbody>
        </table>
    )
}
