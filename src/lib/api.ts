import axios from "axios";

// Direct env reference lets Next.js inline NEXT_PUBLIC_API_URL in client bundles.
const baseURL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1").replace(/\/+$/, "");

/** Shared Axios instance for Tallee backend API calls. */
export const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

