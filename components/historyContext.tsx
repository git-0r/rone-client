import { UserProfile } from "@auth0/nextjs-auth0/client";
import {
  createContext,
  useState,
  PropsWithChildren,
  useContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
} from "react";
import { toast } from "sonner";

type History = {
  id: string;
  email: string;
  text: string;
  description: string;
  createdAt: string;
}[];

type DefaultValue = {
  history: History;
  addHistory: (newData: History) => void;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

const defaultValue: DefaultValue = {
  history: [],
  addHistory: () => {},
  loading: true,
  setLoading: () => {},
};

// Create a context
const HistoryContext = createContext(defaultValue);

// Create a provider component
export const HistoryProvider = ({ children }: PropsWithChildren) => {
  const [history, setHistory] = useState<History>([]);
  const [loading, setLoading] = useState(true);

  // Function to add new data to the current state
  const addHistory = (newData: History) => {
    setHistory((prevData) => [...newData, ...prevData]);
  };

  return (
    <HistoryContext.Provider
      value={{ history, addHistory, loading, setLoading }}
    >
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = (isLoading?: boolean, user?: UserProfile) => {
  const context = useContext(HistoryContext);

  if (!context) {
    throw new Error("useHistory must be used within a HistoryProvider");
  }

  const fetchHistory = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/history`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          body: JSON.stringify({ email: user?.email }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        context.addHistory(data);
      } else {
        throw new Error("failed to fetch history.");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "failed to fetch history.");
      } else {
        toast.error("failed to fetch history.");
      }
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      context.setLoading(true);
      fetchHistory().then(() => context.setLoading(false));
    }
  }, [user, fetchHistory, isLoading]);

  return context;
};

export default HistoryContext;
