const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

// eslint-disable-next-line no-undef
const config = getDefaultConfig(__dirname);

// Add support for CommonJS modules needed by Firebase
config.resolver.sourceExts.push('cjs');

// Export the config with NativeWind support
module.exports = withNativeWind(config, { input: './global.css' });