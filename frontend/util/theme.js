var Colors = require('material-ui/lib/styles/colors');
var ColorManipulator = require('material-ui/lib/utils/color-manipulator');
var Spacing = require('material-ui/lib/styles/spacing');
var zIndex = require('material-ui/lib/styles/zIndex');

module.exports = {
  spacing: Spacing,
  zIndex: zIndex,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: Colors.teal500,
    primary2Color: Colors.teal700,
    primary3Color: Colors.lightBlack,
    accent1Color: Colors.tealA700,
    accent2Color: Colors.tealA100,
    accent3Color: Colors.grey500,
    textColor: Colors.darkBlack,
    alternateTextColor: Colors.white,
    canvasColor: Colors.white,
    borderColor: Colors.grey300,
    disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
    pickerHeaderColor: Colors.cyan500,
  },
};
