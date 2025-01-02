module.exports = {
    presets: [
        '@babel/preset-env', // Transpile modern JavaScript
        '@babel/preset-react' // Transpile React JSX
    ],
    plugins: [
        '@babel/plugin-proposal-nullish-coalescing-operator', // Support `??`
        '@babel/plugin-proposal-optional-chaining' // Support `?.`
    ]
};
