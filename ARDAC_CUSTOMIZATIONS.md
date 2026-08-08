# ARDaC frontend customizations

This repository preserves the full history of `uc-cdis/commons-frontend-app` and adds the small set of changes required by the ARDaC deployment.

## Repository remotes

- `origin`: `https://github.com/Su-informatics-lab/ardac-frontend-app.git`
- `upstream`: `https://github.com/uc-cdis/commons-frontend-app.git`

Keep `main` deployable. Make ARDaC changes and upstream updates on feature branches, validate them, and merge them through pull requests. Do not rebase published `main` history.

## ARDaC-owned changes

- `Dockerfile.config` builds Next.js with `BASE_PATH=/ff`.
- `src/pages/_app.tsx` supplies the default ARDaC page title.
- `src/pages/_document.tsx` supplies the favicon URL using the configured `BASE_PATH`.
- Runtime content, branding, and theme configuration remain in `Su-informatics-lab/gen3-config`.

## Bringing in upstream changes

1. Run `git fetch upstream`.
2. Create a feature branch from `main`.
3. Merge `upstream/main` into that feature branch.
4. Resolve conflicts without dropping the ARDaC-owned changes listed above.
5. Run the locked dependency install, lint, and a production build with `BASE_PATH=/ff`.
6. Build and browser-test a new immutable container tag.
7. Open a pull request to `main`; publish the image only after the pull request is merged.

This merge-based workflow keeps upstream ancestry intact and makes customization conflicts visible during review.
