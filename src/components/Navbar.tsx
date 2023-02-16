import React from "react";

export default function Navbar() {
  return (
    <div className="relative bg-white">
      <div className="mx-auto max-w-full px-6">
        <div className="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="#">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto sm:h-10"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
          </div>
          <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
            <p className="whitespace-nowrap text-base font-medium text-gray-9000 cursor:pointer">
              Username
            </p>
            <a
              href="#"
              className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Sign out
            </a>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden">
        <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="px-5 pt-5 pb-6">
            <div className="flex items-center justify-between">
              <div>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt="Your Company"
                />
              </div>
              <div className="-mr-2">
                <a
                  href="#"
                  className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Sign Out
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
