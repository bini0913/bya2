import {
  Users,
  GraduationCap,
  Award,
  Building2,
  TrendingUp,
} from "lucide-react";

export const HERO_STATS = [
  { id: "students", value: 1300, suffix: "+", icon: Users },
  { id: "teachers", value: 100, suffix: "+", icon: GraduationCap },
  { id: "years", value: 10, suffix: "+", icon: Award },
  { id: "campuses", value: 2, suffix: "", icon: Building2 },
  { id: "success", value: 98, suffix: "%", icon: TrendingUp },
] as const;

export type HeroStatId = (typeof HERO_STATS)[number]["id"];
