export const getPastTime = (createdAt) => {
    const createdDate = new Date(createdAt);
    const now = new Date();

    const diffInMilliseconds = now - createdDate;

    // Calculate time differences
    const seconds = Math.floor(diffInMilliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    return {
        years,
        months,
        days,
        hours,
        minutes,
        seconds,
    };
}

export const formatPastTime = (pastTime) => {
    const { years, months, days, hours, minutes, seconds } = pastTime;

    if (years > 0) return `${years} year(s)`;
    if (months > 0) return `${months} month(s)`;
    if (days > 0) return `${days} day(s)`;
    if (hours > 0) return `${hours} hour(s)`;
    if (minutes > 0) return `${minutes} minute(s)`;
    return `${seconds} seconds ago`;
}
// export const formatPastTime = (pastTime) => {
//     const { years, months, days, hours, minutes, seconds } = pastTime;

//     if (years > 0) return `${years} years, ${months % 12} months ago`;
//     if (months > 0) return `${months} months, ${days % 30} days ago`;
//     if (days > 0) return `${days} days, ${hours % 24} hours ago`;
//     if (hours > 0) return `${hours} hours, ${minutes % 60} minutes ago`;
//     if (minutes > 0) return `${minutes} minutes, ${seconds % 60} seconds ago`;
//     return `${seconds} seconds ago`;
// }


export function formatMessageTime(date) {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
}