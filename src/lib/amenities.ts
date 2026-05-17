import {
  Waves, Dumbbell, Building2, Flower2, Footprints, Baby, Trophy, Heart, Trees, Drama,
  BookOpen, Film, Zap, Droplets, ParkingSquare, BatteryCharging, ChevronsUp, PhoneCall, Wifi,
  ShieldCheck, Camera, Flame, CloudRain, Activity, Trash2, Wrench, Users, PawPrint,
  Coffee, Wine, Briefcase, Target, Swords, Sun, Bike, Gamepad2, Shield, HeartHandshake,
  Bed, ConciergeBell, Key, Lock, Cpu, Layers, ChefHat, Tv, WashingMachine, Home, Eye, MapPin
} from "lucide-react";

export interface Amenity {
  id: string;
  name: string;
  iconName: string;
}

export const AMENITIES: Amenity[] = [
  { id: "swimming_pool", name: "Swimming Pool", iconName: "Waves" },
  { id: "gymnasium", name: "Modern Gymnasium", iconName: "Dumbbell" },
  { id: "clubhouse", name: "Exclusive Clubhouse", iconName: "Building2" },
  { id: "spa_salon", name: "Spa & Salon", iconName: "Flower2" },
  { id: "jogging_track", name: "Jogging Track", iconName: "Footprints" },
  { id: "children_play_area", name: "Children's Play Area", iconName: "Baby" },
  { id: "sports_court", name: "Multipurpose Sports Court", iconName: "Trophy" },
  { id: "yoga_deck", name: "Yoga & Meditation Deck", iconName: "Heart" },
  { id: "landscaped_gardens", name: "Landscaped Gardens", iconName: "Trees" },
  { id: "amphitheatre", name: "Amphitheatre", iconName: "Drama" },
  { id: "library", name: "Library & Reading Lounge", iconName: "BookOpen" },
  { id: "mini_theatre", name: "Private Mini Theatre", iconName: "Film" },
  { id: "power_backup", name: "100% Power Backup", iconName: "Zap" },
  { id: "water_supply", name: "24/7 Water Supply", iconName: "Droplets" },
  { id: "car_parking", name: "Reserved Car Parking", iconName: "ParkingSquare" },
  { id: "ev_charging", name: "EV Charging Station", iconName: "BatteryCharging" },
  { id: "high_speed_elevators", name: "High-Speed Elevators", iconName: "ChevronsUp" },
  { id: "intercom_facility", name: "Intercom Facility", iconName: "PhoneCall" },
  { id: "wifi_connectivity", name: "High-Speed Wi-Fi", iconName: "Wifi" },
  { id: "security_24_7", name: "24/7 Multi-tier Security", iconName: "ShieldCheck" },
  { id: "cctv_surveillance", name: "CCTV Surveillance", iconName: "Camera" },
  { id: "fire_fighting_system", name: "Advanced Fire Fighting", iconName: "Flame" },
  { id: "rainwater_harvesting", name: "Rainwater Harvesting", iconName: "CloudRain" },
  { id: "sewage_treatment", name: "Sewage Treatment Plant", iconName: "Activity" },
  { id: "waste_management", name: "Garbage Disposal", iconName: "Trash2" },
  { id: "maintenance_staff", name: "Maintenance Staff", iconName: "Wrench" },
  { id: "visitor_parking", name: "Visitor Parking", iconName: "Users" },
  { id: "pet_park", name: "Pet-Friendly Park", iconName: "PawPrint" },
  { id: "cafeteria", name: "Cafeteria & Lounge", iconName: "Coffee" },
  { id: "banquet_hall", name: "Grand Banquet Hall", iconName: "Wine" },
  { id: "business_centre", name: "Business Centre", iconName: "Briefcase" },
  { id: "squash_court", name: "Squash Court", iconName: "Target" },
  { id: "badminton_court", name: "Badminton Court", iconName: "Swords" },
  { id: "tennis_court", name: "Lawn Tennis Court", iconName: "Sun" },
  { id: "jogging_path", name: "Cycling Track", iconName: "Bike" },
  { id: "indoor_games", name: "Indoor Games Room", iconName: "Gamepad2" },
  { id: "cricket_pitch", name: "Cricket Practice Pitch", iconName: "Shield" },
  { id: "senior_citizen_area", name: "Senior Citizen Sit-out", iconName: "HeartHandshake" },
  { id: "guest_suites", name: "Luxury Guest Suites", iconName: "Bed" },
  { id: "concierge_service", name: "24/7 Concierge Service", iconName: "ConciergeBell" },
  { id: "valet_parking", name: "Valet Parking", iconName: "Key" },
  { id: "gated_community", name: "Gated Secure Community", iconName: "Lock" },
  { id: "smart_home_automation", name: "Smart Home Automation", iconName: "Cpu" },
  { id: "soundproof_windows", name: "Soundproof Windows", iconName: "Layers" },
  { id: "modular_kitchen", name: "Premium Modular Kitchen", iconName: "ChefHat" },
  { id: "video_door_phone", name: "Video Door Phone", iconName: "Tv" },
  { id: "laundry_service", name: "On-site Laundry Service", iconName: "WashingMachine" },
  { id: "earthquake_resistant", name: "Earthquake Resistant", iconName: "Home" },
  { id: "scenic_view", name: "Scenic Balcony Views", iconName: "Eye" },
  { id: "atm_facility", name: "In-house ATM Facility", iconName: "MapPin" }
];

export function getAmenityIcon(iconName: string) {
  switch (iconName) {
    case "Waves": return Waves;
    case "Dumbbell": return Dumbbell;
    case "Building2": return Building2;
    case "Flower2": return Flower2;
    case "Footprints": return Footprints;
    case "Baby": return Baby;
    case "Trophy": return Trophy;
    case "Heart": return Heart;
    case "Trees": return Trees;
    case "Drama": return Drama;
    case "BookOpen": return BookOpen;
    case "Film": return Film;
    case "Zap": return Zap;
    case "Droplets": return Droplets;
    case "ParkingSquare": return ParkingSquare;
    case "BatteryCharging": return BatteryCharging;
    case "ChevronsUp": return ChevronsUp;
    case "PhoneCall": return PhoneCall;
    case "Wifi": return Wifi;
    case "ShieldCheck": return ShieldCheck;
    case "Camera": return Camera;
    case "Flame": return Flame;
    case "CloudRain": return CloudRain;
    case "Activity": return Activity;
    case "Trash2": return Trash2;
    case "Wrench": return Wrench;
    case "Users": return Users;
    case "PawPrint": return PawPrint;
    case "Coffee": return Coffee;
    case "Wine": return Wine;
    case "Briefcase": return Briefcase;
    case "Target": return Target;
    case "Swords": return Swords;
    case "Sun": return Sun;
    case "Bike": return Bike;
    case "Gamepad2": return Gamepad2;
    case "Shield": return Shield;
    case "HeartHandshake": return HeartHandshake;
    case "Bed": return Bed;
    case "ConciergeBell": return ConciergeBell;
    case "Key": return Key;
    case "Lock": return Lock;
    case "Cpu": return Cpu;
    case "Layers": return Layers;
    case "ChefHat": return ChefHat;
    case "Tv": return Tv;
    case "WashingMachine": return WashingMachine;
    case "Home": return Home;
    case "Eye": return Eye;
    case "MapPin": return MapPin;
    default: return Home;
  }
}
