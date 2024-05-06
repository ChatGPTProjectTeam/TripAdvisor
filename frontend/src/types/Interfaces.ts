export interface TripPlan {
    trip_plan_id: number;
    province: string;
    created_at: string;
    plan_component_list: PlanComponent[];
}

export interface PlanComponent {
    component_id: number;
    component_type: string;
    plane_info?: PlaneInfo;
    accommodation_info?: AccommodationInfo;
    activity?: string;
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
}
