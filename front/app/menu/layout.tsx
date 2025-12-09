import Nav from "../components/nav/Nav";
import { NavLateral } from "../components/nav/NavLaterarl";

export default function MenuLayout({ children }: React.ReactNode ) {
  return (
    <div className="flex">
      <NavLateral />
      <div className="flex-1">
        <Nav />
        {children}
      </div>
    </div>
  );
}
