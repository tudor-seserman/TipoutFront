import { useState } from "react";

interface UseLocalStorageProps {
  keyName: string;
  accessToken: string;
}

export const useLocalStorage = ({
  keyName,
  accessToken: accessToken,
}: UseLocalStorageProps) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);

      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(accessToken));
        return accessToken;
      }
    } catch (err) {
      return accessToken;
    }
  });

  const setValue = (newValue: string) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {}
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};
