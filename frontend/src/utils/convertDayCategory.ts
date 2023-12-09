import { dayCategory } from "types/types";

export function convertDayCategoryBackwards(dayCategory: dayCategory): string {
    return dayCategory === 'Будние дни' ? 'WEEKDAY' : 'WEEKEND_OR_FESTIVE_DAY'
}

export default function convertDayCategory(stringFromTheServer: string): dayCategory {
    return stringFromTheServer === "WEEKEND_OR_FESTIVE_DAY" ? 'Выходные или праздничные дни' : 'Будние дни'
}