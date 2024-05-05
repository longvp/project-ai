import { BrainCircuit } from "lucide-react";
import React from "react";

interface AiResponseProps {
  children: React.ReactNode;
}

const AiResponse: React.FC<AiResponseProps> = ({ children }) => {
  return (
    <div className="p-4 pb-10 ml-20 mr-7 rounded-xl bg-secondary relative">
      {children}
      <div
        className="bg-sky-500 w-14 h-14 rounded-lg 
        flex justify-center items-center 
      absolute right-6 -bottom-6"
      >
        <BrainCircuit color="white" size={40} />
      </div>
    </div>
  );
};

export default AiResponse;
