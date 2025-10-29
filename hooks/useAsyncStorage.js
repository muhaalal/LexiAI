import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default function useAsyncStorage(key, initialValue) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    (async () => {
      try {
        const storedValue = await AsyncStorage.getItem(key);
        if (storedValue !== null) {
          setValue(JSON.parse(storedValue));
        }
      } catch (err) {
        console.error("Error loading", key, err);
      }
    })();
  }, [key]);

  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
      } catch (err) {
        console.error("Error saving", key, err);
      }
    })();
  }, [key, value]);

  function clearValue(){
    setValue(initialValue)
    AsyncStorage.setItem(key,JSON.stringify(initialValue))
  }


  return [value, setValue, clearValue];
}