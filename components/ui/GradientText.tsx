import { Text, StyleSheet, TextProps } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import type { ColorValue } from "react-native";

type GradientTextProps = TextProps & {
  text: string;
  colors: readonly [ColorValue, ColorValue, ...ColorValue[]];
  fontSize?: number;
  fontFamily?: string;
  width?: number;
};

export default function GradientText({
  text,
  colors,
  fontSize = 40,
  fontFamily,
  width = 200,
  style,
  ...props
}: GradientTextProps) {
  return (
    <MaskedView
      style={{ width }}
      maskElement={
        <Text
          style={[
            styles.text,
            {
              fontSize,
              fontFamily,
            },
            style,
          ]}
        >
          {text}
        </Text>
      }
    >
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text
          style={[
            styles.text,
            {
              fontSize,
              fontFamily,
            },
            style,
            styles.hiddenText,
          ]}
          {...props}
        >
          {text}
        </Text>
      </LinearGradient>
    </MaskedView>
  );
}

const styles = StyleSheet.create({
  text: {},
  hiddenText: {
    opacity: 0,
  },
});