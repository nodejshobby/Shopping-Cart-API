//Parse error to console for debugging
const parseError = (error) => {
  console.log(`Error ${error.stack}: ${error.message}`);
};
module.exports = parseError;
