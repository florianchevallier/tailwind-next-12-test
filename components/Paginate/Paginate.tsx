import dynamic from 'next/dynamic';
import React from 'react';
import { ReactPaginateProps } from 'react-paginate';
const ReactPaginate = dynamic(() => import("react-paginate"), { ssr: false });

interface IPaginateProps extends ReactPaginateProps { }

export default function Paginate(props: IPaginateProps) {
return (
  <ReactPaginate
    nextLabel={
      <div className="h-12 w-12 ml-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-chevron-right w-6 h-6"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </div>
    }
    previousLabel={
      <div className="h-12 w-12 mr-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-chevron-left w-6 h-6"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </div>
    }
    breakClassName="w-12 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full"
    activeClassName="bg-teal-600 text-white"
    pageClassName="w-12 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full"
    {...props}
    containerClassName={`flex h-12 font-medium rounded-full bg-gray-200 ${props.containerClassName}`}
  />
);
}
