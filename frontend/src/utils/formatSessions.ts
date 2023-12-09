import { ISession } from "types/types";
import convertDayCategory from "./convertDayCategory";
import formatTime from "./formatTime";

export default function formatSessions(sessions: ISession[]): ISession[] {
    return sessions?.map((session) => {
        session.dayCategory = convertDayCategory(session.dayCategory)
        session.startTime = formatTime(session.startTime)
        session.endTime = formatTime(session.endTime)
        return session
    });
}