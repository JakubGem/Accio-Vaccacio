import React, {useEffect, useState} from 'react';
import axios from "axios";
import NewsBox from "./newsBox/NewsBox";
import AirportDetails from "./airportDetails/AirportDetails";
import SearchingPlaceBar from "./searchingPlaceBar/SearchingPlaceBar";
import WeatherBox from "./weather/WeatherBox";
import EmergencyNumbers from "./emergencyNumbers/EmergencyNumbers";
import LivingCoasts from "./livingCosts/LivingCoasts";


const MainPage = (props) => {

    const [news, setNews] = useState([]);
    const [IATACode, setIATACode] = useState("WMI");
    const [weather, setWeather] = useState("");
    const [emergencyNumber, setEmergencyNumber] = useState("");
    const [livingCosts, setLivingCosts] = useState([]);

    const fetchLivingCosts = () => {
        axios.get(`http://localhost:8080/living-costs/${props.city}/${props.country}`)
            .then(res =>{setLivingCosts(res.data);
                console.log(res.data)})
            .catch(err => {console.log(err)});
    };

    const fetchNewsWorld = () => {
        axios.get(`http://localhost:8080/news/${props.city}`)
            .then(res =>{setNews(res.data);})
            .catch(err => {console.log(err)});
    };

    const fetchIATACode = () => {
        axios.get(`http://localhost:8080/airport/${props.city}`)
            .then(res =>{setIATACode(res.data.airportCode);})
            .catch(err => {console.log(err)});
    };

    const fetchWeather = () => {
        axios.get(`http://localhost:8080/weather/${props.city}`)
            .then(res =>{setWeather(res.data);})
            .catch(err => {console.log(err)});
    };

    const fetchEmergencyNumbers = () => {
        axios.get(`http://localhost:8080/emergency_numbers/${props.country}`)
            .then(res =>{setEmergencyNumber(res.data);})
            .catch(err => {console.log(err)});
    };

    useEffect(()=>{
        fetchNewsWorld();
        fetchIATACode();
        fetchWeather();
        fetchLivingCosts();
        fetchEmergencyNumbers()
    }, [])

    return (
        <div>
            <SearchingPlaceBar country={props.country} city={props.city}/>
            <div className="weather-box">
                <WeatherBox weather={weather}/>
                <EmergencyNumbers emergencyNumber={emergencyNumber}/>
            </div>
            <NewsBox news={news}/>
            <AirportDetails iata={IATACode}/>
            <LivingCoasts livingCosts={livingCosts} />
        </div>
    );
};

export default MainPage;