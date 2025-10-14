import React from "react";
import ScratchCard from "react-scratchcard-v2";

const TicketScratchCard: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Ticket-shaped wrapper */}
      <div className="relative w-[156px] h-[212px]">
        {/* SVG ticket border */}
        <svg
          viewBox="0 0 156 212"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 left-0 w-full h-full"
        >
          <path
            d="
              M0,16
              a16,16 0 0,1 16,-16
              h124
              a16,16 0 0,1 16,16
              v68
              a16,16 0 1,0 0,32
              v68
              a16,16 0 0,1 -16,16
              h-124
              a16,16 0 0,1 -16,-16
              v-68
              a16,16 0 1,0 0,-32
              z
            "
            fill="#28BDA8"
          />
        </svg>

        {/* Scratch area */}
        <div className="absolute inset-0 flex items-center justify-center">
          <ScratchCard
            width={156}
            height={212}
            image="https://upload.wikimedia.org/wikipedia/commons/8/89/Solid_teal.svg"
            finishPercent={80}
            onComplete={() => console.log("complete")}
          >
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                backgroundColor: "white",
                borderRadius: "16px",
              }}
            >
              <h1 style={{ color: "#28BDA8", fontWeight: "bold" }}>
                Scratch card
              </h1>
            </div>
          </ScratchCard>
        </div>
      </div>
    </div>
  );
};

export default TicketScratchCard;
