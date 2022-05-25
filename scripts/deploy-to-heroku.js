function createNetrcFileCommand(config) {
  const { heroku_api_key, heroku_email } = config;

  return `cat >~/.netrc <<EOF
  machine api.heroku.com
      login ${heroku_email}
      password ${heroku_api_key}
  machine git.heroku.com
      login ${heroku_email}
      password ${heroku_api_key}
  EOF`;
}

function addHerokuRemoteCommand(config) {
  const { heroku_app_name } = config;

  return `heroku git:remote --app ${heroku_app_name}`;
}

function deployToHerokuCommand() {
  return `git push heroku master:refs/heads/master`;
}

/**
 * GitHub Actions does come with the heroku cli pre-installed
 */
async function deployToHeroku(actionContext) {
  const { core, exec } = actionContext;

  const config = {
    heroku_api_key: process.env.heroku_api_key,
    heroku_email: process.env.heroku_email,
    heroku_app_name: process.env.heroku_app_name,
  };

  core.debug(`Config: ${JSON.stringify(config)}`);

  await exec(createNetrcFileCommand(config));

  core.info('Successfully logged into heroku');

  await exec(addHerokuRemoteCommand(config));

  core.info('Added git remote heroku');

  await exec(deployToHerokuCommand());

  core.info(`${config.heroku_app_name} successfully deployed on heroku`);
}

module.exports = deployToHeroku;
