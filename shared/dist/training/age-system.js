"use strict";
/**
 * Age System - Helper Functions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAgeBreakdown = getAgeBreakdown;
exports.formatDetailedAge = formatDetailedAge;
function getAgeBreakdown(age) {
    const totalDays = age;
    const years = Math.floor(age / 365);
    const remainingAfterYears = totalDays % 365;
    const months = Math.floor(remainingAfterYears / 30);
    const days = remainingAfterYears % 30;
    return { years, months, days, totalDays };
}
function formatDetailedAge(age) {
    const { years, months, days } = getAgeBreakdown(age);
    const parts = [];
    if (age === 0) {
        return "newborn";
    }
    else {
        if (years > 0) {
            parts.push(`${years} ${years === 1 ? 'year' : 'years'}`);
        }
        if (months > 0) {
            parts.push(`${months} ${months === 1 ? 'month' : 'months'}`);
        }
        if (days > 0) {
            parts.push(`${days} ${days === 1 ? 'day' : 'days'}`);
        }
        return parts.join(', ');
    }
}
