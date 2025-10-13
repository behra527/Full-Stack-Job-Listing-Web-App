import React from "react";

function JobCard({ job, onDelete, onEdit }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white p-4 rounded-lg shadow hover:shadow-md transition">
      {/* Left: Logo + Job Info */}
      <div className="flex items-center space-x-4">
        {/* Company Logo Placeholder */}
        <div className="w-12 h-12 bg-gray-200 flex items-center justify-center rounded-full">
          <span className="text-lg font-bold text-gray-700">
            {job.company?.charAt(0) || "?"}
          </span>
        </div>

        {/* Job Info */}
        <div>
          <h2 className="font-bold text-lg text-blue-700">{job.title}</h2>
          <p className="text-gray-600 text-sm">
            {job.company && <span>{job.company}</span>}
            {job.country && <span> | {job.country}</span>}
            {job.locations && <span> | {job.locations}</span>}
            {job.job_type && <span> | {job.job_type}</span>}
          </p>

          {/* Salary */}
          {job.salary && (
            <p className="text-green-600 text-sm font-medium mt-1">
              💰 {job.salary}
            </p>
          )}

          {/* Posted Date */}
          {job.posted && (
            <p className="text-gray-400 text-xs mt-1">📅 {job.posted}</p>
          )}
        </div>
      </div>

      {/* Middle: Tags */}
      <div className="flex flex-wrap gap-2 my-3 sm:my-0 sm:mx-6">
        {job.tags &&
          job.tags
            .split(",")
            .filter((tag) => tag.trim() !== "")
            .map((tag, idx) => (
              <span
                key={idx}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium"
              >
                {tag.trim()}
              </span>
            ))}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onEdit(job)}
          className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500 text-sm"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(job.id)}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 text-white text-sm"
        >
          Delete
        </button>
        {job.job_url && (
          <a
            href={job.job_url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-blue-600 hover:underline text-sm"
          >
            View
          </a>
        )}
      </div>
    </div>
  );
}

export default JobCard;
