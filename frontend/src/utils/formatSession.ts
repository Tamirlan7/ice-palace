import { ISession } from "types/types";
import convertDayCategory from "./convertDayCategory";
import formatTime from "./formatTime";

export default function formatSession(session: ISession): ISession {
    return {
        ...session,
        dayCategory: convertDayCategory(session.dayCategory),
        startTime: formatTime(session.startTime),
        endTime: formatTime(session.endTime),
    }
}