import { NavLink } from "react-router-dom";
import { BookOpen, Mail, User, Sparkles, LayoutGrid } from "lucide-react";
import GlassCard from "../ui/GlassCard";

export default function MobileBottomNav({ onContact }) {
  const items = [
    { label: "Profile", to: "/", Icon: User },
    { label: "Portfolio", to: "/portfolio", Icon: LayoutGrid },
    { label: "Interests", to: "/interests", Icon: Sparkles },
    { label: "Articles", to: "/articles", Icon: BookOpen },
  ];

  return (
    <div className="md:hidden fixed inset-x-3 bottom-3 z-50">
      <GlassCard className="px-3 py-2">
        <nav className="grid grid-cols-5">
          {items.map(({ label, to, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                [
                  "flex flex-col items-center justify-center gap-1 py-2 rounded-2xl transition",
                  isActive ? "text-black" : "text-black/45 hover:text-black/70",
                ].join(" ")
              }
            >
              <Icon className="h-5 w-5" />
              <span className="text-[11px] font-medium">{label}</span>
            </NavLink>
          ))}

          <button
            type="button"
            onClick={onContact}
            className="flex flex-col items-center justify-center gap-1 py-2 rounded-2xl transition text-black/45 hover:text-black/70"
          >
            <Mail className="h-5 w-5" />
            <span className="text-[11px] font-medium">Contact</span>
          </button>
        </nav>
      </GlassCard>
    </div>
  );
}