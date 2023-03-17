import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import { FaLongArrowAltLeft, FaRegClock } from "react-icons/fa";
import { GiSoccerField, GiWhistle } from "react-icons/gi";
const SinglePrediction = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://v3.football.api-sports.io/predictions?fixture=${id}`,
          {
            headers: {
              "x-rapidapi-key": "af40d37b524e0e1b5bd6aba34f37dd40",
              "x-rapidapi-host": "v3.football.api-sports.io",
            },
          }
        );
        const data = res.data.response;
        localStorage.setItem(`footballDataSingle-${id}`, JSON.stringify(data));
        setLoading(false);
        return data;
      } catch (error) {
        console.log(error);
        return null;
      }
    };
    const storedData = localStorage.getItem(`footballDataSingle-${id}`);
    if (storedData) {
      setData(JSON.parse(storedData));
      console.log("ls");
    } else {
      fetch().then((data) => setData(data));
      console.log("fetch");
    }
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="main-section p-5 ">
      <div className="flex justify-between border-b custom-border pb-4">
        <div className="custom-gray font-semibold ">
          <Link to="/dashboard/" className="flex items-center">
            <FaLongArrowAltLeft className="mr-2" /> Back
          </Link>
        </div>
        <div className="flex items-center">
          <img
            src={data?.[0]?.league.logo}
            alt={data?.[0]?.league.name}
            className="w-6 mr-2 lg:w-8 bg-white rounded-full"
          />
          <div className="flex flex-col">
            <h4 className="text-white text-base w-max lg:text-lg">
              {data?.[0]?.league.name}
              <sup className="custom-gray text-xs capitalize">
                {data?.[0]?.league.country}
              </sup>
            </h4>
          </div>
        </div>
        <div className="placeBet">Place bet</div>
      </div>
      {console.log(data?.[0])}
      <div className="flex flex-col pt-4 pb-4 border-b custom-border">
        <div className="text-center grid grid-cols-3 justify-items-center items-center max-w-8xl w-full mx-auto mb-16">
          <div className="flex items-center custom-gray">
            <FaLongArrowAltLeft className="mr-2" />
            <p>2022-06-12 - 21:30</p>
          </div>
          <div className="flex items-center custom-gray">
            <GiSoccerField className="mr-2" />
            <p>Anfield Stadium, Liverpool</p>
          </div>
          <div className="flex items-center custom-gray">
            <GiWhistle className="mr-2" />
            <p>Joseph Hicks</p>
          </div>
        </div>
        <div className="test-team grid grid-cols-3 justify-items-center items-center max-w-8xl w-full mx-auto ">
          <div className="text-center">
            <img
              src={data?.[0].teams.home.logo}
              alt={data?.[0].teams.home.name}
              className="w-28 text-center mx-auto"
            />
            <h2 className="text-white text-xl mt-2">
              {data?.[0].teams.home.name}
            </h2>
          </div>
          <div className="versus text-center w-fit">
            <p className="text-white text-base">VS</p>
          </div>
          <div className="text-center">
            <img
              src={data?.[0].teams.away.logo}
              alt={data?.[0].teams.away.name}
              className="w-28 text-center mx-auto"
            />
            <h2 className="text-white text-xl mt-2">
              {data?.[0].teams.away.name}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePrediction;
