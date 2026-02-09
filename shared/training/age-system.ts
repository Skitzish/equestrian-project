/**
 * Age System - Helper Functions
 */

import { Horse } from "../types/horse.types";

export function getAgeBreakdown(age: number):{
    years: number;
    months: number;
    days: number;
    totalDays: number;
}{
    const totalDays = age;
    const years = Math.floor(age/365);
    const remainingAfterYears = totalDays % 365;

    const months = Math.floor(remainingAfterYears / 30);
    const days = remainingAfterYears % 30;

    return { years, months, days, totalDays };
}

export function formatDetailedAge(age: number): string {
    const { years, months, days } = getAgeBreakdown(age);
    const parts: string[] = [];

    if(age === 0){
        return "newborn";
    }else{
      if (years > 0){
            parts.push(`${years} ${years === 1 ? 'year' : 'years'}`);
        }
        if (months > 0){
            parts.push(`${months} ${months === 1 ? 'month' : 'months'}`);
        }
        if (days > 0){
            parts.push(`${days} ${days === 1 ? 'day' : 'days'}`);
        }

        return parts.join(', ');
    }
    
}