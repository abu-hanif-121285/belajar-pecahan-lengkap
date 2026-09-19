import { RouterProvider, useRouter } from "./lib/router";
import { StoreProvider } from "./lib/store";
import Layout from "./components/Layout";
import Splash from "./screens/Splash";
import Home from "./screens/Home";
import Map from "./screens/Map";
import Simulator from "./screens/Simulator";
import Quiz from "./screens/Quiz";
import LevelDetail from "./screens/LevelDetail";
import Achievements from "./screens/Achievements";
import Teacher from "./screens/Teacher";
import { Tips, Mistakes, Glossary, Formulas, Daily, About } from "./screens/InfoPages";

function Screens() {
  const { route } = useRouter();

  if (route.name === "splash") return <Splash />;

  let content: React.ReactNode = null;
  switch (route.name) {
    case "home": content = <Home />; break;
    case "map": content = <Map />; break;
    case "simulator": content = <Simulator />; break;
    case "level": content = <LevelDetail level={route.level} />; break;
    case "quiz": content = <Quiz key={route.level} level={route.level} />; break;
    case "achievements": content = <Achievements />; break;
    case "teacher": content = <Teacher />; break;
    case "tips": content = <Tips />; break;
    case "mistakes": content = <Mistakes />; break;
    case "glossary": content = <Glossary />; break;
    case "formulas": content = <Formulas />; break;
    case "daily": content = <Daily />; break;
    case "about": content = <About />; break;
    default: content = <Home />;
  }
  return <Layout>{content}</Layout>;
}

export default function App() {
  return (
    <StoreProvider>
      <RouterProvider>
        <Screens />
      </RouterProvider>
    </StoreProvider>
  );
}
