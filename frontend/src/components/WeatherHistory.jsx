"use client"

import { useState } from "react"
import axios from "axios"

const WeatherHistory = ({ city }) => {
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")



  const handleFetchHistory = async () => {
    if (!from || !to) {
      setError("Please select both from and to dates")
      return
    }

    const fromDate = `${from}T00:00:00.000+00:00`
    const toDate = `${to}T23:59:59.999+00:00`

    setLoading(true)
    setError("")

    try {
      const response = await axios.post("http://localhost:5000/graphql", {
        query: `
          query GetWeatherHistory($city: String!, $from: String!, $to: String!) {
            getWeatherHistory(city: $city, from: $from, to: $to) {
              id
              city
              temperature
              description
              icon
              timestamp
            }
          }
        `,
        variables: { city, from: fromDate, to: toDate },
      })

      setData(response.data.data.getWeatherHistory)
    } catch (err) {
      setError("Error fetching weather history")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-6 md:mt-14 max-w-3xl mx-auto">
     
      <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-4 mb-4">
        <h2 className="text-xl font-semibold mb-4 text-white">Weather History</h2>
        <div className="flex flex-col gap-4 mb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400"
              >
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
              </svg>
            </div>
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="pl-10 p-3 w-full bg-white bg-opacity-20 border-none rounded-xl text-white placeholder-gray-300 focus:ring-2 focus:ring-orange-300 focus:outline-none"
              placeholder="From date"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400"
              >
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
              </svg>
            </div>
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="pl-10 p-3 w-full bg-white bg-opacity-20 border-none rounded-xl text-white placeholder-gray-300 focus:ring-2 focus:ring-orange-300 focus:outline-none"
              placeholder="To date"
            />
          </div>

          <button
            onClick={handleFetchHistory}
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-3 rounded-xl transition-colors"
          >
            Fetch History
          </button>
        </div>

        {loading && <p className="text-white">Loading data...</p>}
        {error && <p className="text-red-300">{error}</p>}

        {data.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-white bg-opacity-10">
                <tr>
                  <th className="p-2 text-left text-white">Date</th>
                  <th className="p-2 text-left text-white">Temp</th>
                  <th className="p-2 text-left text-white">Weather</th>
                </tr>
              </thead>
              <tbody>
                {data.map((w) => (
                  <tr key={w.id} className="border-t border-white border-opacity-10">
                    <td className="p-2 text-white">{new Date(w.timestamp).toLocaleDateString()}</td>
                    <td className="p-2 text-white">{w.temperature}°C</td>
                    <td className="p-2 text-white">{w.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-white">No data found. Please try another range or city.</p>
        )}
      </div>
    </div>
  )
}

export default WeatherHistory
