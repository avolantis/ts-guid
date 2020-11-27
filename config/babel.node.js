const presets = [
  [
    "@babel/env",
    {
      targets: {
        node: "12",
        esmodules: false
      },
      useBuiltIns: "entry",
      corejs: "3"
    }
  ]
];

module.exports = { presets };
