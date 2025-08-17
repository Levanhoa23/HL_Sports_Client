import Container from "./Container";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Dialog, DialogPanel } from "@headlessui/react";
import { logo } from "../assets/images";
import { HiOutlineMenu } from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";
import { useState } from "react";
import SearchInput from "./SearchInput";
import Title from "./ui/title";
import SocialLinks from "./SocialLinks";
import { IoMdCart } from "react-icons/io";
import { useSelector } from "react-redux";
import { FaUserAlt } from "react-icons/fa";
export const headerNavigation = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Shop",
    link: "/shop",
  },
  {
    title: "About",
    link: "/about",
  },
  {
    title: "Contact",
    link: "/contact",
  },
  {
    title: "Orders",
    link: "/orders",
  },
];

const Header = () => {
  const location = useLocation();
  const { products, userInfo, orderCount } = useSelector(
    (state) => state.orebiReducer
  );
  let [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sticky top-0 z-50 border-b border-gray-200 shadow-sm bg-white/95 backdrop-blur-sm">
      {" "}
      <Container className="flex items-center justify-between py-4 lg:py-6 gap-x-3 md:gap-x-7">
        <Link to={"/"} className="flex-shrink-0">
          <img src={logo} alt="logo" className="w-auto h-[80px]" />
        </Link>

        <SearchInput />

        <div className="items-center hidden gap-4 text-sm font-medium text-gray-700 uppercase md:inline-flex lg:gap-x-6">
          {headerNavigation.map((item) => (
            <NavLink
              key={item?.title}
              className={`hover:text-black duration-300 relative group overflow-hidden px-1 py-2 transition-colors ${
                location?.pathname === item?.link
                  ? "text-black font-semibold"
                  : "text-gray-700"
              }`}
              to={item?.link}
              state={{ data: location.pathname.split("/")[1] }}
            >
              <div className="relative flex items-center">
                {item?.title}
                {item?.title === "Orders" && userInfo && orderCount > 0 && (
                  <span className="absolute flex items-center justify-center w-4 h-4 text-xs font-medium text-white bg-red-500 rounded-full -right-1 -top-2 animate-pulse">
                    {orderCount}
                  </span>
                )}
              </div>
              <span
                className={`absolute bottom-0 left-0 inline-block w-full h-0.5 bg-black group-hover:translate-x-0 duration-300 ease-out ${
                  location?.pathname === item?.link
                    ? "translate-x-0"
                    : "-translate-x-full"
                }`}
              />
            </NavLink>
          ))}

          <Link
            to={"/cart"}
            className="relative p-2 text-2xl text-gray-700 transition-colors duration-300 hover:text-black"
          >
            <IoMdCart />
            {products?.length > 0 && (
              <span className="absolute flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-black rounded-full -right-1 -top-1 animate-pulse">
                {products.length}
              </span>
            )}
          </Link>

          {userInfo ? (
            <Link
              to={"/profile"}
              className="px-2 py-1 text-sm font-medium text-gray-700 transition-colors duration-300 rounded-md hover:text-black hover:bg-gray-50"
            >
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center bg-gray-200 rounded-full w-7 h-7">
                  <FaUserAlt className="text-xs text-gray-600" />
                </div>
                <span className="hidden lg:inline">{userInfo?.name}</span>
              </div>
            </Link>
          ) : (
            <Link
              to={"/signin"}
              className="relative p-2 text-xl text-gray-700 transition-colors duration-300 hover:text-black"
            >
              <FaUserAlt />
            </Link>
          )}
        </div>

        <button
          onClick={toggleMenu}
          className="p-2 text-2xl text-gray-700 transition-all duration-300 rounded-md hover:text-black md:hidden hover:bg-gray-50"
        >
          <HiOutlineMenu />
        </button>

        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative z-50 md:hidden"
        >
          <div className="fixed inset-0 transition-opacity duration-300 bg-black/50 backdrop-blur-sm" />
          <div className="fixed inset-0 flex items-start justify-center px-4 pt-16">
            <DialogPanel className="w-full max-w-md transition-all duration-300 ease-out transform bg-white shadow-2xl rounded-2xl">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <Title className="text-xl font-bold text-gray-900">
                    Menu
                  </Title>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-gray-400 transition-colors duration-200 rounded-full hover:text-gray-600 hover:bg-gray-50"
                  >
                    <IoCloseOutline className="text-2xl" />
                  </button>
                </div>

                <div className="space-y-1">
                  {headerNavigation?.map((item) => (
                    <NavLink
                      key={item?.title}
                      to={item?.link}
                      onClick={() => setIsOpen(false)}
                      state={{ data: location.pathname.split("/")[1] }}
                      className={`block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-black transition-all duration-200 transform hover:translate-x-1 ${
                        location?.pathname === item?.link
                          ? "bg-gray-100 text-black font-semibold"
                          : ""
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                              location?.pathname === item?.link
                                ? "bg-black"
                                : "bg-gray-300"
                            }`}
                          />
                          {item?.title}
                        </div>
                        {item?.title === "Orders" &&
                          userInfo &&
                          orderCount > 0 && (
                            <span className="px-2 py-1 text-xs text-white bg-red-500 rounded-full">
                              {orderCount}
                            </span>
                          )}
                      </div>
                    </NavLink>
                  ))}

                  <Link
                    to={"/cart"}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 text-gray-700 transition-all duration-200 transform rounded-lg hover:bg-gray-50 hover:text-black hover:translate-x-1"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-gray-300 rounded-full" />
                      <span>Cart</span>
                      {products?.length > 0 && (
                        <span className="px-2 py-1 ml-auto text-xs text-white bg-black rounded-full">
                          {products.length}
                        </span>
                      )}
                    </div>
                  </Link>

                  {userInfo ? (
                    <Link
                      to={"/profile"}
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 text-gray-700 transition-all duration-200 transform rounded-lg hover:bg-gray-50 hover:text-black hover:translate-x-1"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-gray-300 rounded-full" />
                        <span>Profile ({userInfo?.name})</span>
                      </div>
                    </Link>
                  ) : (
                    <Link
                      to={"/signin"}
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 text-gray-700 transition-all duration-200 transform rounded-lg hover:bg-gray-50 hover:text-black hover:translate-x-1"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-gray-300 rounded-full" />
                        Sign In
                      </div>
                    </Link>
                  )}
                </div>

                <div className="pt-6 mt-6 border-t border-gray-100">
                  <SocialLinks />
                </div>
              </div>
            </DialogPanel>{" "}
          </div>
        </Dialog>
      </Container>
    </div>
  );
};

export default Header;
