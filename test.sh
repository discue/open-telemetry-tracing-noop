#!/bin/bash

set -x

# do not allow --only if running on cicd environment
if [[ -z "${GITHUB_ACTIONS}" ]]; then
  npm run test
else
  npm run test:ci
fi