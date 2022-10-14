GitHub action to obtain a scoped Google access token for a Google service
account.

Inputs
======
* credentials
  JSON service account private key (no formatting/base64 encoding needed)

* scope
  The required scope for the access token

Outputs
=======
* token
  String containing the access token that can be used as a bearer token to
  authenticate API calls to Goole. This value is masked as an action secret
  to prevent its value from appearing in workflow logs


Example
=======
```yaml
jobs:
  test_access_token:
    runs-on: ...
    steps:
      - id: google-token
        uses: playeveryware/action-google-access-token@v1
        with:
          credentials: ${{ secrets.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS }}
          scope: 'https://www.googleapis.com/auth/drive.readonly'

      - name: Show (masked) token
        run: |
          echo "Masked token ${{ steps.google-token.outputs.token }}"
```
