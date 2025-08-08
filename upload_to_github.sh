#!/bin/bash
# upload_to_github.sh
# Script to upload the notemanager project to GitHub

# Exit immediately if a command fails
set -e

# Variables — change these to your project details
REPO_URL="git@github.com:YOUR_USERNAME/notemanager.git"
BRANCH="main"
COMMIT_MESSAGE="Update project files"

# Initialize Git if not already
if [ ! -d .git ]; then
    echo "Initializing git repository..."
    git init
    git branch -M "$BRANCH"
fi

# Add remote if it doesn't exist
if ! git remote get-url origin &>/dev/null; then
    echo "Adding remote repository..."
    git remote add origin "$REPO_URL"
fi

# Stage changes
echo "Staging changes..."
git add .

# Commit changes
echo "Committing changes..."
git commit -m "$COMMIT_MESSAGE" || echo "No changes to commit."

# Push changes
echo "Pushing to GitHub..."
git push -u origin "$BRANCH"

echo "✅ Upload complete!"
