import React from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../compoments/TopBar";

import papers from "../assets/papers.png";
import student from "../assets/student.png";
import teacher from "../assets/teacher.png";
import subject from "../assets/subject.png";

const HomePage = () => {
  const navigate = useNavigate();

  const cards = [
    {
      img: student,
      title: "Students",
      subtitle: "Manage and view student details",
      to: "/student",
    },
    {
      img: papers,
      title: "Paper Report",
      subtitle: "Track paper performance and reports",
      to: "/paper",
    },
    {
      img: teacher,
      title: "Class Report",
      subtitle: "Monitor classes and teaching progress",
      to: "/class",
    },
    {
      img: subject,
      title: "Result",
      subtitle: "Review exam and subject results",
      to: "/result",
    },
  ];

  const Card = ({ img, title, subtitle, to }) => (
    <div
      onClick={() => navigate(to)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && navigate(to)}
      className="
        group cursor-pointer rounded-3xl border border-gray-200 bg-white
        p-8 shadow-sm transition-all duration-300
        hover:-translate-y-1 hover:shadow-xl hover:border-blue-200
        active:scale-[0.99] focus:outline-none
        min-h-[320px]
        flex items-center justify-center
      "
    >
      <div className="flex flex-col items-center justify-center text-center h-full w-full">
        {/* Image */}
        <div
          className="
            mb-6 flex h-32 w-32 items-center justify-center rounded-2xl
            bg-gradient-to-br from-blue-50 to-indigo-50
            ring-1 ring-gray-100 transition duration-300
            group-hover:scale-105
          "
        >
          <img
            src={img}
            alt={title}
            className="h-20 w-20 object-contain"
          />
        </div>

        {/* Title */}
        <h3 className="text-2xl font-semibold text-gray-900 tracking-wide">
          {title}
        </h3>

        {/* Subtitle */}
        <p className="mt-3 text-sm leading-6 text-gray-500 max-w-[240px]">
          {subtitle}
        </p>

        {/* Bottom line */}
        <div
          className="
            mt-6 h-1 w-14 rounded-full
            bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500
            transition-all duration-300 group-hover:w-20
          "
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <TopBar />

      <div className="px-4 py-8 md:px-8">
        <div className="mx-auto max-w-6xl min-h-[calc(100vh-120px)] flex items-center">
          {/* Cards Section */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4 w-full">
            {cards.map((card) => (
              <Card
                key={card.title}
                img={card.img}
                title={card.title}
                subtitle={card.subtitle}
                to={card.to}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;