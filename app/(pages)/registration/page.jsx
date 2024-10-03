import React from "react";
import bg from "../../assets/bg.jpg";
import Image from "next/image";
import Link from "next/link";

function page() {
  return (
    <div
      className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(${bg.src})`,
      }}
    >
      <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
        <div className="text-white">
          <div className="mb-8 flex flex-col items-center">
            <h1 className="mb-2 text-2xl">ONLINE SHOP</h1>
            <span className="text-gray-300">Enter Sign Up Details</span>
          </div>
          <form action="#">
            <div className="mb-4 text-lg">
              <input
                className="rounded-lg border-none text-black bg-white opacity-100 px-6 py-2   placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                type="text"
                name="name"
                placeholder="username"
              />
            </div>

            <div className="mb-4 text-lg">
              <input
                className="rounded-lg border-none text-black bg-white opacity-100 px-6 py-2   placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                type="email"
                name="name"
                placeholder="john@email.com"
              />
            </div>

            <div className="mb-4 text-lg">
              <input
                className="rounded-lg border-none bg-white opacity-100 px-6 py-2  placeholder-slate-200 shadow-lg outline-none backdrop-blur-md text-black"
                type="Password"
                name="name"
                placeholder="Password"
              />
            </div>
            <div className="mt-4  text-lg text-black">
              <button
                type="submit"
                className="rounded-lg w-full bg-[#4d6c4d]  px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600"
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="text-center mt-4">
            Already have a account?
            <Link className="text-[#c9f89b] ml-1 " href={"/login"}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default page;
