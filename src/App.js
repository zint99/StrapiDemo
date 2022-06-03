import './App.css';
import StudentList from './components/StudentList/StudentList';
import { useState, useEffect } from 'react'

function App() {
  const [studentList, setStudentList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    fetch("http://localhost:1337/api/student")
      .then((res) => {
        if (res.ok) return res.json()
        throw new Error('请求错误')
      })
      .then((res) => {
        setStudentList(res.data)
        setIsLoading(false)
      })
      .catch((err) => {
        setError(err)
      })
  }, [])

  return (
    <div className='app'>
      {!isLoading && <StudentList stus={studentList} />}
      {(isLoading && !error) && <p>数据加载中...</p>}
      {error && <p>{'数据加载失败！' + error.message}</p>}
    </div>
  );
}

export default App;
