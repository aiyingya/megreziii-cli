const superb = require('superb')

module.exports = {
  prompts() {
    return [
      {
        name: 'name',
        message: 'What is the name of the new project',
        default: this.outFolder
      },
      {
        name: 'description',
        message: 'How would you describe the new project',
        default: `my ${superb()} project`
      },
      {
        name: 'username',
        message: 'What is your GitHub username',
        default: this.gitUser.username || this.gitUser.name.toLowerCase(),
        store: true
      },
      {
        name: 'email',
        message: 'What is your GitHub email',
        default: this.gitUser.email,
        store: true,
        validate: v => /.+@.+/.test(v)
      }
    ]
  },
  actions() {
    return [
      {
        type: 'add',
        files: '**'
      },
      {
        type: 'move',
        patterns: {
          // We keep `.gitignore` as `gitignore` in the project
          // Because when it's published to npm
	        // '_.eslintrc.js': '.eslintrc.js',
	        '_package.json': 'package.json',
	        '_.gitignore': '.gitignore',
	        '_.babelrc': '.babelrc'
        }
      },
      {
        type: 'modify',
        files: 'package.json',
        handler: data => {
          let _oldpkg = require('./template/_package.json')
          let _newpkg = require('./lib/update-pkg')(this.answers, data)
          return {..._oldpkg,..._newpkg}
        }
      }
    ]
  },
  async completed() {
    await this.gitInit()
    await this.npmInstall({ packageManager: this.answers.pm })
    this.showProjectTips()
  }
}
