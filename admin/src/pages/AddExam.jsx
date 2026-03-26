import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// ------------------- Factory for Questions ----------------
const getInitialQuestion = () => ({
  id: Date.now() + Math.random(),
  text: "",
  options: [
    { id: Date.now() + Math.random(), text: "Option A", isCorrect: true },
    { id: Date.now() + Math.random(), text: "Option B", isCorrect: false },
  ],
  explanation: "",
});

// ------------------- Option Input ----------------
const OptionInput = React.memo(
  ({ option, questionIndex, updateQuestion, removeOption }) => (
    <div className="flex items-center gap-2 mb-2">
      <span className="w-6 font-semibold">{String.fromCharCode(65 + option.index)}.</span>
      <input
        type="text"
        value={option.text}
        onChange={(e) =>
          updateQuestion(questionIndex, option.index, e.target.value)
        }
        className="flex-1 p-2 border rounded"
        placeholder="Option text"
      />
      <input
        type="radio"
        name={`correct_${questionIndex}`}
        checked={option.isCorrect}
        onChange={() => updateQuestion(questionIndex, option.index, null, true)}
      />
      <button
        type="button"
        onClick={() => removeOption(questionIndex, option.index)}
        className="text-red-500 px-2"
      >
        ✕
      </button>
    </div>
  )
);

// ------------------- Question Block ----------------
const QuestionBlock = ({
  question,
  index,
  updateQuestion,
  addOption,
  removeOption,
  removeQuestion,
}) => (
  <div className="p-5 bg-white rounded shadow mb-6">
    <div className="flex justify-between mb-4">
      <h3 className="font-bold">Question {index + 1}</h3>
      <button
        type="button"
        onClick={() => removeQuestion(index)}
        className="text-red-500 text-sm"
      >
        Remove
      </button>
    </div>

    <input
      value={question.text}
      onChange={(e) => updateQuestion(index, "text", e.target.value)}
      placeholder="Question text"
      className="w-full p-2 border mb-3 rounded"
    />

    {question.options.map((opt, i) => (
      <OptionInput
        key={opt.id}
        option={{ ...opt, index: i }}
        questionIndex={index}
        updateQuestion={updateQuestion}
        removeOption={removeOption}
      />
    ))}

    <button
      type="button"
      onClick={() => addOption(index)}
      className="text-blue-600 text-sm mt-2"
    >
      + Add Option
    </button>

    <textarea
      value={question.explanation}
      onChange={(e) => updateQuestion(index, "explanation", e.target.value)}
      placeholder="Explanation (Optional)"
      className="w-full p-2 border mt-3 rounded"
      rows={2}
    />
  </div>
);

// ------------------- MAIN COMPONENT ----------------
export default function CreateExamForm() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [examDetails, setExamDetails] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
  });

  const [categories, setCategories] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [courses, setCourses] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  const [questions, setQuestions] = useState([getInitialQuestion()]);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);

  // ---------------- Image ----------------
  const [examImage, setExamImage] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) setExamImage(e.target.files[0]);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files?.[0]) setExamImage(e.dataTransfer.files[0]);
  };

  // ---------------- Fetch Categories & Courses ----------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const [catRes, courseRes] = await Promise.all([
          axios.get("http://localhost:5000/api/categories", { headers }),
          axios.get("http://localhost:5000/api/courses", { headers }),
        ]);

        const fetchedCats = catRes.data?.categories || [];
        const fetchedCourses = (courseRes.data?.courses || []).map((c) => ({
          ...c,
          categoryId: typeof c.category === "object" ? c.category?._id : c.category,
        }));

        setCategories(fetchedCats);
        setAllCourses(fetchedCourses);
        setCourses(fetchedCourses);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setDataLoading(false);
      }
    };
    fetchData();
  }, [token]);

  // ---------------- Filter Courses by Category ----------------
  useEffect(() => {
    if (!selectedCategory) {
      setCourses(allCourses);
      setSelectedCourse("");
    } else {
      const filtered = allCourses.filter(
        (c) => String(c.categoryId) === String(selectedCategory)
      );
      setCourses(filtered);
      setSelectedCourse(filtered.length ? filtered[0]._id : "");
    }
  }, [selectedCategory, allCourses]);

  // ---------------- Handlers ----------------
  const handleDetailChange = (e) =>
    setExamDetails({ ...examDetails, [e.target.name]: e.target.value });

  const addQuestion = () => setQuestions([...questions, getInitialQuestion()]);

  const removeQuestion = (i) =>
    setQuestions((prev) => (prev.length > 1 ? prev.filter((_, idx) => idx !== i) : prev));

  const addOption = (qIndex) =>
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === qIndex
          ? {
              ...q,
              options: [
                ...q.options,
                { id: Date.now() + Math.random(), text: "", isCorrect: false },
              ],
            }
          : q
      )
    );

  const removeOption = (qIndex, oIndex) =>
    setQuestions((prev) =>
      prev.map((q, i) => {
        if (i !== qIndex) return q;
        const newOpts = q.options.filter((_, idx) => idx !== oIndex);
        if (newOpts.length && !newOpts.some((o) => o.isCorrect)) newOpts[0].isCorrect = true;
        return { ...q, options: newOpts };
      })
    );

  const updateQuestion = useCallback(
    (qIndex, fieldOrOptIndex, value, isCorrect = false) => {
      setQuestions((prev) =>
        prev.map((q, i) => {
          if (i !== qIndex) return q;

          if (fieldOrOptIndex === "text" || fieldOrOptIndex === "explanation") {
            return { ...q, [fieldOrOptIndex]: value };
          }

          return {
            ...q,
            options: q.options.map((opt, oi) => {
              if (oi === fieldOrOptIndex) {
                if (value !== null) return { ...opt, text: value };
                if (isCorrect) return { ...opt, isCorrect: true };
              }
              if (isCorrect && oi !== fieldOrOptIndex) return { ...opt, isCorrect: false };
              return opt;
            }),
          };
        })
      );
    },
    []
  );

  // ---------------- Submit ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!examDetails.title.trim()) return alert("Exam title is required");

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.text.trim()) return alert(`Question ${i + 1} text is required`);
      if (!q.options.length) return alert(`Question ${i + 1} must have at least one option`);
      if (!q.options.some((o) => o.isCorrect))
        return alert(`Question ${i + 1} must have a correct option`);
      if (q.options.some((o) => !o.text.trim()))
        return alert(`All options in Question ${i + 1} must have text`);
    }

    const formData = new FormData();
    formData.append("title", examDetails.title);
    formData.append("description", examDetails.description);
    formData.append("date", examDetails.date);
    formData.append("time", examDetails.time);
    if (selectedCategory) formData.append("category", selectedCategory);
    if (selectedCourse) formData.append("course", selectedCourse);
    formData.append("questions", JSON.stringify(questions));
    if (examImage) formData.append("image", examImage);

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/exams", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      alert("✅ Exam created successfully");
      navigate("/exams");
    } catch (err) {
      alert(err.response?.data?.message || "Error creating exam");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- RENDER ----------------
  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Create Exam</h1>

      {dataLoading ? (
        <p>Loading categories and courses...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            name="title"
            value={examDetails.title}
            onChange={handleDetailChange}
            placeholder="Exam Title"
            className="w-full p-3 border rounded shadow-sm"
            required
          />

          <textarea
            name="description"
            value={examDetails.description}
            onChange={handleDetailChange}
            placeholder="Description"
            className="w-full p-3 border rounded shadow-sm"
          />

          {/* Category & Course */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Category (Optional)</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 border rounded bg-white shadow-sm"
              >
                <option value="">All Categories</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Course (Optional)</label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full p-3 border rounded bg-white shadow-sm"
              >
                <option value="">Select Course</option>
                {courses.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <input
              type="date"
              name="date"
              value={examDetails.date}
              onChange={handleDetailChange}
              className="w-full p-3 border rounded shadow-sm"
            />
            <input
              type="number"
              name="time"
              value={examDetails.time}
              onChange={handleDetailChange}
              placeholder="Duration (Minutes)"
              className="w-full p-3 border rounded shadow-sm"
            />
          </div>

          {/* Image Upload */}
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed p-6 text-center rounded-lg ${
              dragActive ? "border-blue-500" : "border-gray-300"
            }`}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <p>Drag & drop exam image or click to select</p>
            {examImage && (
              <img
                src={URL.createObjectURL(examImage)}
                alt="Preview"
                className="mt-2 max-h-40 mx-auto rounded"
              />
            )}
          </div>

          {/* Questions */}
          <div className="space-y-4 mt-6">
            <h2 className="text-xl font-semibold border-b pb-2">Questions</h2>
            {questions.map((q, i) => (
              <QuestionBlock
                key={q.id}
                question={q}
                index={i}
                updateQuestion={updateQuestion}
                addOption={addOption}
                removeOption={removeOption}
                removeQuestion={removeQuestion}
              />
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            <button
              type="button"
              onClick={addQuestion}
              className="flex-1 p-3 border-2 border-dashed border-blue-300 text-blue-600 font-bold rounded hover:bg-blue-50 transition"
            >
              + Add Another Question
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 p-3 bg-blue-600 text-white font-bold rounded shadow hover:bg-blue-700 transition"
            >
              {loading ? "Creating..." : "Create Exam"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}