import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import loadingSpinner from "../components/assets/loading-spinner.svg";

export default function FoodDetail({ base_url }) {
  const { id } = useParams();
  const [cuisine, setCuisine] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchCuisine() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${base_url}/cuisines/${id}`);

      setCuisine(data.cuisine);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCuisine();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center bg-[#7c8a77] h-screen">
          <img src={loadingSpinner} className="w-1/5" />
        </div>
      ) : (
        <div className="w-100 p-5 bg-[#7c8a77] h-screen bg-cover aspect-auto " style={{ backgroundImage: 'url("./../src/components/assets/image/chef.jpg")' }}>
          <div className="flex w-screen justify-center">
            <div className="text-green-50 text-4xl px-20 py-2 justify-center bg-green-700 rounded-md bg-opacity-30">
              <span className="text-green-50">Detail</span>
            </div>
          </div>
          <div className="flex justify-center mt-16">
            <div className="bg-green-800 shadow-lg rounded-lg p-5 flex w-full">
              <div className="flex flex-1 border p-5 rounded-md">
                <div className="flex flex-col w-80 self-center text-center">
                  <img src={cuisine.imgUrl} alt="" className="w-64 h-64 object-cover aspect-square rounded-full" />
                  <div className="text-2xl text-green-50 mt-5">{cuisine.name}</div>
                  <div className="text-xl text-green-50">IDR {cuisine.price}</div>
                </div>
                <div className="flex flex-col pl-5 justify-between w-full">
                  <p className="text-lg text-green-50 mt-2">{cuisine.description}</p>

                  <Link to="/" className="mt-5 inline-block bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 self-end">
                    Back to Menu
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
