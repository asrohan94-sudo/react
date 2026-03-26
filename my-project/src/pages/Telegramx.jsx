import React from "react";

const TelegramPanel = () => {
  // Define buttons in an array of objects
  const gridButtons = [
    { label: "গাইডলাইন", color: "blue", href: "https://t.me/MejbaVaiaGuideline" },
    { label: "এক্সাম", color: "blue", href: "https://t.me/LiveExamOfficial" },
    { label: "নোটস", color: "blue", href: "https://t.me/StudentNotes10" },
    { label: "প্র্যাকটিস", color: "green", href: "https://t.me/PollSolveXamly" },
  ];

  return (
    <div className="w-full flex flex-col items-center mt-10 space-y-4">
      
      {/* Join Telegram Button */}
      <a
        href="https://t.me/addlist/_XAqJE7EiDxmZmU1"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-red-600 text-white font-semibold px-10 py-2 rounded-lg shadow-md hover:bg-red-700 transition"
      >
        Join Telegram
      </a>

      {/* Grid Buttons */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
        {gridButtons.map((btn, index) => (
          <a
            key={index}
            href={btn.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`bg-${btn.color}-600 text-white px-8 py-2 rounded-lg shadow hover:bg-${btn.color}-700 transition text-center block`}
          >
            {btn.label}
          </a>
        ))}
      </div>

      {/* Full width bottom button */}
      <a
        href="https://t.me/SuccessReviewXamly"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 text-white w-full max-w-xs px-8 py-2 rounded-lg shadow hover:bg-blue-700 transition text-center block"
      >
        সাকসেস ও রিভিউ গ্রুপ
      </a>

    </div>
  );
};

export default TelegramPanel;
