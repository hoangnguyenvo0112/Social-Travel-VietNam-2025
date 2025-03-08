// // @ts-ignore
const path = require("path");
// @ts-ignore
module.exports = () => {
  return {
    webpack: {
      alias: {
        // @ts-ignore
        "@": path.resolve(__dirname, "src"),
      },
   
    },
  };
};
