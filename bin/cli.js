#!/usr/bin/env node
const path = require('path')
const cli = require('cac')()
const pkg = require('../package')

cli
  .command('<target-folder>', 'Generate a new project to target folder')
  .action(async (targetFolder, { npmClient }) => {
    const sao = require('sao')

    const app = sao({
      /*
        Tks https://www.npmjs.com/package/download-git-repo
        online the repository type (github(defaule), gitlab etc.（bitbucket:）)

        // The path to your template
        generator: path.join(__dirname, '../'), //OK

        // github
        generator: "github:/aiyingya/cnymc", //OK
        generator: "/aiyingya/cnymc",  //OK

        // direct OK
        generator: "direct:http://192.168.5.113/Megrez/Frame3.x/MegrezIII/repository/master/archive.zip",
        // direct error Response code 404 (Not Found)
        generator: "direct:http://192.168.5.113/Megrez/Frame3.x/MegrezIII.git#master",
      */
      generator: "github:/aiyingya/cnymc",
      outDir: targetFolder,
	    npmClient
    })
    await app.run().catch(sao.handleError)
  })

cli.help()
cli.version(pkg.version)

cli.parse()
