export interface space {
    id: number;
    name: string;
    type: string;
    description: string;
    capacity: number;
    image_url: string;
}

export type scheduleRequest = {
    space_id: string;
    event_name: string;
    start_date: string;
    end_date: string;
}