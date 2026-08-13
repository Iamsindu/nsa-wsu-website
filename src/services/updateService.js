import request from "./api";

export async function getUpdates() {
    const response = await request("/updates");
    return response.data;
}

export async function getUpdateBySlug(slug) {
    const response = await request(`/updates/${slug}`);
    return response.data;
}