const presets = [
  [
    "@babel/env",
    {
      targets: {
        esmodules: true
      },
      useBuiltIns: "entry",
      corejs: "3",
      modules: false
    }
  ]
];

module.exports = { presets };
