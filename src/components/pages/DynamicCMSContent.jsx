import React, { useEffect, useState } from "react";
import CMSApi from "../../apis/cmsApi/cms.api";

const DynamicCMSContent = ({ slug, fallbackTitle = "" }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchContent = async () => {
      setLoading(true);
      setError(null);
      try {
        const cmsApi = new CMSApi();
        const response = await cmsApi.getContentBySlug(slug);
        
        const rawData = response?.data?.data || response?.data || response;
        let contentData = null;

        if (Array.isArray(rawData)) {
          contentData = rawData.find((item) => item.slug === slug) || rawData[0];
        } else if (rawData && typeof rawData === "object") {
          contentData = rawData;
        }

        if (isMounted) {
          if (contentData && (contentData.content || contentData.title)) {
            setData(contentData);
          } else {
            setError("Content not found");
          }
        }
      } catch (err) {
        if (isMounted) {
          console.error(`Failed to fetch CMS content for ${slug}:`, err);
          setError("Failed to load content. Please try again later.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (slug) {
      fetchContent();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center py-12">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 font-medium">Loading content...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center py-12 px-4 text-center">
        <div className="bg-red-50 text-red-600 p-6 rounded-2xl max-w-md w-full border border-red-100">
          <h3 className="text-xl font-semibold mb-2">Error Loading Content</h3>
          <p className="text-gray-600 mb-4">{error || "Unable to fetch content."}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-6 md:p-12 shadow-sm border border-gray-100 overflow-hidden">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 break-words">
            {data.title || fallbackTitle}
          </h1>

          {data.version && (
            <span className="inline-block bg-orange-100 text-orange-800 text-xs font-semibold px-2.5 py-0.5 rounded mb-6">
              Version: {data.version}
            </span>
          )}

          <div
            className="cms-content prose max-w-none text-gray-700 leading-relaxed break-words overflow-x-hidden"
            dangerouslySetInnerHTML={{ __html: data.content || "" }}
          />
        </div>
      </div>
    </div>
  );
};

export default DynamicCMSContent;
