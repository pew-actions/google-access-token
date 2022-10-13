import * as core from '@actions/core'
import * as crypto from 'crypto'
import { google } from 'googleapis'

async function run(): Promise<void> {

  const jsonCreds = core.getInput('credentials')
  if (!jsonCreds) {
    core.setFailed("No credentials supplied to action")
    return
  }

  const scope = core.getInput('scope')
  if (!scope) {
    core.setFailed("No scope supplied to action")
    return
  }

  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(core.getInput('credentials')),
    scopes: [core.getInput('scope')],
  })

  const token  = await auth.getAccessToken()
  if (!token) {
    core.setFailed("Failed to acquire access token from google")
    return
  }

  core.setSecret(token)
  core.setOutput("token", token)
}

run()
