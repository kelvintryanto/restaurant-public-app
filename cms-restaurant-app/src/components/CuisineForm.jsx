import { useEffect, useState } from "react";
import axios from "axios";
import Button from "./Button";

export default function CuisineForm({ base_url, handleSubmit, nameProp, handleLoading, cuisine }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState("https://ik.imagekit.io/kelvintryanto/cuisine.jpg");

  async function fetchCategories() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${base_url}/category`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      setCategories(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (cuisine) {
      setName(cuisine.name);
      setDescription(cuisine.description);
      setPrice(cuisine.price);
      setCategoryId(cuisine.categoryId);
      setImgUrl(cuisine.imgUrl);
    }
  }, [cuisine]);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <div className="text-4xl mb-10">{nameProp}</div>
      {handleLoading ? (
        <>
          <form data-theme="light" className="flex bg-transparent w-full">
            <div className="flex flex-col space-y-5 bg-transparent w-2/5">
              <input type="text" className="skeleton input" />
              <input className="skeleton"></input>
              <input type="text" className="skeleton input" />
              <select className="skeleton select w-full"></select>
              <button className="skeleton btn rounded-md py-2 px-2 mt-8"></button>
            </div>
          </form>
        </>
      ) : (
        <>
          <form data-theme="light" className="flex bg-transparent w-full" onSubmit={(e) => handleSubmit(e, name, description, price, imgUrl, categoryId)}>
            <div className="flex flex-col space-y-5 bg-transparent w-2/5">
              <input type="text" placeholder="Name" className="input input-bordered input-success" value={name} onChange={(e) => setName(e.target.value)} />
              <textarea className="textarea textarea-success" placeholder="Background Story of this Cuisine" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
              <input
                type="number"
                placeholder="Price"
                className="input input-bordered input-success"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
              <select className="select select-success w-full" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                {loading ? (
                  <option className="loading loading-spinner">Loading</option>
                ) : (
                  <>
                    <option disabled value="">
                      select category
                    </option>
                    {categories.map((category) => {
                      return (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      );
                    })}
                  </>
                )}
              </select>
              <Button name={nameProp} />
            </div>
          </form>
        </>
      )}
    </>
  );
}
