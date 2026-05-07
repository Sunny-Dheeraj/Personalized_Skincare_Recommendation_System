import {
  Activity,
  CircleDashed,
  Droplets,
  Eye,
  FlaskConical,
  HeartPulse,
  Layers3,
  MoonStar,
  ScanFace,
  ScanSearch,
  Shield,
  ShieldCheck,
  Sparkles,
  SunMedium,
  SunMoon,
  Waves,
} from "lucide-react";
import { createElement } from "react";


const ICONS = {
  Activity,
  CircleDashed,
  Droplets,
  Eye,
  FlaskConical,
  HeartPulse,
  Layers3,
  MoonStar,
  ScanFace,
  ScanSearch,
  Shield,
  ShieldCheck,
  Sparkles,
  SunMedium,
  SunMoon,
  Waves,
};

export function getIcon(name) {
  return ICONS[name] || Sparkles;
}

export function renderIcon(name, props) {
  return createElement(getIcon(name), props);
}
