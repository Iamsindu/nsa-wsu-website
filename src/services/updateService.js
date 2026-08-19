import request from "./api";

// PUBLIC
export async function getUpdates() {
    const response = await request("/updates");
    return response.data;
}

export async function getUpdateBySlug(slug) {
    const response = await request(`/updates/${slug}`);
    return response.data;
}

// ADMIN
export function getAdminUpdates() {
    return request("/admin/updates", {
        method: "GET",
    });
}

export async function createUpdate(newsData) {
    const data = new FormData();

    Object.entries(newsData).forEach(([key, value]) => {
        if (value !== null) {
            data.append(key, value);
        }
    });

    return request("/admin/updates", {
        method: "POST",
        body: data,
    });
}