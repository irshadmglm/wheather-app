const CurrentWeather = ({ weather }) => {
    if (!weather) return <p>Loading current weather...</p>
  
    const formattedDate = new Date(weather.timestamp).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  
    return (
      <div className="bg-orange-100 rounded-3xl p-6 shadow-md text-center max-w-sm mx-auto">
        <div className="flex justify-center mb-2">
          {weather.icon ? (
            <img src={`http://openweathermap.org/img/w/${weather.icon}.png`} alt="Weather icon" className="w-16 h-16" />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-orange-500"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="m4.93 4.93 1.41 1.41" />
              <path d="m17.66 17.66 1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="m6.34 17.66-1.41 1.41" />
              <path d="m19.07 4.93-1.41 1.41" />
            </svg>
          )}
        </div>
  
        <div className="flex items-center justify-center">
          <h1 className="text-8xl font-light text-orange-500">{Math.round(weather.temperature)}°</h1>
        </div>
  
        <p className="text-xl text-orange-500 font-medium mt-2">{weather.description || "Sunny"}</p>
  
        <p className="text-orange-400 mt-4">{weather.city}</p>
        <p className="text-orange-400 mt-1">{formattedDate}</p>
  
        <div className="flex justify-center gap-2 text-orange-400 mt-4">
          <span>Feels like {Math.round(weather.feelsLike || weather.temperature)}°</span>
          <span>•</span>
          <span>Sunset {weather.sunset || "18:20"}</span>
        </div>
      </div>
    )
  }
  
  export default CurrentWeather
  