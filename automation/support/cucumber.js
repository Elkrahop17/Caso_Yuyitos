// automation/support/cucumber.js
module.exports = {
  default: [
    "automation/features/**/*.feature",
    "--require automation/support/testcafe-mock.js",
    "--require node_modules/testcafe-cucumber-steps",
    "--require automation/step_definitions/**/*.js",
  ].join(" "),
};
