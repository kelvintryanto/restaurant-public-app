import { Link } from "react-router-dom";
import { Button } from "./Button";

export default function Card({ cuisine }) {
  return (
    <>
      <div className="grid-row-1 hover:shadow-xl hover:shadow-orange-300 bg-green-800 border-2 border-gray-900 rounded-xl overflow-hidden">
        <div className="flex-col">
          <div className="min-h-36 flex justify-center">
            <img className="w-full aspect-[1/1] object-cover" src={cuisine.imgUrl} alt={cuisine.name} />
          </div>
          <div className="flex justify-between p-3">
            <p>{cuisine.name}</p>
            <p>{cuisine.price}</p>
          </div>
          <div className="p-3 flex justify-between">
            <p>{cuisine.description}</p>
          </div>
          <div className="p-3 flex justify-center">
            <Link to={`/detail/${cuisine.id}`} className="flex-1 flex">
              <Button name="Details" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
