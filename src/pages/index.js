import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import axios from "axios";
import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdSearch,
} from "react-icons/io";

import {
  BsCloudHaze2Fill,
  BsWater,
  BsCloudDrizzleFill,
  BsEye,
  BsThermometer,
  BsWind,
} from "react-icons/bs";
import { TbTemperatureCelsius } from "react-icons/tb";
import { ImSpinner8 } from "react-icons/im";

const inter = Inter({ subsets: ["latin"] });

const ApiKey = process.env.NEXT_PUBLIC_API_KEY;

console.log(ApiKey);

export default function Home() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("Istanbul");
  const [inputValue, setInputValue] = useState("");

  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    if (inputValue !== "") {
      setLocation(inputValue);
    }

    const input = document.querySelector("input");

    if (input.value === "") {
      setAnimate(true);

      setTimeout(() => {
        setAnimate(false);
      }, 500);
    }

    input.value = "";

    e.preventDefault();
  };

  useEffect(() => {
    setLoading(true);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${ApiKey}`;
    axios
      .get(url)
      .then((res) => {
        setTimeout(() => {
          setLoading(false);
          setData(res.data);
        }, 1500);
      })
      .catch((err) => {
        setLoading(false);
        setErrorMsg(err);
      });
  }, [location]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg("");
    }, 2000);
    return () => clearTimeout(timer);
  }, [errorMsg]);

  if (!data) {
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center mainc">
          <div>
          <ImSpinner8 className="text-5xl animate-spin text-white" />
          </div>
      </div>
    );
  }
  let icon;

  switch (data.weather[0].main) {
    case "Clouds":
      icon = <IoMdCloudy />;
      break;

    case "Haze":
      icon = <BsCloudHaze2Fill />;
      break;
    case "Rain":
      icon = <IoMdRainy  className="text-[#31cafb]"/>;
      break;
    case "Clear":
      icon = <IoMdSunny className="text-[#ffde33]" />;
      break;
    case "Drizzle":
      icon = <BsCloudDrizzleFill className="text-[#31cafb]"/>;
      break;
    case "Snow":
      icon = <IoMdSnow className="text-[#31cafb]"/>;
      break;
    case "Thunderstorm":
      icon = <IoMdThunderstorm />;
      break;
  }

  const date = new Date();

  return (
    <div className="w-full h-screen bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-4 lg:px-0">
      {errorMsg && (
        <div className="w-full max-w-[90vw] lg:max-w-[450px] text-center bg-[#ff208c] text-white absolute top-2 lg:top-10 p-4 capitalize rounded-md">{`${errorMsg.response.data.message}`}</div>
      )}
      <form
        className={`${
          animate ? "animate-shake" : "animate-none"
        } h-16 bg-black/30 w-full max-w-md rounded-full backdrop-blur-[32px] mb-8`}
      >
        <div className="form-control w-screen h-full relative flex items-center justify-between p-2">
          <div className="input-group flex-1">
            <input
              type="text"
              onChange={(e) => handleInput(e)}
              placeholder="Enter your city…"
              className="input
                             focus:outline-0
                             placeholder:text-white
                             text-white text-[15px]
                             font-light pl-6 h-full
                             flex-1 bg-transparent border-none"
            />
            <button
              className="btn
                      hover:bg-transparent/20
                      hover:rounded-2xl
                      text-white
                      btn-square border-none bg-transparent"
              onClick={(e) => handleSubmit(e)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </form>
      <div className="w-full max-w-[450px] bg-black/20 min-h-[584px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6">
        {loading ? (
          <div className="w-full h-full bg-gradientBg flex justify-center items-center">
            <ImSpinner8 className="text-white text-5xl animate-spin " />
          </div>
        ) : (
          <div>
            {/* card top*/}
            <div className="flex items-center gap-x-5">
              {/* icon */}

              <div className="text-[87px]">{icon} </div>
              <div>
                {/* country name*/}

                <div className="text-2xl font-semibold">
                  {data.name}, {data.sys.country}
                </div>
                {/* date*/}

                <div>
                  {date.getUTCDate()}/{date.getUTCMonth() + 1}/
                  {date.getUTCFullYear()}
                </div>
              </div>
            </div>
            <div className="my-20">
              <div className="flex justify-center items-center">
                <div className="text-[144px] leading-none font-light">
                  {parseInt(data.main.temp)}
                </div>
                <div className="text-4xl">
                  <TbTemperatureCelsius />
                </div>
              </div>
              <div className="capitalize text-center">
                {data.weather[0].description}
              </div>
            </div>
            <div className="max-w-[378px] mx-auto flex flex-col gap-y-6">
              <div className="flex justify-between">
                <div className="flex items-center gap-x-2">
                  <div className="text-[20px]">
                    <BsEye />
                  </div>
                  <div>
                    Visibility{" "}
                    <span className="ml-2">{data.visibility / 1000} km</span>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  <div className="text-[20px]">
                    <BsThermometer />
                  </div>
                  <div className="flex">
                    Feels like{" "}
                    <div className="flex ml-2">
                      {parseInt(data.main.feels_like)}
                      <TbTemperatureCelsius />{" "}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-x-2">
                  <div className="text-[20px]">
                    <BsWater />
                  </div>
                  <div>
                    Humidity <span className="ml-2">{data.main.humidity} %</span>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  <div className="text-[20px]">
                    <BsWind />
                  </div>
                  <div>
                    Wind <span className="ml-2">{data.wind.speed} m/s</span>
                  </div>
                </div>
              </div>
            </div>{" "}
          </div>
        )}
      </div>
    </div>
  );
}
