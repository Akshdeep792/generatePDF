import axios from 'axios'
import { saveAs } from 'file-saver'
import { useState } from 'react';
import './App.css';

const initialState = {
  name: '',
  recieptId: 0,
  price1: 0,
  price2: 0
}
function App() {

  const [values, setValues] = useState(initialState)
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const createAndDownloadPdf = () => {
    axios.post('/create-pdf', values)
      .then(() => axios.get('fetch-pdf', { responseType: 'blob' }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' })
        saveAs(pdfBlob, 'newPdf.pdf')
      })
  }
  return (
    <div className="App">
      <input type="text" placeholder='Name' name="name" onChange={handleChange} />
      <input type="number" placeholder='Reciept ID' name="recieptId" onChange={handleChange} />
      <input type="number" placeholder='Price 1' name="price1" onChange={handleChange} />
      <input type="number" placeholder='Price 2' name="price2" onChange={handleChange} />
      <button onClick={createAndDownloadPdf}>
        Download PDF

      </button>
    </div>
  );
}

export default App;
