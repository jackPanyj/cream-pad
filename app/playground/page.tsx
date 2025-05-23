"use client";
import { simulate } from "@/utils/playground";
import { Button, FormControl, Input, Select } from "@chakra-ui/react";
import { useState } from "react";
import { useMount, useSetState } from "react-use";
import {
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ComposedChart,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar
} from "recharts";
import { whitepaper } from "../data/auctions";

const mapData = {
  undersold: {
    sim_range0: 0.7,
    sim_range1: 1.1
  },
  moderate: {
    sim_range0: 0.8,
    sim_range1: 1.2
  },
  oversold: {
    sim_range0: 0.9,
    sim_range1: 2
  }
};

export default function Page() {
  const [result, setResult] = useState([]);

  const [state, setState] = useSetState({
    total_supply: 100000,
    auction_percentage: 0.5,
    P0: 30, // starting price
    P_tmax: 10, // ending price
    T_max: 9, // number of Auction rounds
    decay_model: "exp", // decay model
    alpha: 2, // Boost score
    time_shift_max: 3, // max boost step
    // SIMULATE AUCTION SALES
    sim_range0: 0.8,
    sim_range1: 1.2,
    sale_type: "moderate"
  });

  const handleCalculate = () => {
    const ret = simulate(state);
    console.log("params:", state);

    const data = [];

    for (const item of ret) {
      if (item.Sales_Amount >= state.total_supply * state.auction_percentage) {
        data.push(item);
        break;
      }
      data.push(item);
    }

    setResult(data);
  };

  useMount(() => {
    handleCalculate();
  });

  return (
    <div className="py-5 bg-[#1f2935] text-white flex flex-col gap-5">
      <a
        href={whitepaper}
        target="_blank"
        className="flex justify-center py-2 text-center bg-green-500 sonic-title1 rounded"
      >
        Read The Paper Here
      </a>
      <div className="text-center bg-slate-600 rounded p-5 flex flex-col gap-2">
        <div className="sonic-title1">
          Cream Pad: Transforming Token Launches with Dutch Dual-Track Auctions
        </div>
        <p className="sonic-body3 text-left">
          Cream Pad is a cutting-edge asset launchpad on Sonic SVM, redefining
          token distribution with its Dutch Dual-Track Auction. This innovative
          mechanism merges a descending price curve with real-time market
          feedback, delivering fair, efficient, and transparent price discovery.
          Designed to prevent manipulation and adapt to market dynamics, Cream
          Pad's multi-round auction structure offers flexibility for token
          purchases, empowering both projects and investors. It's the future of
          market-driven token launches.
        </p>
      </div>

      <div className="bg-slate-600 rounded p-5 gap-5 flex flex-col">
        <p className="font-semibold sonic-title1">Input Parameter</p>
        <div className="grid grid-cols-2 gap-4">
          <FormControl className="flex flex-col gap-2">
            <p className="sonic-body3">Total Supply</p>
            <Input
              className="rounded-sm border-white/30"
              type="number"
              placeholder=""
              onChange={(e) =>
                setState({ total_supply: Number(e.target.value) })
              }
              value={state.total_supply}
            />
          </FormControl>
          <FormControl className="flex flex-col gap-2">
            <p className="sonic-body3">Auction Percentage</p>
            <Input
              className="rounded-sm border-white/30"
              placeholder=""
              type="number"
              value={state.auction_percentage}
              onChange={(e) =>
                setState({ auction_percentage: +e.target.value })
              }
            />
          </FormControl>
          <FormControl className="flex flex-col gap-2">
            <p className="sonic-body3">Starting Price</p>
            <Input
              className="rounded-sm border-white/30"
              placeholder=""
              type="number"
              onChange={(e) => setState({ P0: +e.target.value })}
              value={state.P0}
            />
          </FormControl>
          <FormControl className="flex flex-col gap-2">
            <p className="sonic-body3">Ending Price</p>
            <Input
              className="rounded-sm border-white/30"
              type="number"
              placeholder=""
              onChange={(e) => setState({ P_tmax: +e.target.value })}
              value={state.P_tmax}
            />
          </FormControl>
          <FormControl className="flex flex-col gap-2">
            <p className="sonic-body3">Number of Auction Rounds </p>
            <Input
              className="rounded-sm border-white/30"
              type="number"
              placeholder=""
              onChange={(e) => setState({ T_max: +e.target.value })}
              value={state.T_max}
            />
          </FormControl>

          <FormControl className="flex flex-col gap-2">
            <p className="sonic-body3">Auction Price Decay Model </p>
            <Select
              className="rounded-sm border-white/30"
              onChange={(e) => setState({ decay_model: e.target.value })}
              value={state.decay_model}
            >
              <option value="linear">linear</option>
              <option value="exp">exponential</option>
            </Select>
          </FormControl>
          <FormControl className="flex flex-col gap-2">
            <p className="sonic-body3">Boost Score </p>
            <Input
              className="rounded-sm border-white/30"
              type="number"
              onChange={(e) => setState({ alpha: +e.target.value })}
              value={state.alpha}
            />
          </FormControl>
          <FormControl className="flex flex-col gap-2">
            <p className="sonic-body3">Max Boost </p>
            <Input
              className="rounded-sm border-white/30"
              type="number"
              placeholder=""
              onChange={(e) => setState({ time_shift_max: +e.target.value })}
              value={state.time_shift_max}
            />
          </FormControl>
        </div>
      </div>

      <div className="bg-slate-600 rounded p-5 flex flex-col gap-5">
        <div className="sonic-title1">Simulate Auction Sales </div>

        <div className="flex flex-col gap-2">
          <FormControl className="flex flex-col gap-2">
            <p className="sonic-body3">Auction Scenarios </p>
            <Select
              className="rounded-sm border-white/30"
              value={state.sale_type}
              onChange={(e) => {
                const sale_type = e.target.value;
                setState({
                  sale_type,
                  ...mapData[sale_type]
                });
              }}
            >
              <option value="undersold">undersold</option>
              <option value="moderate">moderate</option>
              <option value="oversold">oversold</option>
              <option value="user_defined">user defined</option>
            </Select>
          </FormControl>

          <div className="grid grid-cols-2 gap-2">
            <FormControl className="flex flex-col gap-2">
              <p className="sonic-body3">lower Bound </p>
              <Input
                className="rounded-sm border-white/30"
                type="number"
                isDisabled={state.sale_type !== "user_defined"}
                onChange={(e) => setState({ sim_range0: +e.target.value })}
                value={state.sim_range0}
              />
            </FormControl>

            <FormControl className="flex flex-col gap-2">
              <p className="sonic-body3">Upper Bound </p>
              <Input
                className="rounded-sm border-white/30"
                type="number"
                isDisabled={state.sale_type !== "user_defined"}
                onChange={(e) => setState({ sim_range1: +e.target.value })}
                value={state.sim_range1}
              />
            </FormControl>
          </div>
        </div>
      </div>

      <div className="bg-slate-600 rounded p-5 flex flex-col gap-4">
        <div className="flex flex-col gap-2 sonic-title3">
          <p>Supply Details</p>
          <p>Initial FDV: {Math.floor(state.total_supply * state.P0)}</p>
          <p>
            Optimal Final FDV:{" "}
            {Math.round(result.at(-1)?.Actual_Price * state.total_supply)}{" "}
          </p>
          <p>
            Minimal Final FDV: {Math.floor(state.total_supply * state.P_tmax)}
          </p>
          <p>
            Max $Sonic Secured :{" "}
            {Math.floor(
              result.at(-1)?.Actual_Price *
                state.total_supply *
                state.auction_percentage
            )}
          </p>
          <p>
            $Sonic Secured Simulation :{" "}
            {Math.floor(
              result.reduce(
                (acc, item) => acc + item.Sales_Amount * item.Actual_Price,
                0
              )
            )}
          </p>
        </div>
        <Button
          className="font-manrope"
          colorScheme={"green"}
          onClick={handleCalculate}
        >
          Calculate
        </Button>
      </div>

      <div className="bg-slate-600 rounded p-5 flex flex-col h-[400px]">
        <p className="text-center sonic-title1 mb-1">
          Sales Performance vs Price Dynamics
        </p>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            width={800}
            height={400}
            data={result}
            className="mx-auto"
          >
            <CartesianGrid stroke="white" opacity={0.2} />
            <XAxis dataKey="Auction_Round" stroke="#f5f5f5" />
            <YAxis yAxisId="left" orientation="left" stroke="#ff7300" />
            <YAxis yAxisId="right" orientation="right" stroke="#2ca02c" />
            <Tooltip />
            <Legend />
            <Bar
              yAxisId="right"
              dataKey="Sales_Ratio"
              barSize={20}
              fill="#2ca02c"
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="Actual_Price"
              stroke="#ff7300"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-slate-600 rounded p-5 flex flex-col h-[400px]">
        <p className="text-center sonic-title1 mb-1">
          Price Dynamics and Boost Effects
        </p>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            width={800}
            height={400}
            data={result}
            className="mx-auto"
          >
            <CartesianGrid stroke="white" opacity={0.2} />
            <XAxis dataKey="Auction_Round" stroke="#f5f5f5" />

            <YAxis yAxisId="left" orientation="left" stroke="#22c55e" />
            <YAxis yAxisId="right" orientation="right" stroke="#ff7300" />
            <Tooltip />
            <Legend />
            <Bar
              yAxisId="right"
              dataKey="Boost_Factor"
              barSize={20}
              fill="#17becf"
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="Actual_Price"
              stroke="#ff7300"
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="Theoretical_Price"
              stroke="#e53e3e"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-slate-600 rounded p-5 flex flex-col">
        <div className="grid grid-cols-6 sonic-title3 pb-1">
          <div>Auction Round </div>
          <div>Theoretical Price </div>
          <div>Sales Ratio </div>
          <div>Sales Amount </div>
          <div>Boost Factor </div>
          <div>Actual Price</div>
        </div>

        {result.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-6 sonic-body3 py-2 border-b border-white/20"
          >
            <div>{item.Auction_Round} </div>
            <div>{item.Theoretical_Price} </div>
            <div>{(item.Sales_Ratio * 100).toFixed(0) + "%"} </div>
            <div>{item.Sales_Amount} </div>
            <div>{item.Boost_Factor} </div>
            <div>{item.Actual_Price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
