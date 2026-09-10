export function getCurrentDate() {
    const today = new Date();

    return {
        weekday: today.toLocaleDateString("en-US", {
            weekday: "long",
        }),
        date: today.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        }),
    };
}