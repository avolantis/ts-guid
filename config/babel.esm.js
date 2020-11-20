const presets = [
  [
    "@babel/env",
    {
      targets: {
        browsers: "> 0.25%, last 2 versions, not dead",
        esmodules: true
      },
      useBuiltIns: "usage",
      corejs: "3.7.0"
    }
  ]
];

module.exports = { presets };
