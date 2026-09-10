import request from "./api";

// PUBLIC
export async function getEvents() {
    const response = await request("/events");
    return response.data;
}

export async function getEventsBySlug(slug) {
    const response = await request(`/events/${slug}`);
    return response.data;
}

// ADMIN
export async function getAdminEvents() {
    const response = await request("/admin/events", {
        method: "GET",
    });

    return response.data;
}

export async function getAdminEventById(id) {
    const response = await request(`/admin/events/${id}`, {
        method: "GET",
    });

    return response.data;
}

export async function createEvent(eventsData) {
    const data = new FormData();

    Object.entries(eventsData).forEach(([key, value]) => {
        if (value !== null) {
            data.append(key, value);
        }
    });

    return request("/admin/events", {
        method: "POST",
        body: data,
    });
}

export async function updateEvent(id, eventsData) {
    const data = new FormData();

    Object.entries(eventsData).forEach(([key, value]) => {
        if (value !== null) {
            data.append(key, value);
        }
    });

    return request(`/admin/events/${id}`, {
        method: "PUT",
        body: data,
    });
}

export function deleteEvent(id) {
    return request(`/admin/events/${id}`, {
        method: "DELETE",
    });
}