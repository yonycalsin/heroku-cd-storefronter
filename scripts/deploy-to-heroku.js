/**
 * GitHub Actions does come with the heroku cli pre-installed
 */
async function deployToHeroku(actionContext) {
  console.log('actionContext', actionContext);

  return {
    deployWasInitialized: true,
  };
}

module.exports = deployToHeroku;
