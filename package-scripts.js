module.exports = {
  scripts: {
    default: "nps build",
    build: {
      default: "tsc --sourceMap --declaration",
      production: "nps clean & tsc --declaration"
    },
    clean: "if exist .\\dist (rmdir /s /q .\\dist)",
    publish: "nps build.production & npm publish --access public"
  }
}