import React from "react";
import OurPolicyItem from "./OurPolicyItem";
import { assets } from "../assets/assets";

const OurPolicy = () => {
  

  return (
    <div className="flex  flex-col  sm:flex-row justify-around gap-5 p-7 my-20 ">

      <OurPolicyItem
        image={assets.exchange_icon}
        text1="Unique Exam System"
        text2=" Realistic question patterns, smart topic selection, and a 3-type exam module following the standard admission system of Bangladesh."
      />

      <OurPolicyItem
        image={assets.quality_icon}
        text1="Best  Support"
        text2="We provide 24/7 Students support."
      />

      <OurPolicyItem
        image={assets.exchange_icon}
        text1="Complete Mentorship Support"
        text2="Personalized guidance, confusion-clear sessions, group support, and a mentor-backed study roadmap."
      />
       
       


    </div>
  );
};

export default OurPolicy;
