
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const backendUrl = "http://localhost:5000";

const ExamSubmissions = () => {
  const { examId } = useParams();
  const [results, setResults] = useState([]);

  const fetchSubmissions = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/exams/${examId}/submissions`);
      if (res.data.success) setResults(res.data.results);
    } catch (err) {
      console.error("Fetch submissions error:", err);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [examId]);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">Exam Submissions</h1>

      {results.length === 0 ? (
        <p>No submissions found.</p>
      ) : (
        <table className="min-w-full bg-white rounded shadow">
          <thead className="bg-gray-100">
            <tr className="text-center">
              <th className="py-2 px-4 border">#</th>
              <th className="py-2 px-4 border">Student Name</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Score</th>
              <th className="py-2 px-4 border">Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, idx) => (
              <tr key={r.submissionId} className="text-center">
                <td className="py-2 px-4 border">{idx + 1}</td>
                <td className="py-2 px-4 border">{r.studentName}</td>
                <td className="py-2 px-4 border">{r.studentEmail}</td>
                <td className="py-2 px-4 border">{r.score}</td>
                <td className="py-2 px-4 border">
                  {new Date(r.submittedAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExamSubmissions;