import React from "react";
import { Link } from "react-router-dom";
import Test from "./Test";

function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-3xl">
          <Test />
        </div>
      </div>
    </>
  );
}

export default Home;