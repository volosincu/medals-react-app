module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jest": true,
        "mocha": true,
        "es6": true
    },
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "react-hooks"
    ],
    "rules": {
        "indent": ["error", 4],
        "linebreak-style": ["error", "unix"],
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "react/jsx-uses-react": "warn"
    },
    "overrides": [
        {
            "files": ["*.test.js"],
            "rules": {
                "no-unused-expressions": "off"
            }
        }
    ],
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ]
};
