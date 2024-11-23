import React, { useEffect, useState } from "react";
import axios from "axios";

const HandleReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/super/admin/handle-reports",
          { withCredentials: true }
        );
        setReports(response.data);
      } catch (err) {
        setError("Failed to fetch reports");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleResolution = async (id, status) => {
    try {
      await axios.patch(
        `http://localhost:3000/api/super/admin/handle-reports/${id}`,
        { status },
        { withCredentials: true }
      );
      setReports((prevReports) =>
        prevReports.map((report) =>
          report._id === id ? { ...report, status } : report
        )
      );
    } catch (err) {
      alert("Failed to update the report. Please try again.");
    }
  };

  if (loading) return <div className="text-center text-lg font-semibold">Loading reports...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Handle Reports</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <div
            key={report._id}
            className={`p-4 shadow-lg rounded-lg ${
              report.status === "resolved" ? "bg-green-100" : "bg-white"
            }`}
          >
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Report ID: {report._id}</h2>
            <p>
              <strong>Reported By:</strong> {report.reportedBy?.name || "N/A"}
            </p>
            <p>
              <strong>Reported User:</strong> {report.reportedUser?.name || "N/A"}
            </p>
            <p>
              <strong>Content:</strong>{" "}
              {report.reportedContent?.title || "Content not available"}
            </p>
            <p>
              <strong>Reason:</strong> {report.reason || "No reason provided"}
            </p>
            <p>
              <strong>Status:</strong> <span className="capitalize">{report.status}</span>
            </p>
            {report.resolvedBy && (
              <p>
                <strong>Resolved By:</strong> {report.resolvedBy?.name || "N/A"}
              </p>
            )}
            <div className="mt-4 flex justify-between">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
                onClick={() => handleResolution(report._id, "resolved")}
                disabled={report.status === "resolved"}
              >
                Resolve
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:bg-gray-400"
                onClick={() => handleResolution(report._id, "reviewed")}
                disabled={report.status === "resolved"}
              >
                Review
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HandleReports;
