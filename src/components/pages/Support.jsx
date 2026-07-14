import React, { useState } from "react";
import ContactApi from "../../apis/contactApi/contact.api";
import { toast } from "react-toastify";

const Support = () => {

  const contactApi = new ContactApi();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        subject: formData.subject,
        message: formData.message,
        name: formData.name,
        email: formData.email,
        phone: formData.number,
      };

      const response = await contactApi.submitFamilyForm(payload);

      if (response?.status === 200 || response?.success) {
        toast.success("Your request has been submitted successfully.");

        setFormData({
          name: "",
          email: "",
          number: "",
          subject: "",
          message: "",
        });
      } else {
        toast.error(response?.data?.message || "Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen py-16 px-5"
      style={{
        background:
          "linear-gradient(180deg,#fff7ed 0%,#ffffff 50%,#ecfdf5 100%)",
      }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <span className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Contact Support
          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-[#0A2A66] mb-4">
            We're Here to Help
          </h1>

          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            Have a question, concern, or need assistance? Fill out the form
            below and our support team will get back to you as soon as possible.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Name <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-[#138808] focus:border-transparent"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>

              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-[#138808] focus:border-transparent"
              />
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mobile Number{" "}
                <span className="text-gray-400">(Optional)</span>
              </label>

              <input
                type="tel"
                name="number"
                value={formData.number}
                onChange={handleChange}
                placeholder="Enter mobile number"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-[#138808] focus:border-transparent"
              />
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Subject <span className="text-red-500">*</span>
              </label>

              <select
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-[#138808] focus:border-transparent bg-white"
              >
                <option value="">Select Subject</option>

                <option>General Support</option>

                <option>Privacy / Account Deletion</option>

                <option>Fraud & Abuse Complaints</option>

                <option>Child Safety / CSAE</option>

                <option>Grievance Officer</option>

                <option>Security Incidents</option>

                <option>Delete My Account</option>

                <option>Others</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Message <span className="text-red-500">*</span>
              </label>

              <textarea
                name="message"
                required
                rows={6}
                value={formData.message}
                onChange={handleChange}
                placeholder="Describe your issue or query..."
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-[#138808] focus:border-transparent"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl text-white text-lg font-semibold transition hover:scale-[1.01]"
              style={{
                background:
                  "linear-gradient(135deg,#FF9933 0%, #138808 100%)",
              }}
            >
              {loading ? "Submitting..." : "Submit Request"}
            </button>
          </form>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-gray-600 text-sm">
          We usually respond within{" "}
          <span className="font-semibold text-[#138808]">
            24–48 business hours
          </span>
          .
        </div>
      </div>
    </div>
  );
};

export default Support;