import request from "./api";

export async function login(email, password) {
    const response = await request("/auth/login", {
        method: "POST",
        body: JSON.stringify({
            email,
            password,
        }),
    });

    return response;
}

export async function getCurrentAdmin() {
    const response = await request("/auth/me", {
        method: "GET",
    });

    return response;
}

export async function logout() {
    const response = await request("/auth/logout", {
        method: "POST",
    });

    return response;
}