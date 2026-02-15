import { Stack } from "expo-router";
import './globals.css';
import {App} from "expo-router/build/rsc/entry";

export default function RootLayout() {
  return <Stack>
    <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
    />
    <Stack.Screen
        name="movie/[id]"
        options={{ headerShown: false }}
    />
  </Stack>
}
