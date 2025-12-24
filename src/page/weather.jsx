import { useState, useEffect } from 'react';

function Weather() {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://www.jma.go.jp/bosai/forecast/data/forecast/130000.json')
        // .then(res=>{
        //     if(!res.ok)
        // });
            .then(response => response.json())
            .then(data => setWeatherData(data));
    }, []);

    return (
        <>
            <h1>tennki</h1>
            {console.log(weatherData)}

        </>);
}
export default Weather;