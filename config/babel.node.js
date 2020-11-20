const presets = [
  [
    "@babel/env",
    {
      targets: {
        node: "14",
        esmodules: false
      },
      useBuiltIns: "usage",
      corejs: "3.7.0"
    }
  ]
];

module.exports = { presets };
