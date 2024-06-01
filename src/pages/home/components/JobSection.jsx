import JobCard from "@/components/shared/JobCard";
import { useEffect, useState } from "react";

const getJobs = async () => {
  const res = await fetch("http://localhost:8000/jobs", {
    method: "GET",
  });
  const jobs = await res.json();
  return jobs;
};

function JobSection() {
  const [jobs, setJobs] = useState([]);
  const [isJobsLoading, setIsJobsLoading] = useState(false);
  const [isJobsError, setIsJobsError] = useState(false);

  useEffect(() => {
    setIsJobsLoading(true);
    getJobs()
      .then((data) => {
        setJobs(data);
      })
      .catch((err) => {
        setIsJobsError(true);
      })
      .finally(() => {
        setIsJobsLoading(false);
      });
  }, []);

  if (isJobsLoading) {
    return (
      <section className="py-8">
        <h2>Available Jobs</h2>
        <div className="mt-4 flex flex-col gap-y-8">
          <p>Loading...</p>
        </div>
      </section>
    );
  }

  if (isJobsError) {
    return (
      <section className="py-8">
        <h2>Available Jobs</h2>
        <div className="mt-4 flex flex-col gap-y-8">
          <p>Error while fething data...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8">
      <h2>Available Jobs</h2>
      <div className="mt-4 flex flex-col gap-y-8">
        {jobs.map((job) => {
          return (
            <JobCard
              key={job._id}
              title={job.title}
              _id={job._id}
              type={job.type}
              location={job.location}
            />
          );
        })}
      </div>
    </section>
  );
}

export default JobSection;
