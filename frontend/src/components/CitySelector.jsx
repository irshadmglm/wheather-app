"use client"

const CitySelector = ({ city, setCity }) => {
  const cities = ["California, Los Angeles", "Delhi", "Moscow", "Paris", "New York", "Sydney", "Riyadh"]

  return (
    <div className="relative mb-4">
      <div className="flex items-center justify-center">
        <div className="relative inline-block">
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="appearance-none bg-transparent text-center font-medium text-lg focus:outline-none cursor-pointer"
          >
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-orange-400">
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
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CitySelector
