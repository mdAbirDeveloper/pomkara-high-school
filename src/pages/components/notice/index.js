/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";

export default function Notices() {
  const [showAll, setShowAll] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState("");
  const [notices, setNotices] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchNotices = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/notices?priority=${selectedPriority}&limit=${showAll ? 50 : 5}`);
      const data = await res.json();
      setNotices(data);
    } catch (error) {
      console.error("Failed to fetch notices", error);
      setNotices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, [showAll, selectedPriority]);

  const priorities = [
    { value: "high", label: "High Priority", icon: "🔴" },
    { value: "medium", label: "Medium Priority", icon: "🟡" },
    { value: "low", label: "Low Priority", icon: "🟢" },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (timestamp) =>
    new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <section className="py-20 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">
            Latest <span className="text-blue-600">Notices</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest announcements, events, and important information from our school.
          </p>

          {/* Filter buttons */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <button
              onClick={() => setSelectedPriority("")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedPriority === ""
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 shadow"
              }`}
            >
              All Notices
            </button>
            {priorities.map((priority) => (
              <button
                key={priority.value}
                onClick={() => setSelectedPriority(priority.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedPriority === priority.value
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 shadow"
                }`}
              >
                {priority.label}
              </button>
            ))}
          </div>
        </div>

        {/* Loader */}
        {loading && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-gray-500">Loading Notices...</p>
          </div>
        )}

        {/* Notices */}
        {!loading && notices && notices.length > 0 && (
          <div className="space-y-6 mb-12">
            {notices.map((notice, index) => (
              <div
                key={notice._id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fadeInUp card-hover"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">
                        {priorities.find((p) => p.value === notice.priority)?.icon || "📢"}
                      </span>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-1">{notice.title}</h3>
                        <div className="flex items-center space-x-3">
                          <span
                            className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getPriorityColor(
                              notice.priority
                            )}`}
                          >
                            {notice.priority.charAt(0).toUpperCase() + notice.priority.slice(1)} Priority
                          </span>
                          <span className="text-sm text-gray-500">📅 {formatDate(notice.publishedAt)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{notice.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No notices */}
        {!loading && notices && notices.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📢</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Notices Available</h3>
            <p className="text-gray-600">
              {selectedPriority
                ? `No ${selectedPriority} priority notices found. Check back later.`
                : "No notices found. Check back later."}
            </p>
          </div>
        )}

        {/* Show more/less */}
        {!loading && notices && notices.length >= 5 && (
          <div className="text-center animate-fadeInUp">
            <button
              onClick={() => setShowAll(!showAll)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg btn-animate"
            >
              {showAll ? "Show Less" : `See All Notices (${notices.length}+)`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
