/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import loadingSpinner from "../components/assets/loading-spinner.svg";

export default function MainCourse({ base_url }) {
  const [cuisines, setCuisines] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [categories, setCategories] = useState([]);
  const [sort, setSort] = useState("");
  const pagination = getPagination();

  function getPagination() {
    let temp = [];
    for (let i = 1; i <= totalPage; i++) {
      temp.push(i);
    }

    return temp;
  }

  async function fetchCuisine() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${base_url}/cuisines?limit=8&filter=${filter}&search=${search}&sort=${sort}&page=${currentPage}`);

      setCuisines(data.cuisines);
      setTotalPage(data.totalPage);
      setCurrentPage(data.currentPage);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function handlePrev() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function handleNext() {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  }

  async function fetchCategory() {
    try {
      const { data } = await axios.get(`${base_url}/categories`);

      setCategories(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCategory();
  });

  useEffect(() => {
    fetchCuisine();
  }, [filter, search, sort, currentPage]);

  return (
    <>
      <section id="main-course" className="py-4 bg-[#7c8a77] px-20 w-full h-full text-white">
        <div className="flex justify-center mb-6 text-4xl text-white">Main Course</div>

        {/* pagination button */}
        <div className="flex justify-center my-3">
          <div>
            <button className="hover:bg-yellow-800 px-2 py-1 flex-1 border-2 mx-10 rounded-md" onClick={handlePrev}>
              Prev
            </button>
          </div>
          <div>
            {pagination.map((el) => {
              return (
                <button key={el} className={el == currentPage ? "bg-yellow-800 px-2 py-1 flex-1 border-2 mx-2 rounded-md" : "px-2 py-1 flex-1 border-2 mx-2 rounded-md"} onClick={() => setCurrentPage(el)}>
                  {el}
                </button>
              );
            })}
          </div>
          <div>
            <button className="hover:bg-yellow-800 px-2 py-1 flex-1 border-2 mx-10 rounded-md" onClick={handleNext}>
              Next
            </button>
          </div>
        </div>

        {/* button filter */}
        <div className="flex gap-3 justify-between items-center">
          <div className="flex gap-4">
            Filter Category:
            {/* 1. search by name */}
            <select name="category" id="" className="rounded-md focus:shadow-md focus:shadow-orange-300 hover:shadow-md hover:shadow-orange-300 p-1 px-2 outline-none text-black" onChange={(e) => setFilter(e.target.value)}>
              <option value="">All</option>
              {/* {category=>} */}
              {categories.map((category, index) => {
                return (
                  <option key={category.id || index} value={category.id}>
                    {category.name}
                  </option>
                );
              })}
            </select>
          </div>
          <input type="text" className="outline-none rounded-md hover:shadow-md focus:shadow-md focus:shadow-orange-300 hover:shadow-orange-300 p-1 px-2 flex-1 text-black" placeholder="search by name" onChange={(e) => setSearch(e.target.value)} />
          <div className="flex gap-4">
            <div className="flex gap-2">
              <p>Order by:</p>
              <select name="category" id="" className="rounded-md focus:shadow-md focus:shadow-orange-300 hover:shadow-md hover:shadow-orange-300 p-1 px-2 outline-none text-black" onChange={(e) => setSort(e.target.value)}>
                <option value="">All</option>
                <option value="name">Cuisines A-Z</option>
                <option value="-name">Cuisines Z-A</option>
                <option value="price">Lowest Price</option>
                <option value="-price">Highest Price</option>
              </select>
            </div>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center">
            <img src={loadingSpinner} className="w-1/5" />
          </div>
        ) : (
          <>
            {/* card */}
            <div className="grid gap-5 grid-cols-4 grid-rows-2 p-3">
              {cuisines.map((cuisine, index) => {
                return <Card key={index} cuisine={cuisine} />;
              })}

              {/* pagination button */}
            </div>
          </>
        )}
        <div className="flex justify-center mt-10">
          <div>
            <button className="hover:bg-yellow-800 px-2 py-1 flex-1 border-2 mx-10 rounded-md" onClick={handlePrev}>
              Prev
            </button>
          </div>
          <div>
            {pagination.map((el) => {
              return (
                <button type="button" key={el} className={el == currentPage ? "bg-yellow-800 px-2 py-1 flex-1 border-2 mx-2 rounded-md" : "px-2 py-1 flex-1 border-2 mx-2 rounded-md"} onClick={() => setCurrentPage(el)}>
                  {el}
                </button>
              );
            })}
          </div>
          <div>
            <button className="hover:bg-yellow-800 px-2 py-1 flex-1 border-2 mx-10 rounded-md" onClick={handleNext}>
              Next
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
