/**
 * Define the colors used in the application
 * @enum {string}
 * @readonly
 * @property {string} Red - Red color
 * @property {string} Green - Green color
 * @property {string} Yellow - Yellow color
 * @property {string} Black - Black color
 * @property {string} White - White color
 * @property {string} GrayBlack - Gray black color
 * @property {string} GrayGreen - Gray green color
 * @property {string} GrayYellow - Gray yellow color
 * @property {string} GrayRed - Gray red color
 * @property {string} GrayWhite - Gray white color
 * @property {string} FadedBlack - Faded black color
 * @property {string} FadedWhite - Faded white color
 * @property {string} FadedGreen - Faded green color
 * @property {string} FadedRed - Faded red color
 * @property {string} FadedYellow - Faded yellow color
 * @property {string} BlackOverlay - Black overlay color
 * @property {string} GreenOverlay - Green overlay color
 * @property {string} Disable - Disable color
 * @example
 * import { Colors } from './colors';
 * console.log(Colors.Red); // #fe0000
 */

export enum Colors {
  Red = '#FE0000',
  Yellow = '#FDCD01',
  Green = '#0A933B',
  Black = '#000000',
  White = '#FFFFFF',
  GrayBlack = '#4b4b4b',
  GrayGreen = '#e0fbea',
//   GrayYellow = '',
  GrayRed = '#ffb1b0',
//   GrayWhite = '',
  FadedBlack = '#292929',
  FadedWhite = '#f9f9f9',
  FadedGreen = '#87d0a2',
  FadedRed = '#dc6261',
  FadedYellow = '#ddc771',
  BlackOverlay = '#292929',
//   GreenOverlay = '',
  Disable = '#e5e3e2'
}
