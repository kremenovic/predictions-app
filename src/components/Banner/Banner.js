import React, { useEffect, useState } from "react";
import adImg from "../../assets/ad.jpg";
const Banner = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      console.log("we are being triggered :D");
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("transitionend", handler);
  }, []);
  const onClick = (evt) => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };
  return (
    <img
      src={adImg}
      alt="banner"
      className="rounded cursor-pointer"
      onClick={onClick}
    />
  );
};

export default Banner;
