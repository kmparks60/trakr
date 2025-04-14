import React from "react";
import { Link } from "react-router-dom";
import Test from "./Test";

function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-start pt-2 pb-0 px-4">
        <div className="w-full max-w-3xl my-16">
          <Test />
        </div>
      </div>
    </>
  );
}

export default Home;