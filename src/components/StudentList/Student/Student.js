import React from 'react'

export default function Student(props) {
    const { name, age, gender, address } = props
    return (
        <tr>
            <td>{name}</td>
            <td>{gender}</td>
            <td>{age}</td>
            <td>{address}</td>
        </tr>
    )
}
