import { useEffect, useState } from 'react'
import axios from 'axios'

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    (async () => {
      const response = await axios.get(`https://restcountries.com/v2/name/${name}`)
      setCountry(response.data[0])
    })()
  }, [name])

  return country
}

export default useCountry
