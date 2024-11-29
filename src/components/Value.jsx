"use client";
import { useState, useEffect } from "react";
import NumberFlow from "@number-flow/react";

export default function Value({ className }) {
  const [usdToClp, setUsdToClp] = useState(null);
  const API_URL = "https://mindicador.cl/api/dolar";

  useEffect(() => {
    const fetchDollarValue = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setUsdToClp(data.serie[0]?.valor || null);
      } catch (error) {
        console.error("Error fetching USD to CLP data:", error);
      }
    };

    fetchDollarValue();

    const interval = setInterval(() => {
      fetchDollarValue();
    }, 600000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`bg-contenedor flex flex-col items-center justify-center h-full ${className}`}
    >
      <p className="text-secondary font-GeneralMedium text-[0.9rem]">
        valor de
      </p>
      <div className="flex items-center text-secondary font-GeneralSemibold text-[1.1rem]">
        <p>USD</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          className="mx-1"
          fill="none"
          viewBox="0 0 186 106"
        >
          <path
            fill="#3E3730"
            fillOpacity="0.78"
            d="M122.665.715h22.494l40.205 52.25-40.382 52.249h-22.317l31.881-40.737 1.063-1.417 1.062-1.417H.809V44.286h155.685a13 13 0 0 0-1.24-1.417q-.531-.885-1.239-1.771z"
          ></path>
        </svg>
        <p>CLP</p>
      </div>
      <NumberFlow
        className="text-primary font-Nohemi text-[7rem]"
        format={{ style: "currency", currency: "CLP", notation: "compact" }}
        value={usdToClp || "..."}
      />
    </div>
  );
}
