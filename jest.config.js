module.exports = {
    "reporters": [
        "default",
        ["./node_modules/jest-html-reporter", {
            "pageTitle": "Sanity Test Web Genflix",
            "includeFailureMsg" : true,
        }]
    ]
}