import {StyleSheet} from 'react-native';

export type fontsAlias =
  | 'H1'
  | 'H2'
  | 'H3'
  | 'Subtitle1'
  | 'Subtitle2'
  | 'Subtitle3'
  | 'Body1'
  | 'Body2'
  | 'Body3'
  | 'Body4'
  | 'Body5'
  | 'Body6'
  | 'Caption1'
  | 'Caption2';

export const fonts = StyleSheet.create({
  H1: {
    fontFamily: 'SpoqaHanSansNeo-Bold',
    fontSize: 28,
    lineHeight: 36,
  },
  H2: {
    fontFamily: 'SpoqaHanSansNeo-Bold',
    fontSize: 24,
    lineHeight: 32,
  },
  H3: {
    fontFamily: 'SpoqaHanSansNeo-Bold',
    fontSize: 20,
    lineHeight: 28,
  },
  Subtitle1: {
    fontFamily: 'SpoqaHanSansNeo-Bold',
    fontSize: 18,
    lineHeight: 26,
  },
  Subtitle2: {
    fontFamily: 'SpoqaHanSansNeo-Bold',
    fontSize: 16,
    lineHeight: 24,
  },
  Subtitle3: {
    fontFamily: 'SpoqaHanSansNeo-Bold',
    fontSize: 14,
    lineHeight: 22,
  },
  Body1: {
    fontFamily: 'SpoqaHanSansNeo-Regular',
    fontSize: 16,
    lineHeight: 24,
  },
  Body2: {
    fontFamily: 'SpoqaHanSansNeo-Medium',
    fontSize: 14,
    lineHeight: 24,
  },
  Body3: {
    fontFamily: 'MaruBuri-Regular',
    fontSize: 24,
    lineHeight: 36,
  },
  Body4: {
    fontFamily: 'MaruBuri-Regular',
    fontSize: 18,
    lineHeight: 26,
  },
  Body5: {
    fontFamily: 'MaruBuri-Regular',
    fontSize: 16,
    lineHeight: 24,
  },
  Body6: {
    fontFamily: 'MaruBuri-SemiBold',
    fontSize: 14,
    lineHeight: 24,
  },
  Caption1: {
    fontFamily: 'SpoqaHanSansNeo-Medium',
    fontSize: 12,
    lineHeight: 18,
  },
  Caption2: {
    fontFamily: 'SpoqaHanSansNeo-Bold',
    fontSize: 10,
    lineHeight: 12,
  },
});
