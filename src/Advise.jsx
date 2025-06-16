import React, { useState } from "react";
import "./Advise.css";

const Advise = () => {
  const [advice, setAdvice] = useState("");
  const [animationKey, setAnimationKey] = useState(0); // Key to trigger re-animation

  const fetchAdvice = async () => {
  try {
    const response = await fetch(`https://api.adviceslip.com/advice?timestamp=${new Date().getTime()}`);
    const data = await response.json();

    // Avoid setting the same advice twice
    if (data.slip.advice !== advice) {
      setAdvice("");
      setTimeout(() => {
        setAdvice(data.slip.advice);
        setAnimationKey(prevKey => prevKey + 1);
      }, 10);
    } else {
      fetchAdvice(); // Fetch again if the same advice is received
    }
    
    console.log(data);
  } catch (error) {
    setAdvice("Failed to fetch Advice.");
  }
};

  return (
    <div>
      <h1 className="advise">  Tip Tap🤝</h1>
      <button onClick={fetchAdvice} className="button">Get New Advice</button>
      <p className="para"><span key={animationKey}>{advice}</span></p>
    </div>
  );
};

export default Advise;
