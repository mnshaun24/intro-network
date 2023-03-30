import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "hooks/useMediaQuery";

function NavBar() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreen = useMediaQuery("(min-width: 600px)");
  // const userName = `${user.firstName}`;

//  Make daisyui dropdown toggle correctly
const [isDropdownOpen, setIsDropdownOpen] = useState(false);
const dropMenu = useRef(null);
const dropMenuBtn = useRef(null);
useEffect(() => {
    if (!isDropdownOpen) {
        document.activeElement.blur();
    } else if (
        isDropdownOpen && !dropMenu.current.contains(document.activeElement)
    ) {
        setIsDropdownOpen(false);
    }
}, [isDropdownOpen])


  return (
    <>
      {isNonMobileScreen ? (
        <div className="navbar bg-base-100 cardBg">
          <div className="navbar-start">
            <div ref={dropMenu} className="dropdown">
              <label
              ref={dropMenuBtn}
                tabIndex={0}
                className="btn btn-ghost btn-circle"
                onBlur={(e) => {
                    setIsDropdownOpen(false);
                }}
                onClick={(e) => {
                    if (isDropdownOpen) {
                        setIsDropdownOpen(false);
                    } else {
                        setIsDropdownOpen(true);
                    }
                }}
                
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 cardBg"
                onBlur={(e) => {
                    dropMenuBtn.current.focus();
                }}
                onFocus={(e) => {
                    setIsDropdownOpen(true);
                }}
              >
                <li onClick={() => navigate("/home")}>
                  <a>Homepage</a>
                </li>
                <li onClick={() => navigate("/blogs")}>
                  <a>Blogs</a>
                </li>
                <li onClick={() => navigate("/feed")}>
                  <a>Feed</a>
                </li>
                <li onClick={() => navigate("/profile")}>
                  <a>My Profile</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="navbar-center">
            <a className="btn btn-ghost normal-case text-xl" onClick={() => navigate("/feed")}>
              User name will go here
            </a>
          </div>
          <div className="navbar-end">
            <button className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
            <button className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="badge badge-xs badge-primary indicator-item"></span>
              </div>
            </button>
          </div>
        </div>
      ) : (
        <div className="navbar bg-base-100">
          <div className="flex-1">
            <a className="btn btn-ghost normal-case text-xl">User name here</a>
          </div>
          <div className="flex-none">
            <button className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default NavBar;
