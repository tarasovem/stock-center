module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        'semi': ['error', 'always', { 'omitLastInOneLineBlock': false}],
        'comma-dangle': ['error', 'never'],
        quotes: ['error', 'single'],
        'indent': ['error', 'tab']
    }
}
