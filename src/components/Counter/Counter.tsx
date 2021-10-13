import React, { useEffect, useState } from "react";

export interface ICounterProps {
  description: string;
  defaultCount: number;
}

const Counter = ({ description, defaultCount }: ICounterProps) => {
  const [count, setCount] = useState(defaultCount);
  const [step, setStep] = useState(1);
  const [bigEnough, setBigEnough] = useState(defaultCount >= 15);

  useEffect(() => {
    let active = true;

    if (count >= 15) {
      setTimeout(() => {
        if (active) {
          setBigEnough(true);
        }
      }, 300);
    }

    return () => {
      active = false;
    };
  }, [count]);

  return (
    <div>
      <h2>
        DESC: {description} - DC: {defaultCount}
      </h2>
      <div>
        <label htmlFor="step">
          Step:{" "}
          <input
            type="number"
            name="step"
            id="step"
            value={step}
            onChange={(evt) => {
              setStep(parseInt(evt.target.value) || 1);
            }}
          />
        </label>
      </div>
      <div>
        <button
          aria-label="Decrement Counter"
          onClick={() => setCount(count - step)}
        >
          -
        </button>
        Current Count: {count}
        <button
          aria-label="Increment Counter"
          onClick={() => setTimeout(() => setCount(count + step), 200)}
        >
          +
        </button>
      </div>
      {!bigEnough && <div>I am too small</div>}
    </div>
  );
};

export default Counter;
