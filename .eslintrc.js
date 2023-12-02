module.exports = {
  
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "standard-with-typescript",
        "plugin:react/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": ['*.ts', '*.tsx'],
            "parserOptions": {
                "sourceType": "script",
                "ecmaFeatures": {
                    "jsx": true
                },
             
               


            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
    },

    "plugins": [
        "react",
    ],
    "rules": {
        '@typescript-eslint/restrict-plus-operands': 'off',
        "react/jsx-indent":[2,4],
        "@typescript-eslint/indent":[2,4],
        "react/react-in-jsx-scope": "off",
        "react/jsx-uses-react": "off",
        "@typescript-eslint/explicit-function-return-type":"off",
        "@typescript-eslint/no-misused-promises":"off",
        "@typescript-eslint/no-floating-promises":'off',
        '@typescript-eslint/no-base-to-string':[1],
        '@typescript-eslint/strict-boolean-expressions':[1],
        'react/display-name':'off',
        'react/prop-types':'off',
        '@typescript-eslint/prefer-optional-chain':'off',
        '@typescript-eslint/consistent-type-assertions':[1],
        '@typescript-eslint/triple-slash-reference':[1],
        'array-callback-return':[1]

    }
}
