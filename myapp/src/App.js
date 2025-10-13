import React, { useState, useEffect } from "react";
import JobList from "./components/JobList";
import JobForm from "./components/JobForm";
import FilterBar from "./components/FilterBar";
import { Loader2, Plus } from "lucide-react";

function App() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    keyword: "",
    location: "",
    tag: "",
    job_type: "",
    sort: "posting_date_desc",
  });
  const [editingJob, setEditingJob] = useState(null);
  const [showForm, setShowForm] = useState(false); // NEW — show/hide Add/Edit form
  const [scraping, setScraping] = useState(false);
  const [scrapeMessage, setScrapeMessage] = useState("");
  const [page, setPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);

  const pageSize = 15;

  //Fetch jobs with filters + pagination
  const fetchJobs = async () => {
    try {
      const query = new URLSearchParams({
        keyword: filters.keyword || "",
        location: filters.location || "",
        tag: filters.tag || "",
        job_type: filters.job_type || "",
        sort: filters.sort || "posting_date_desc",
        page,
        limit: pageSize,
      }).toString();

      const res = await fetch(`http://127.0.0.1:5000/api/jobs?${query}`);
      if (!res.ok) throw new Error("Failed to fetch jobs");
      const data = await res.json();

      setJobs(data.jobs || data);
      setTotalJobs(data.total || data.length);
    } catch (err) {
      console.error(" Fetch Error:", err);
    }
  };

  useEffect(() => setPage(1), [filters]);
  useEffect(() => {
    fetchJobs();
  }, [filters, page]);

  //Delete job
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      await fetch(`http://127.0.0.1:5000/api/jobs/${id}`, { method: "DELETE" });
      fetchJobs();
    }
  };

  //Edit job
  const handleEdit = (job) => {
    setEditingJob(job);
    setShowForm(true); // show form only on edit click
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  //Form submit (Add or Edit)
  const handleFormSubmit = () => {
    setEditingJob(null);
    setShowForm(false);
    fetchJobs();
  };

  //Scrape jobs
  const handleScrape = async () => {
    setScraping(true);
    setScrapeMessage("Scraping jobs, please wait...");
    try {
      const res = await fetch("http://127.0.0.1:5000/api/jobs/scrape", {
        method: "POST",
      });
      const data = await res.json();
      setScrapeMessage(data.message || "Scraping completed!");
      fetchJobs();
    } catch (error) {
      setScrapeMessage("Scraping failed. Check backend.");
      console.error(error);
    } finally {
      setScraping(false);
    }
  };

  //Open Add Job form
  const handleAddJob = () => {
    setEditingJob(null);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-gray-50 min-h-screen font-inter">
      {/*Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-extrabold text-green-700 tracking-tight">
            Actuary Finder
          </h1>

          <div className="flex items-center gap-3">
            <button
              onClick={handleAddJob}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold shadow transition"
            >
              <Plus className="w-4 h-4" /> Add Job
            </button>

            <button
              onClick={handleScrape}
              disabled={scraping}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg font-semibold shadow transition ${
                scraping
                  ? "bg-gray-300 text-gray-600"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {scraping && <Loader2 className="animate-spin w-4 h-4" />}
              {scraping ? "Scraping..." : "Scrape Jobs"}
            </button>
          </div>
        </div>
      </nav>

      {/*Hero Section */}
      <section
        className="relative bg-cover bg-center h-[75vh] flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative text-center text-white px-6">
          <h2 className="text-5xl font-extrabold mb-4 drop-shadow-md">
            Find Your Dream Actuary Job
          </h2>
          <p className="text-lg max-w-2xl mx-auto mb-6 text-gray-200">
            Discover actuarial opportunities across the globe. Filter jobs by
            country, tags, and salary to find the perfect role for you.
          </p>
          <a
            href="#jobs-section"
            className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-lg text-lg font-semibold shadow-lg transition"
          >
            Browse Jobs
          </a>
        </div>
      </section>

      {/*Main Layout */}
      <main
        id="jobs-section"
        className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-12 gap-8"
      >
        {/* Sidebar Filters */}
        <aside className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24 border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center gap-2">
              Filters
            </h2>
            <FilterBar filters={filters} setFilters={setFilters} />
          </div>
        </aside>

        {/* Job List Section */}
        <section className="lg:col-span-9 space-y-8">
          {/*Conditionally show Add/Edit form */}
          {showForm && (
            <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {editingJob ? "Edit Job" : "Add New Job"}
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-500 hover:text-red-600 font-medium"
                >
                  ✖ Close
                </button>
              </div>
              <JobForm job={editingJob} onSubmit={handleFormSubmit} />
            </div>
          )}

          {/*Job List */}
          <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
            <JobList jobs={jobs} onDelete={handleDelete} onEdit={handleEdit} />

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="bg-gray-200 px-4 py-2 rounded-lg text-gray-700 font-medium hover:bg-gray-300 disabled:opacity-50"
              >
                Back
              </button>
              <p className="text-gray-600 font-medium">
                Page {page} of {Math.ceil(totalJobs / pageSize) || 1}
              </p>
              <button
                onClick={() => setPage((prev) => prev + 1)}
                disabled={page * pageSize >= totalJobs}
                className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-green-700 text-white py-6 text-center">
        <p>
          © {new Date().getFullYear()} Actuary Finder. Designed & Developed by Muhammad Behram Hassan.
        </p>
      </footer>
    </div>
  );
}

export default App;
