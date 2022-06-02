import React from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useDerivedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { Path, Svg } from 'react-native-svg';
import {
  Box,
  useColorMode,
  useForegroundColor,
} from '@rainbow-me/design-system';

type AnimationConfigOptions = {
  duration: number;
  easing: Animated.EasingFunction;
};

const rotationConfig: AnimationConfigOptions = {
  duration: 1200,
  easing: Easing.elastic(1),
};

const sandConfig: AnimationConfigOptions = {
  duration: 1200,
  easing: Easing.bezierFn(1, 0.2, 0.47, 0.97),
};

const AnimatedPath = Animated.createAnimatedComponent(Path);

export default function HourglassAnimation() {
  const { colorMode } = useColorMode();
  const darkMode = colorMode !== 'light';
  const accentColor = useForegroundColor('accent');
  const rotateHourglass = useDerivedValue(() =>
    withRepeat(
      withSequence(
        withTiming(180, rotationConfig),
        withTiming(0, rotationConfig),
        withTiming(-180, rotationConfig)
      ),
      -1
    )
  );

  const offsetSandMask = useDerivedValue(() =>
    withRepeat(
      withSequence(
        withTiming(0, sandConfig),
        withTiming(34, sandConfig),
        withTiming(0, sandConfig)
      ),
      -1
    )
  );

  const animatedRotationStyles = useAnimatedStyle(() => ({
    transform: [
      {
        rotateZ: `${rotateHourglass.value}deg`,
      },
    ],
  }));

  const animatedSandStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: offsetSandMask.value }],
  }));

  return (
    <Box alignItems="center" justifyContent="center" width="full">
      <Box
        alignItems="center"
        as={Animated.View}
        justifyContent="center"
        style={[animatedRotationStyles]}
      >
        <Svg height="120" viewBox="0 0 120 120" width="120">
          <Path
            d="M50.200197,83.363281 L70.707967,83.363281 C73.906267,83.363281 75.908167,81.410181 75.908167,78.114281 L75.908167,77.723681 C75.908167,71.253881 69.340867,64.857381 66.826167,62.342781 C65.190467,60.707081 65.214867,58.558581 66.826167,56.947281 C69.340867,54.432581 75.908167,48.060581 75.908167,41.566401 L75.908167,41.224611 C75.908167,37.953121 73.906267,36 70.707967,36 L50.200197,36 C46.977537,36 45,37.953121 45,41.224611 L45,41.566401 C45,48.060581 51.567387,54.432581 54.082027,56.947281 C55.693367,58.558581 55.717767,60.707081 54.082027,62.342781 C51.567387,64.857381 45,71.253881 45,77.723681 L45,78.114281 C45,81.410181 46.977537,83.363281 50.200197,83.363281 Z"
            fill="#FFF"
            fill-rule="nonzero"
            id="sand-fill-color"
          />
          <AnimatedPath
            d="M73.173,6 L73.173,37.356 L72.389,42.825 L73.173,48.295 L73.173,79.65 L47,79.65 L47,47.752 L49.095,42.825 L47,37.898 L47,6 L73.173,6 Z M60.389,33.872 C58.972,33.872 55.698,36.856 50.569,42.825 C55.698,48.795 58.972,51.779 60.389,51.779 C61.762,51.779 65.134,48.794 70.505,42.825 C65.134,36.857 61.762,33.872 60.389,33.872 Z"
            fill={accentColor}
            id="hourglass-sand-mask"
            style={animatedSandStyles}
            transform="translate(0, 0)"
          />
          <Path
            d="M60,0 C93.137085,0 120,26.862915 120,60 C120,93.137085 93.137085,120 60,120 C26.862915,120 0,93.137085 0,60 C0,26.862915 26.862915,0 60,0 Z M70.707967,36 L50.200197,36 C46.977537,36 45,37.953121 45,41.224611 L45,41.566401 C45,47.470201 50.4275926,53.2730258 53.3037138,56.1686244 L53.7921363,56.657828 C53.8937851,56.7592932 53.9905855,56.8558374 54.082027,56.947281 C55.693367,58.558581 55.717767,60.707081 54.082027,62.342781 C53.9905855,62.434221 53.8937851,62.5307941 53.7921363,62.6323171 L53.3037138,63.121965 C50.4275926,66.0209868 45,71.8420446 45,77.723681 L45,78.114281 C45,81.410181 46.977537,83.363281 50.200197,83.363281 L70.707967,83.363281 C73.906267,83.363281 75.908167,81.410181 75.908167,78.114281 L75.908167,77.723681 C75.908167,71.7244119 70.2613745,65.7881687 67.4350493,62.951553 L66.826167,62.342781 L66.826167,62.342781 C65.190467,60.707081 65.214867,58.558581 66.826167,56.947281 L67.4350493,56.3388492 C70.2613745,53.5050984 75.908167,47.588277 75.908167,41.566401 L75.908167,41.224611 C75.908167,37.953121 73.906267,36 70.707967,36 Z"
            fill={
              darkMode
                ? 'hsla(262, 55%, 18%, 1.00)'
                : 'hsla(255, 50%, 98%, 1.00)'
            }
            id="hourglass-sphere"
          />
          <Path
            d="M50.200197,83.363281 L70.707967,83.363281 C73.906267,83.363281 75.908167,81.410181 75.908167,78.114281 L75.908167,77.723681 C75.908167,71.253881 69.340867,64.857381 66.826167,62.342781 C65.190467,60.707081 65.214867,58.558581 66.826167,56.947281 C69.340867,54.432581 75.908167,48.060581 75.908167,41.566401 L75.908167,41.224611 C75.908167,37.953121 73.906267,36 70.707967,36 L50.200197,36 C46.977537,36 45,37.953121 45,41.224611 L45,41.566401 C45,48.060581 51.567387,54.432581 54.082027,56.947281 C55.693367,58.558581 55.717767,60.707081 54.082027,62.342781 C51.567387,64.857381 45,71.253881 45,77.723681 L45,78.114281 C45,81.410181 46.977537,83.363281 50.200197,83.363281 Z M61.772467,67.103481 C61.772467,68.348681 61.894567,68.446281 62.626967,69.178681 L68.925767,75.526381 C69.853467,76.454081 69.365267,77.967781 68.046867,77.967781 L52.861327,77.967781 C51.542967,77.967781 51.054687,76.454081 51.982427,75.526381 L58.281267,69.178681 C59.013667,68.446281 59.135767,68.348681 59.135767,67.103481 L59.135767,52.4343 C59.135767,51.1891 59.013667,51.0915 58.281267,50.3591 L58.281267,50.3591 L51.982427,44.0114 C51.054687,43.0837 51.542967,41.57 52.861327,41.57 L52.861327,41.57 L68.046867,41.57 C69.365267,41.57 69.853467,43.0837 68.925767,44.0114 L68.925767,44.0114 L62.626967,50.3591 C61.894567,51.0915 61.772467,51.1891 61.772467,52.4343 L61.772467,52.4343 L61.772467,67.103481 Z"
            fill={accentColor}
            fillRule="nonzero"
            id="hourglass-outline"
          />
        </Svg>
      </Box>
    </Box>
  );
}
