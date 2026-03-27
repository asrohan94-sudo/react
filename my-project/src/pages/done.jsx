import React, { useEffect, useState } from "react";
import axios from "axios";

const Done = () => {
  const [doneExams, setDoneExams] = useState([]);
  const [loading, setLoading] = useState(true);

  const backendUrl = "https://examly-ammh.onrender.com";

  useEffect(() => {
    const fetchDoneExams = async () => {
      try {
        // Example API: fetch exams user has completed
        const res = await axios.get(`${backendUrl}/api/exams/done`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        // Expected format: [{ examId, title, course: { name }, score, totalQuestions, submissionId }]
        setDoneExams(res.data.doneExams || []);
      } catch (error) {
        console.error("Error fetching done exams:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoneExams();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (doneExams.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-500">
        আপনি কোনো পরীক্ষা শেষ করেননি।
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">
        শেষ করা পরীক্ষাসমূহ
      </h1>

      <div className="space-y-4">
        {doneExams.map((exam, index) => (
          <div
            key={exam.examId || index}
            className="bg-white p-5 rounded-xl shadow border flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg font-semibold">{exam.title}</h2>
              <p className="text-sm text-gray-500">কোর্স: {exam.course.name}</p>
              <p className="text-sm text-gray-500">
                স্কোর: {exam.score} / {exam.totalQuestions}
              </p>
            </div>

            <div>
              <button
                onClick={() =>
                  window.location.assign(
                    `/exam-result/${exam.submissionId}`
                  )
                }
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
              >
                ফলাফল দেখুন
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Done;