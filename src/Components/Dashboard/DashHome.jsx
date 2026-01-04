import React from "react";
import RangedStackedBarChart from "./ChartBar";
import PieChartWithNeedle from "./ChartBox-2";
import { NavLink } from "react-router";
import LiveTime from "./Livetime";

const DashHome = () => {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-2">
        <div className="card bg-neutral text-neutral-content w-auto">
          <div className="card-body items-center text-center text-black">
            <h2 className="card-title text-black">Active Challenges</h2>
            <p className="text-2xl">4</p>
            <div className="card-actions justify-end">
              <NavLink to="/" className="btn btn-primary">
                view
              </NavLink>
              <NavLink to="/" className="btn btn-ghost">
                Analyse
              </NavLink>
            </div>
          </div>
        </div>
        <div className="card bg-neutral text-neutral-content w-auto">
          <div className="card-body items-center text-center text-black">
            <h2 className="card-title ">Total Participants</h2>
            <p className="text-2xl">10</p>
            <div className="card-actions justify-end">
              <NavLink to="/" className="btn btn-primary">
                view
              </NavLink>
              <NavLink to="/" className="btn btn-ghost">
                Analyse
              </NavLink>
            </div>
          </div>
        </div>
        <div className="card bg-neutral text-neutral-content w-auto">
          <div className="card-body items-center text-center text-black">
            <h2 className="card-title">CO₂ Saved</h2>
            <p className="text-2xl">560 KG</p>
            <div className="card-actions justify-end">
              <NavLink to="/" className="btn btn-primary">
                view
              </NavLink>
              <NavLink to="/" className="btn btn-ghost">
                Analyse
              </NavLink>
            </div>
          </div>
        </div>
        <div className="card bg-neutral text-neutral-content w-auto">
          <div className="card-body items-center text-center text-black">
            <h2 className="card-title text-black">UpComing Challenges</h2>
            <p className="text-2xl">9</p>
            <div className="card-actions justify-end">
              <NavLink to="/" className="btn btn-primary">
                view
              </NavLink>
              <NavLink to="/" className="btn btn-ghost">
                Analyse
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 p-2 gap-2 ">
        <div className="col-span-2 h-70">
          <RangedStackedBarChart />
        </div>
        <div className="row-span-2 col-span-2">
          <div className="card bg-neutral text-neutral-content w-auto">
            <div className="card-body   text-black">
              <h2 className="card-title text-3xl text-black">
                Active Challenges
              </h2>
              <p className="text-2xl">1. Suscipit nulla accus</p>
              <p className="text-2xl">2. Eiusmod dolorem amet</p>
              <p className="text-2xl">3. Water-Saving Marathon</p>
              <p className="text-2xl">4. Water-Saving Marathon</p>
              <p className="text-2xl">5. Similique fugiat no UPDATE</p>
              <p className="text-2xl">6. Home Energy Optimization</p>
              <p className="text-2xl">7. Community Clean-Up</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">view All</button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-2">
          <PieChartWithNeedle />
          <div className="flex items-center gap-6 mt-4 justify-center">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
              <p>Complete</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
              <p>In-Progress</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <p>Pending</p>
            </div>
          </div>
        </div>
        {/* <div>
          <LiveTime />
        </div> */}
      </div>
    </>
  );
};

export default DashHome;
