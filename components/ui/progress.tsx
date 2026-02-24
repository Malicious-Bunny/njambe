import { View, Text, StyleSheet, Animated } from "react-native"
import { useEffect, useRef } from "react"

// --- Types ---
interface ProgressProps {
  value?: number // 0–100
  style?: object
  children?: React.ReactNode
}

interface ProgressTrackProps {
  style?: object
  children?: React.ReactNode
}

interface ProgressIndicatorProps {
  value?: number
  style?: object
  animated?: boolean
}

interface ProgressLabelProps {
  style?: object
  children?: React.ReactNode
}

interface ProgressValueProps {
  value?: number
  style?: object
  formatLabel?: (value: number) => string
}

// --- Components ---

function Progress({ value = 0, style, children }: ProgressProps) {
  return (
    <View style={[styles.root, style]}>
      {children}
      <ProgressTrack>
        <ProgressIndicator value={value} />
      </ProgressTrack>
    </View>
  )
}

function ProgressTrack({ style, children }: ProgressTrackProps) {
  return (
    <View style={[styles.track, style]}>
      {children}
    </View>
  )
}

function ProgressIndicator({ value = 0, style, animated = true }: ProgressIndicatorProps) {
  const widthAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (animated) {
      Animated.timing(widthAnim, {
        toValue: Math.min(Math.max(value, 0), 100),
        duration: 300,
        useNativeDriver: false,
      }).start()
    } else {
      widthAnim.setValue(Math.min(Math.max(value, 0), 100))
    }
  }, [value, animated])

  const widthPercent = widthAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  })

  return (
    <Animated.View
      style={[
        styles.indicator,
        { width: widthPercent },
        style,
      ]}
    />
  )
}

function ProgressLabel({ style, children }: ProgressLabelProps) {
  return (
    <Text style={[styles.label, style]}>
      {children}
    </Text>
  )
}

function ProgressValue({ value = 0, style, formatLabel }: ProgressValueProps) {
  const display = formatLabel ? formatLabel(value) : `${value}%`
  return (
    <Text style={[styles.value, style]}>
      {display}
    </Text>
  )
}

// --- Styles ---

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12, // gap-3 = 12px
  },
  track: {
    backgroundColor: "#e5e7eb", // muted (gray-200 equivalent)
    height: 4,               // h-1 = 4px
    borderRadius: 9999,
    width: "100%",
    overflow: "hidden",
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
  },
  indicator: {
    backgroundColor: "#6366f1", // primary (indigo-500 equivalent)
    height: "100%",
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
  },
  value: {
    color: "#6b7280", // muted-foreground (gray-500)
    marginLeft: "auto",
    fontSize: 14,
    fontVariant: ["tabular-nums"],
  },
})

export {
  Progress,
  ProgressTrack,
  ProgressIndicator,
  ProgressLabel,
  ProgressValue,
}
