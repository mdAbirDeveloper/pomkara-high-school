/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";

export default function Gallery() {
  const [showAll, setShowAll] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { value: "events", label: "Events", icon: "🎉" },
    { value: "campus", label: "Campus", icon: "🏫" },
    { value: "activities", label: "Activities", icon: "🎨" },
    { value: "achievements", label: "Achievements", icon: "🏆" },
    { value: "sports", label: "Sports", icon: "⚽" },
  ];

  useEffect(() => {
    setLoading(true);
    const fetchGallery = async () => {
      try {
        const res = await fetch(
          `/api/gallery?category=${selectedCategory}&limit=${showAll ? 50 : 5}`
        );
        const data = await res.json();
        setGalleryItems(data || []);
      } catch (error) {
        console.error("Error loading gallery:", error);
        setGalleryItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, [selectedCategory, showAll]);

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            Photo <span className="text-blue-600">Gallery</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Explore the vibrant life at our school through our photo gallery showcasing events, activities, and memorable moments.
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <button
              onClick={() => setSelectedCategory("")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                selectedCategory === ""
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span>📸</span>
              <span>All Photos</span>
            </button>
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                  selectedCategory === category.value
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Loader */}
        {loading ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : galleryItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📸</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Photos Available</h3>
            <p className="text-gray-600">
              {selectedCategory
                ? `No photos found in ${selectedCategory} category. Check back later for updates.`
                : "No photos found. Check back later for updates."}
            </p>
          </div>
        ) : (
          <>
            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-12">
              {galleryItems.map((item, index) => (
                <div
                  key={item._id}
                  className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fadeInUp image-zoom cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setSelectedImage(item.imageUrl)}
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={item.imageUrl || "/api/placeholder/400/400"}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-white/80 text-xs line-clamp-2">
                          {item.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <span className="inline-block px-2 py-1 bg-blue-600 text-white rounded-full text-xs font-medium">
                          {categories.find((c) => c.value === item.category)?.icon}{" "}
                          {item.category}
                        </span>
                        <span className="text-white/80 text-xs">Click to view</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Show More Button */}
            {galleryItems.length >= 5 && (
              <div className="text-center animate-fadeInUp">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg btn-animate"
                >
                  {showAll ? "Show Less" : `See All Photos (${galleryItems.length}+)`}
                </button>
              </div>
            )}
          </>
        )}

        {/* Image Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50 animate-fadeIn"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl max-h-full">
              <img
                src={selectedImage}
                alt="Gallery Image"
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
