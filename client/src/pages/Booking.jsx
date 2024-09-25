import React, { useState } from 'react';

const Booking = () => {
  const [formData, setFormData] = useState({ name: "", email: "", date: "", petDetails: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(""); // Add status state for feedback

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.date) newErrors.date = "Booking date is required";
    if (!formData.petDetails) newErrors.petDetails = "Pet details are required";
    if (!formData.message) newErrors.message = "Message is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Construct mailto link
      const subject = encodeURIComponent('Booking Form Submission');
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nDate: ${formData.date}\nPet Details: ${formData.petDetails}\nMessage: ${formData.message}`
      );
      window.location.href = `mailto:pethavenhotel@example.com?subject=${subject}&body=${body}`;

      // Optional: Reset form and status
      setFormData({ name: "", email: "", date: "", petDetails: "", message: "" });
      setStatus('Booking request and message sent successfully!');
    } else {
      setStatus('Failed to send booking request.');
    }
  };

  return (
    <section id="booking" className="py-16 px-4 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-4xl font-semibold mb-6 mt-16">
          Booking <span className="text-cyan-600">Request</span>
        </h3>
        <p className="text-gray-400 mt-6 text-lg">
          Book a stay for your pet
        </p>
        <form className="mt-10 max-w-lg mx-auto" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="bg-gray-700 p-3 w-full rounded-lg mb-2"
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}

          <input
            type="email"
            placeholder="Your Email Address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="bg-gray-700 p-3 w-full rounded-lg mb-2"
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}

          <input
            type="date"
            placeholder="Booking Date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="bg-gray-700 p-3 w-full rounded-lg mb-2"
          />
          {errors.date && <p className="text-red-500">{errors.date}</p>}

          <textarea
            placeholder="Pet Details (Name, Breed, Age, Special Instructions)"
            rows={3}
            value={formData.petDetails}
            onChange={(e) => setFormData({ ...formData, petDetails: e.target.value })}
            className="bg-gray-700 p-3 w-full rounded-lg mb-2"
          />
          {errors.petDetails && <p className="text-red-500">{errors.petDetails}</p>}

          <textarea
            placeholder="Additional Message (Optional)"
            rows={5}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="bg-gray-700 p-3 w-full rounded-lg mb-2"
          />
          {errors.message && <p className="text-red-500">{errors.message}</p>}

            <button 
            type="submit" 
            className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg mt-4">
            Submit Booking
            </button>
          {status && <p className="mt-3 text-green-500">{status}</p>}
        </form>
      </div>
    </section>
  );
};

export default Booking;