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

export async function getAdminUpdateById(id) {
    const response = await request(`/admin/updates/${id}`);

    return response.data;
}

export async function updateUpdate(id, newsData) {
    const data = new FormData();

    Object.entries(newsData).forEach(([key, value]) => {
        if (value !== null) {
            data.append(key, value);
        }
    });

    return request(`/admin/updates/${id}`, {
        method: "PUT",
        body: data,
    });
}

export function deleteUpdate(id) {
    return request(`/admin/updates/${id}`, {
        method: "DELETE",
    });
}