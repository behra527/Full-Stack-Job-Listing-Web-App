import React from "react";
import JobCard from "./JobCard";

function JobList({ jobs, onDelete, onEdit }) {
  if (!jobs.length) return <p className="text-gray-500">No jobs found.</p>;

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <JobCard 
          key={job.id} 
          job={job} 
          onDelete={onDelete} 
          onEdit={onEdit} 
        />
      ))}
    </div>
  );
}

export default JobList;
