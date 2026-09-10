export const truncateText = (text, maxLength = 60) => {
    if (!text) return "";

    return text.length > maxLength
        ? `${text.slice(0, maxLength)}...`
        : text;
};


// -----------------------------
// DATE FORMATTER
// -----------------------------

export const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString(
        "en-US",
        {
            year: "numeric",
            month: "long",
            day: "numeric",
        }
    );
};