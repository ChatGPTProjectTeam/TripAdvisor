export interface TripPlan {
    trip_plan_id: number;
    province: string;
    created_at: string;
    plan_component_list: PlanComponent[];
    locations: Location[];
}

export interface PlanComponent {
    component_id: number;
    component_type: string;
    plane_info?: PlaneInfo;
    accommodation_info?: AccommodationInfo;
    activity?: string;
    festival_info?: FestivalInfo[];
}

export interface FestivalInfo {
    festival_content?: string;
    festival_content_markdown?: string;
    festival_photo?: string;
    latitude?: number;
    longitude?: number;
    month?: number;
    province?: string;
    title?: string;

}

export interface Location {
    name?: string;
    description?: string;
    image_url?: string;
    lat?: number;
    lon?: number;
}

export interface PlaneInfo {
    price: string;
    origin: string;
    destination: string;
    departure: string;
    arrival: string;
    airline: string;
}

export interface AccommodationInfo {
    name: string;
    stars: string;
    lowest_price: string;
    rating: string;
    location: string;
    latitude: string;
    longitude: string;
}
