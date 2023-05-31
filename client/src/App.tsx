import "./App.css"
import React, { useEffect, useState } from "react"
import Select from "react-select"

const options = [
  { value: "int64", label: "Int 64" },
  { value: "float64", label: "Float 64" },
  { value: "object", label: "Object" },
]

const TypeSelection = ({ name, setOutput }: any) => {
  useEffect(() => {
    setOutput((o: any) => ({
      ...o,
      [name]: options[2].value,
    }))
  }, [])

  return (
    <Select
      options={options}
      defaultValue={options[2]}
      onChange={(s) =>
        s &&
        setOutput((o: any) => ({
          ...o,
          [name]: s.value,
        }))
      }
    />
  )
}

const Table = ({ data, setOutput }: any) => {
  const columns = data.length > 0 && data[0]
  const entries = data.slice(1)
  return columns.length > 0 && entries.length > 0 ? (
    <table>
      <tr>
        {columns.map((c: any) => (
          <th>{c}</th>
        ))}
      </tr>
      <tr>
        {columns.map((c: any) => (
          <td>
            <TypeSelection name={c} setOutput={setOutput} />
          </td>
        ))}
      </tr>
      {entries.map((e: any) => (
        <tr>
          {e.map((k: any) => (
            <td>{k}</td>
          ))}
        </tr>
      ))}
    </table>
  ) : null
}

const Footer = ({ output }: any) => {
  return output ? (
    <div
      style={{
        height: "100px",
        position: "fixed",
        bottom: "0px",
        background: "#d5d5d5",
        width: "100%",
        padding: "25px",
        textAlign: "left",
        overflow: "scroll",
      }}
    >
      <pre>{JSON.stringify(output, null, 2)}</pre>
    </div>
  ) : null
}

const App = () => {
  const [data, setData] = useState([])
  const [output, setOutput] = useState({})

  const fetchUserData = async () => {
    const res = await fetch("http://localhost:8000/api/data")
    const data = await res.json()
    setData(data)
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  return (
    <div className="App">
      <Table data={data} setOutput={setOutput} />
      <Footer output={output} />
    </div>
  )
}

export default App
