import { useEffect, useState } from "react"
import axios from 'axios'
const App = () => {
  const [currency, setCurrency] = useState(null)
  const [rates, setRates] = useState({})
  useEffect(() => {
    if (currency) {
      axios.get(`https://open.er-api.com/v6/latest/${currency}`).then(response => {
        setRates(response.data)
      })
    }
  }, [currency])
  const onchg = (e) => {
    setCurrency(e.target.value)
  }
  return <div>
    <form>
      <input value={currency} onChange={onchg} />
    </form>
    <pre>
      {JSON.stringify(rates, null, 2)}
    </pre>
  </div>
}
export default App
