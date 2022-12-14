import React, { useEffect, useRef, useState } from "react";
import drop from "./DropDown.module.css";
import arrow from "../../assets/arrow.svg";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setIsCategoryId } from "./../../store/reducer";

// PRODUCT CATEGORY

export function DropDown({ selected, setSelected, setClicked }) {
  const [isActive, setIsActive] = useState(false);
  const [category, setCategory] = useState();
  const [arrowRotate, setArrowRotate] = useState(false);

  const menuRef = useRef();

  const dispatch = useDispatch();

  const getCategory = () => {
    axios
      .get("https://demo-store19.herokuapp.com/api/demo-store/categories")
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCategory();
  }, []);

  const getCategoryById = () => {
    axios
      .get(
        `https://demo-store19.herokuapp.com/api/demo-store/products?categoryId=${selected}`
      )
      .then((res) => {
        dispatch(setIsCategoryId(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const rotateArrow = () => {
    setArrowRotate(!arrowRotate);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (isActive && menuRef.current && !menuRef.current.contains(e.target)) {
        setIsActive(false);
        rotateArrow();
        return;
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isActive]);

  return (
    <div className={drop.dropdown} ref={menuRef}>
      <div
        className={drop.dropdown_btn}
        onClick={(e) => {
          setIsActive(!isActive);
          rotateArrow();
        }}
      >
        {selected ? selected : <span>Категория</span>}
        <img
          src={arrow}
          className={`${drop.dropdown_icon} ${
            arrowRotate ? `${drop.dropdown_rotate}` : ""
          }`}
          alt=""
        />
      </div>
      {isActive && (
        <div
          className={
            isActive
              ? `${drop.dropdown_content} ${drop.drop_cont}`
              : `${drop.dropdown_content}`
          }
        >
          <div>
            {category?.map((option, i) => (
              <div
                key={i}
                onClick={(e) => {
                  setSelected(option.category_name);
                  setIsActive(false);
                  rotateArrow();
                }}
                className={drop.dropdown_item}
              >
                {option.category_name}
              </div>
            ))}
          </div>
        </div>
      )}
      <button
        disabled={!selected}
        onClick={() => {
          getCategoryById();
          setClicked(true)
        }}
      >
        Показать
      </button>
    </div>
  );
}

// PRODUCT MODAL CATEGORY

export function DropDownModal({ categoryName, setCategoryName }) {
  const [isActive, setIsActive] = useState(false);
  const [category, setCategory] = useState();
  const [arrowRotate, setArrowRotate] = useState(false);

  const menuRef = useRef();

  const getCategory = () => {
    axios
      .get("https://demo-store19.herokuapp.com/api/demo-store/categories")
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCategory();
  }, []);

  const rotateArrow = () => {
    setArrowRotate(!arrowRotate);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (isActive && menuRef.current && !menuRef.current.contains(e.target)) {
        setIsActive(false);
        rotateArrow();
        return;
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isActive]);

  return (
    <div className={drop.dropdown} ref={menuRef}>
      <div
        className={drop.dropdown_btn}
        onClick={(e) => {
          setIsActive(!isActive);
          rotateArrow();
        }}
      >
        {categoryName ? categoryName : <span>Категория</span>}
        <img
          src={arrow}
          className={`${drop.dropdown_icon} ${
            arrowRotate ? `${drop.dropdown_rotate}` : ""
          }`}
          alt=""
        />
      </div>
      {isActive && (
        <div
          className={
            isActive ? `${drop.dropdown_content}` : `${drop.dropdown_content}`
          }
        >
          <div>
            {category?.map((option, i) => (
              <div
                key={i}
                onClick={(e) => {
                  setCategoryName(option.category_name);
                  setIsActive(false);
                  rotateArrow();
                }}
                className={drop.dropdown_item}
              >
                {option.category_name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}





// PRODUCT UPDATE MODAL CATEGORY

export function UpdateDrop({ categoryName, setCategoryName }) {
  const [isActive, setIsActive] = useState(false);
  const [category, setCategory] = useState();
  const [arrowRotate, setArrowRotate] = useState(false);

  const menuRef = useRef();

  const iscategory = useSelector((state) => state.reducer.iscategory);

  const getCategory = () => {
    axios
      .get("https://demo-store19.herokuapp.com/api/demo-store/categories")
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCategory();
  }, []);

  const rotateArrow = () => {
    setArrowRotate(!arrowRotate);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (isActive && menuRef.current && !menuRef.current.contains(e.target)) {
        setIsActive(false);
        rotateArrow();
        return;
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isActive]);

  return (
    <div className={drop.dropdown} ref={menuRef}>
      <div
        className={drop.dropdown_btn}
        onClick={(e) => {
          setIsActive(!isActive);
          rotateArrow();
        }}
      >
        {categoryName ? categoryName : iscategory}
        <img
          src={arrow}
          className={`${drop.dropdown_icon} ${
            arrowRotate ? `${drop.dropdown_rotate}` : ""
          }`}
          alt=""
        />
      </div>
      {isActive && (
        <div
          className={
            isActive ? `${drop.dropdown_content}` : `${drop.dropdown_content}`
          }
        >
          <div>
            {category?.map((option, i) => (
              <div
                key={i}
                onClick={(e) => {
                  setCategoryName(option.category_name);
                  setIsActive(false);
                  rotateArrow();
                }}
                className={drop.dropdown_item}
              >
                {option.category_name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}



// USERS MODAL CREATE


export function UsersDropDown({ selected, setSelected }) {
  const [isActive, setIsActive] = useState(false);
  const [arrowRotate, setArrowRotate] = useState(false);

  const menuRef = useRef();

  const usersRole = [
    {
      role: "ADMIN"
    },
    {
      role: "PROVIDER"
    },
    {
      role: "CLIENT"
    }
  ]

  const rotateArrow = () => {
    setArrowRotate(!arrowRotate);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (isActive && menuRef.current && !menuRef.current.contains(e.target)) {
        setIsActive(false);
        rotateArrow();
        return;
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isActive]);

  return (
    <div className={drop.dropdown_role} ref={menuRef}>
      <div
        className={drop.dropdown_btn}
        onClick={(e) => {
          setIsActive(!isActive);
          rotateArrow();
        }}
      >
        {selected ? selected : <span>Категория</span>}
        <img
          src={arrow}
          className={`${drop.dropdown_icon} ${
            arrowRotate ? `${drop.dropdown_rotate}` : ""
          }`}
          alt=""
        />
      </div>
      {isActive && (
        <div
          className={
            isActive
              ? `${drop.dropdown_content}`
              : `${drop.dropdown_content}`
          }
        >
          <div>
            {usersRole?.map((option, i) => (
              <div
                key={i}
                onClick={(e) => {
                  setSelected(option.role);
                  setIsActive(false);
                  rotateArrow();
                }}
                className={drop.dropdown_item}
              >
                {option.role}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}