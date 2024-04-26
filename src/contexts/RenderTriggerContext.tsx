import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type RenderTrigger = boolean;

interface RenderTriggerContextType {
  trap: RenderTrigger;
  trigger: React.Dispatch<React.SetStateAction<RenderTrigger>>;
}

const RenderTriggerContext = createContext<RenderTriggerContextType>({ trap: false, trigger: () => {} });

export function useRenderTrigger() {
  return useContext(RenderTriggerContext);
}

export function triggerWhenRendered() {
  const { trap, trigger } = useRenderTrigger();
  useEffect(() => {
    trigger(!trap);
  }, []);
}

interface RenderTriggerProviderProps {
  children: ReactNode;
}

export function RenderTriggerProvider({ children }: RenderTriggerProviderProps) {
  const [trap, trigger] = useState(false);

  return <RenderTriggerContext.Provider value={{ trap, trigger }}>{children}</RenderTriggerContext.Provider>;
}
