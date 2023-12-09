export interface IMenuItem {
    text: string;
    url: string;
}

export interface ISession {
    id: number
    sessionCount: number
    startTime: string
    endTime: string
    dayCategory: string
    adultEntryPrice: number
    childEntryPrice: number
    adultIceSkatePrice: number
    childIceSkatePrice: number
}

export interface ITicketRequest {
    userPhone: string,
    iceSessionId: number,
    adultEntryCount: number,
    childEntryCount: number
    adultIceSkateCount: number
    childIceSkateCount: number
}

export interface ITicket {
    id: number
    userPhone: string,
    iceSession: ISession,
    adultEntryCount: number,
    childEntryCount: number
    adultIceSkateCount: number
    childIceSkateCount: number
}

export interface IOrder {
    id: number
    issuedAt: string
    createdAt: string
    totalPrice: number
    adultEntryCount: number
    childEntryCount: number
    adultIceSkateCount: number
    childIceSkateCount: number
    userPhone: string
}

export interface RequestOrder {
    totalPrice: number
    adultEntryCount: number
    childEntryCount: number
    adultIceSkateCount: number
    childIceSkateCount: number
    userPhone: string
}

export type dayCategory = 'Выходные или праздничные дни' | 'Будние дни'

export interface ISessionNoId {
    id?: number
    sessionCount: number
    startTime: string
    endTime: string
    dayCategory: string
    adultEntryPrice: number
    childEntryPrice: number
    adultIceSkatePrice: number
    childIceSkatePrice: number
}

export interface HistoryRoute {
    id: number,
    route: string,
}

export interface IceSessions {
    weekdays: ISession[]
    festiveDaysOrWeekends: ISession[]
}