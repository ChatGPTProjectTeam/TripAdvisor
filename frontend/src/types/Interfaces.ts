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

export interface DayPlanActivity {
    activity: string;
    restaurant: string | null;
}

export interface DayPlan {
    planId: number;
    date: string;
    morning: DayPlanActivity;
    afternoon: DayPlanActivity;
    evening: DayPlanActivity;
}

export interface Component {
    componentId: number;
    componentType: string;
    PlaneInfo?: PlaneInfo;
    accommodationInfo?: AccommodationInfo;
    day_plan_list?: DayPlan[];
}

export interface TripPlan {
    chatId: number;
    tripPlanId: number;
    tripPlan: Component[];
}

export interface PlanData {
    PlanData: TripPlan[];
}
