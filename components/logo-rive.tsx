import {
  useRive,
  Layout,
  Fit,
  Alignment,
  useStateMachineInput,
} from "@rive-app/react-canvas";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export const LogoRive = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  const { rive, RiveComponent } = useRive({
    src: "/rive/promad.riv",
    stateMachines: "nav_logo",
    layout: new Layout({
      fit: Fit.FitWidth,
      alignment: Alignment.Center,
    }),
    autoplay: true,
  });

  const mode = useStateMachineInput(rive, "nav_logo", "mode");
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  useEffect(() => { 
    if (mode && theme && mounted) {
      mode.value = theme === 'light' ? 1 : 0;
    }
  }, [mode, theme, mounted]);

  return <RiveComponent />;
};
