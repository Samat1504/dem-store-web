import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "../App.css";
import "./Pages.css";
import Loader from "./../components/loader/Loader";

function Category() {
  const [categoryData, setCategoryData] = useState();
  const [values, setValues] = useState();
  const [categoryValue, setCategoryValue] = useState();
  const [spinner, setSpinner] = useState(false);
  const [logout, setLogout] = useState(false);
  const [update, setUpdate] = useState(false);
  const [isCategoryId, setIsCategoryId] = useState("");

  const getCategory = () => {
    setSpinner(true);
    axios
      .get("https://demo-store19.herokuapp.com/api/demo-store/categories")
      .then((res) => {
        setSpinner(false);
        setCategoryData(res.data);
      })
      .catch((err) => {
        setSpinner(false);
        console.log(err);
      });
  };

  const header = {
    name: values,
  };

  const updates = {
    id: isCategoryId,
    newName: values,
  };

  const createCategory = () => {
    axios
      .post(
        `https://demo-store19.herokuapp.com/api/demo-store/categories`,
        header
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateCategory = () => {
    axios
      .put(
        `https://demo-store19.herokuapp.com/api/demo-store/categories`,
        updates
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeCategory = (id) => {
    axios
      .delete(
        `https://demo-store19.herokuapp.com/api/demo-store/categories?categoryId=${id}`
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCategory();
  }, []);

  function refreshPage() {
    setTimeout(() => {
      window.location.reload(false);
    }, 500);
    console.log("page to reload");
  }

  const logOut = () => {
    localStorage.removeItem("token");
    setLogout(true);
  };

  if (logout) {
    return <Navigate to="/login" />;
  }

  return (
    <section>
      <div className="wrapper">
        <nav>
          <Link className="active_tab">??????????????????</Link>
          <Link to="/products" className="tabs_btn">
            ????????????
          </Link>
          <Link to="/users" className="tabs_btn">
            ????????????????????????
          </Link>
          <Link to="/prices" className="tabs_btn">
            ????????
          </Link>
        </nav>
        <div className="main_page_block">
          <div className="search_content">
            {update ? (
              <div className="create">
                <input
                  type="text"
                  defaultValue={categoryValue}
                  onChange={(e) => {
                    setValues(e.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateCategory();
                    refreshPage();
                  }}
                >
                  ????????????????
                </button>
                <button
                  onClick={() => {
                    setUpdate(false);
                  }}
                >
                  ????????????
                </button>
              </div>
            ) : (
              <div className="create">
                <input
                  type="text"
                  defaultValue={values}
                  placeholder="?????????????? ????????????????"
                  onChange={(e) => {
                    setValues(e.target.value);
                  }}
                />
                <button
                  disabled={!values}
                  onClick={() => {
                    createCategory();
                    refreshPage();
                  }}
                >
                  ??????????????
                </button>
              </div>
            )}
            <button
              onClick={() => {
                logOut();
              }}
            >
              ??????????
            </button>
          </div>
          {spinner ? (
            <Loader />
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th className="table_name">????????????????</th>
                  <th className="table_products">??????????</th>
                  <th></th>
                </tr>
              </thead>
              {categoryData?.map((categories, i) => (
                <tbody key={i}>
                  <tr>
                    <td className="table_name">{categories.category_name}</td>
                    <td className="table_products">{categories.in_stock}</td>
                    <td>
                      <button
                        className="update_ntb"
                        onClick={() => {
                          setIsCategoryId(categories.id);
                          setCategoryValue(categories.category_name);
                          setUpdate(true);
                        }}
                      >
                        ????????????????
                      </button>
                      <button
                        className="delete"
                        onClick={() => {
                          removeCategory(categories.id);
                          refreshPage();
                        }}
                      >
                        ??????????????
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          )}
        </div>
      </div>
    </section>
  );
}

export default Category;
