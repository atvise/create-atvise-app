# atvise-scripts

> The scripts used by create-atvise-app to interact with atvise server.

## Usage

```
Usage: atvise-scripts <script> [options]

  The scripts used by create-atvise-app to interact with atvise server

Scripts:

  deploy   Deploy build files to atvise server
  prepare  Prepare project for atvise-scripts
  init     Setup a project for atvise-scripts

Options:

  --version, -v  Print atvise-scripts version and exit
  --help, -h     Print usage and exit
```

## Known limitations

**`atvise-scripts deploy`**

- [ ] Currenty does not delete _Translate_ references on deployed svg files (See [create-atvise-app#14](https://github.com/LukasHechenberger/create-atvise-app/issues/14))
