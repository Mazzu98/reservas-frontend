export type Reservation = {
    id: number;
    space_id: number;
    space_name?: string;
    user_id: number;
    event_name: string;
    start_date: string;
    end_date: string;
};