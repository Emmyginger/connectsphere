import React from 'react';
import Sidebar from '../components/Sidebar';

// Static job data
const jobListings = [
  { id: 1, title: 'Frontend Developer', company: 'Google', location: 'Mountain View, CA' },
  { id: 2, title: 'Backend Engineer', company: 'Meta', location: 'Menlo Park, CA' },
  { id: 3, title: 'Full-Stack Developer', company: 'Amazon', location: 'Seattle, WA' },
  { id: 4, title: 'UI/UX Designer', company: 'Apple', location: 'Cupertino, CA' },
  { id: 5, title: 'DevOps Engineer', company: 'Netflix', location: 'Los Gatos, CA' },
  { id: 6, title: 'Product Manager', company: 'Microsoft', location: 'Redmond, WA' },
];

function Jobs({ user, onApply }) {
  return (
    <>
      <Sidebar user={user} />
      <div className="jobsPage">
        <h1>Job Listings</h1>
        <div className="jobList">
          {jobListings.map(job => {
            const hasApplied = user.appliedJobs.includes(job.id);
            return (
              <div key={job.id} className="jobCard">
                <div className="jobCard__info">
                  <h2>{job.title}</h2>
                  <p>{job.company} - {job.location}</p>
                </div>
                <button
                  onClick={() => !hasApplied && onApply(job.id)}
                  className={`jobCard__apply-btn ${hasApplied ? 'jobCard__apply-btn--applied' : ''}`}
                  disabled={hasApplied}
                >
                  {hasApplied ? 'Applied ✔' : 'Apply'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Jobs;