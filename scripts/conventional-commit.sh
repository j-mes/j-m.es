#!/usr/bin/env bash
# Script: conventional-commit.sh
# Purpose: Stage all changes and create Conventional Commit-style commits
# Usage: bash scripts/conventional-commit.sh
# Notes:
# - This script makes a best-effort classification of changed files into
#   commit types: feat, docs, chore. It commits files per-type so history is
#   organised. Review the staged commits before pushing.

set -eu

# Ensure we're in a git repo
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Not inside a git repository. Aborting." >&2
  exit 1
fi

# Stage everything
git add -A

# Read porcelain status (NUL-separated) and classify files
DOCS_FILES=()
FEAT_FILES=()
CHORE_FILES=()
OTHER_FILES=()

while IFS= read -r -d '' entry; do
  # entry format: XY <path>
  status="${entry:0:2}"
  filepath="${entry:3}"

  # Normalize status for untracked files (??)
  if [[ "$status" == "??" ]]; then
    status="A "
  fi

  # Classify by path/extension and whether file was added
  case "$filepath" in
    *.md|README*|docs/*)
      DOCS_FILES+=("$filepath")
      ;;
    package.json|package-lock.json|yarn.lock|pnpm-lock.yaml|eleventy.config.js|.github/*)
      CHORE_FILES+=("$filepath")
      ;;
    src/*)
      if [[ "$status" == "A " ]]; then
        FEAT_FILES+=("$filepath")
      else
        CHORE_FILES+=("$filepath")
      fi
      ;;
    *)
      OTHER_FILES+=("$filepath")
      ;;
  esac

done < <(git status --porcelain -z)

commit_count=0

do_commit() {
  local type="$1"; shift
  local message="$1"; shift
  local files=("$@")
  if [ "${#files[@]}" -eq 0 ]; then
    return
  fi

  echo "Committing ${#files[@]} file(s) as ${type}..."
  git commit --no-verify -m "$message" -- "${files[@]}"
  commit_count=$((commit_count+1))
}

# Commit docs
if [ "${#DOCS_FILES[@]}" -gt 0 ]; then
  do_commit "docs" "docs: update documentation" "${DOCS_FILES[@]}"
fi

# Commit new source files as feat
if [ "${#FEAT_FILES[@]}" -gt 0 ]; then
  do_commit "feat" "feat: add new source files" "${FEAT_FILES[@]}"
fi

# Commit chores (config, modifications)
if [ "${#CHORE_FILES[@]}" -gt 0 ]; then
  do_commit "chore" "chore: miscellaneous updates" "${CHORE_FILES[@]}"
fi

# Commit anything else
if [ "${#OTHER_FILES[@]}" -gt 0 ]; then
  do_commit "chore" "chore: other changes" "${OTHER_FILES[@]}"
fi

if [ "$commit_count" -eq 0 ]; then
  echo "No staged changes to commit. Nothing done."
else
  echo "Created ${commit_count} commit(s). Inspect with 'git log --oneline -n ${commit_count}'."
fi

exit 0
