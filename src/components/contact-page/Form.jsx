import { useState } from "react";

const inputStyles = `focus border border-gray-100 px-4 py-2`;

function Form({ accessKey }) {
  const [status, setStatus] = useState({
    type: "idle",
    message: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status.type === "loading") return;

    if (!accessKey) {
      setStatus({
        type: "error",
        message: "Missing Web3Forms access key.",
      });
      return;
    }

    setStatus({
      type: "loading",
      message: "Sending...",
    });

    try {
      const formData = new FormData(event.target);
      formData.append("access_key", accessKey);

      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Something went wrong. Try again.");
      }

      setStatus({
        type: "success",
        message: "Thanks! We will get back to you soon.",
      });
      event.target.reset();
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message,
      });
    }
  };

  return (
    <form className="bg-gray-50 px-5 py-8" onSubmit={handleSubmit}>
      <h4 className="relative mb-4 mt-6 pb-2 text-2xl font-bold capitalize before:absolute before:bottom-0 before:h-1 before:w-16 before:bg-red">
        Contact us
      </h4>
      <div className="flex flex-col gap-4">
        <input type="text" name="name" placeholder="Full Name*" className={inputStyles} required />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number*"
          className={inputStyles}
          required
        />
        <textarea
          name="comment"
          placeholder="Comment*"
          className={`${inputStyles} h-32 max-h-44`}
          required
        />
        <button
          className="self-center bg-red px-8 py-4 font-semibold uppercase text-white disabled:cursor-not-allowed disabled:opacity-70"
          type="submit"
          disabled={status.type === "loading"}
        >
          {status.type === "loading" ? "Sending..." : "Submit now"}
        </button>
        {status.message ? (
          <p
            className={`text-center text-sm ${
              status.type === "error" ? "text-red" : "text-gray-400"
            }`}
          >
            {status.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}

export default Form;
