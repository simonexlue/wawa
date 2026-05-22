import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { router } from "expo-router";
import { supabase } from "../lib/supabase";

export default function Index() {
  useEffect(() => {
    async function checkAuthAndProfile() {
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) {
        router.replace("/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", userData.user.id)
        .maybeSingle();

      if (!profile) {
        router.replace("/create-profile");
        return;
      }

      router.replace("/(tabs)/home");
    }

    checkAuthAndProfile();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator />
    </View>
  );
}