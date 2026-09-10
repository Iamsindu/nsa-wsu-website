// const API_BASE_URL = "http://127.0.0.1:5050/api";
// const API_BASE_URL = "http://localhost:5050/api";
const API_BASE_URL =
    import.meta.env.VITE_API_URL ||
    "http://localhost:5050/api";

async function request(endpoint, options = {}) {
    const isFormData = options.body instanceof FormData;

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        credentials: "include",
        headers: {
            ...(isFormData
                ? {}
                : { "Content-Type": "application/json" }),
            ...options.headers,
        },
        ...options,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
    }

    return data;
}

export default request;