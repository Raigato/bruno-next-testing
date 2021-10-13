import React, { useState } from "react";

export interface ICounterProps {
  description: string;
  defaultCount: number;
}

const Counter = ({ description, defaultCount }: ICounterProps) => {
  const [count, setCount] = useState(defaultCount);
  const [step, setStep] = useState(1);

  return (
    <div>
      <h2>
        DESC: {description} - DC: {defaultCount}
      </h2>
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
      <br />
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
  );
};

export default Counter;
