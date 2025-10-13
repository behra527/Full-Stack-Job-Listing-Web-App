import React, { useState, useEffect } from "react";

function JobForm({ job, onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    company: "",
    country: "",
    locations: "",
    salary: "",
    tags: "",
    job_url: "",
    posted: "",
  });

  const [message, setMessage] = useState({ text: "", type: "" }); //  for alert messages

  useEffect(() => {
    if (job) setForm(job);
    else {
      setForm({
        title: "",
        company: "",
        country: "",
        locations: "",
        salary: "",
        tags: "",
        job_url: "",
        posted: "",
      });
    }
  }, [job]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.company || !form.job_url) {
      setMessage({ text: "Title, Company, and Job URL are required.", type: "error" });
      return;
    }

    const method = job ? "PATCH" : "POST";
    const url = job
      ? `http://127.0.0.1:5000/api/jobs/${job.id}`
      : "http://127.0.0.1:5000/api/jobs";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        onSubmit();
        setMessage({
          text: job
            ? "Job updated successfully!"
            : "Job added successfully!",
          type: "success",
        });

        // Clear message automatically
        setTimeout(() => setMessage({ text: "", type: "" }), 3000);
      } else {
        const err = await res.json();
        setMessage({
          text: " Error: " + (err.error || "Something went wrong."),
          type: "error",
        });
      }
    } catch (error) {
      console.error(" Fetch Error:", error);
      setMessage({
        text: " Network error. Check backend server.",
        type: "error",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 p-6 border rounded-lg shadow bg-white relative"
    >
      <h2 className="text-2xl font-bold mb-4">
        {job ? "Edit Job" : "Add New Job"}
      </h2>

     
      {message.text && (
        <div
          className={`mb-4 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            message.type === "success"
              ? "bg-green-100 text-green-800 border border-green-300"
              : "bg-red-100 text-red-800 border border-red-300"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={form.title}
          onChange={handleChange}
          className="border p-2 rounded focus:ring-2 focus:ring-green-400 outline-none"
        />
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={form.company}
          onChange={handleChange}
          className="border p-2 rounded focus:ring-2 focus:ring-green-400 outline-none"
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={form.country}
          onChange={handleChange}
          className="border p-2 rounded focus:ring-2 focus:ring-green-400 outline-none"
        />
        <input
          type="text"
          name="locations"
          placeholder="Locations"
          value={form.locations}
          onChange={handleChange}
          className="border p-2 rounded focus:ring-2 focus:ring-green-400 outline-none"
        />
        <input
          type="text"
          name="salary"
          placeholder="Salary"
          value={form.salary}
          onChange={handleChange}
          className="border p-2 rounded focus:ring-2 focus:ring-green-400 outline-none"
        />
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma-separated)"
          value={form.tags}
          onChange={handleChange}
          className="border p-2 rounded focus:ring-2 focus:ring-green-400 outline-none"
        />
        <input
          type="text"
          name="job_url"
          placeholder="Job URL"
          value={form.job_url}
          onChange={handleChange}
          className="border p-2 rounded focus:ring-2 focus:ring-green-400 outline-none"
        />
        <input
          type="text"
          name="posted"
          placeholder="Posted (e.g., 2d ago)"
          value={form.posted}
          onChange={handleChange}
          className="border p-2 rounded focus:ring-2 focus:ring-green-400 outline-none"
        />
      </div>

      <button
        type="submit"
        className="mt-5 bg-green-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
      >
        {job ? "Update Job" : "Add Job"}
      </button>
    </form>
  );
}

export default JobForm;
