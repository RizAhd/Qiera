import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'SAVED_PROPERTIES'; 

export async function getSavedProperties(): Promise<string[]> {
  const data = await AsyncStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
}

export async function toggleSaveProperty(propertyId: string) {
  const saved = await getSavedProperties();

  const updated = saved.includes(propertyId)
    ? saved.filter(id => id !== propertyId)
    : [...saved, propertyId];

  await AsyncStorage.setItem(KEY, JSON.stringify(updated));
  return updated;
}

export async function isPropertySaved(propertyId: string) {
  const saved = await getSavedProperties();
  return saved.includes(propertyId);
}
