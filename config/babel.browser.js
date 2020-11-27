const presets = [
  [
    "@babel/env",
    {
      targets: {
        browsers: "> 0.25%, last 2 versions, not dead",
        esmodules: false
      },
      useBuiltIns: "entry",
      corejs: "3"
    }
  ]
];

module.exports = { presets };
