export const truncateText = (text, maxLength = 60) => {
    if (!text) return "";

    return text.length > maxLength
        ? `${text.slice(0, maxLength)}...`
        : text;
};