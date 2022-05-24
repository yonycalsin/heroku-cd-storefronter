// import { execFileSync } from 'child_process';

/**
 * GitHub Actions does come with the heroku cli pre-installed
 */
async function deployToHeroku(actionContext) {
  console.log('actionContext', actionContext);

  return {
    deployWasInitialized: true,
  };
}

export default deployToHeroku;
